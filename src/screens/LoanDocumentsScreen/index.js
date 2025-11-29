import {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  documentImageLabelMap,
  documentImageMap,
  documentImageType,
  loanCategory,
  loanType,
  occupationLabelMap,
} from '../../constants/enums';
import {loan_document_requirements} from '../../constants/loan_document_requirements';
import strings from '../../locales/strings';
import {
  getScreenParam,
  goBack,
  navigate,
  navigateToTab,
} from '../../navigation/NavigationUtils';
import {
  fetchCustomerDocumentsThunk,
  fetchLoanDocumentsByCategoryThunk,
  setIsCreatingLoanApplication,
  updateCustomerDocumentsThunk,
  uploadCustomerDocumentsThunk,
} from '../../redux/actions';
import {getPresignedDownloadUrl} from '../../services';
import {
  generateImageUploadPayload,
  getDocumentRequirements,
  handleFileSelection,
  transformDocumentData,
  validateRequiredDocuments,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {uploadDocumentViaPresignedUrl} from '../../utils/fileUploadUtils';
import {
  formatVehicleNumber,
  showApiErrorToast,
  showToast,
} from '../../utils/helper';
import Loan_Documents_Component from './Loan_Documents_Component';

const requiredFields = [
  'addressProofImage',
  'idProofImage',
  'incomeProofImage',
  'bankingProofImage',
];

const loanDocuments = [
  documentImageType.ID_PROOF,
  documentImageType.ADDRESS_PROOF,
  documentImageType.PERMANENT_ADDRESS,
  documentImageType.INCOME_PROOF,
  documentImageType.BANKING_PROOF,
  documentImageType.BUSINESS_PROOF,
  documentImageType.INSURANCE,
  documentImageType.OTHER_DOCUMENTS,
];

class LoanDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnboard: getScreenParam(props.route, 'params')?.isOnboard || false,
      documents: {},
      isLoadingDocument: false,
      showFilePicker: false,
      selectedDocType: null,
      isLoading: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      acceptedDocuments: [],
      selectedAcceptedDocument: '',
      showAcceptedDocModal: false,
      acceptedDocModalTitle: '',
      showExitConfirmation: false,
      isAadhaar: false,
    };
    this.onNextPress = this.onNextPress.bind(this);
  }

  async componentDidMount() {
    const {isEdit} = this.state;
    const {isCreatingLoanApplication} = this.props;
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backHandler,
    );

    this.props.navigation.setOptions({
      gestureEnabled: !isCreatingLoanApplication,
    });

    if (isEdit) {
      this.fetchCustomerDocuments();
    }
  }

  backHandler = () => {
    return this.props.isCreatingLoanApplication;
  };

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  fetchCustomerDocuments = async () => {
    const {selectedApplicationId} = this.props;
    this.setState({isLoading: true});
    try {
      await this.props.fetchCustomerDocumentsThunk(
        selectedApplicationId,
        {},
        async response => {
          if (response?.success && response?.data) {
            const formattedDocuments = await transformDocumentData(
              response.data,
              loanDocuments,
            );
            this.setState({documents: formattedDocuments, isLoading: false});
          }
        },
      );
    } catch (error) {
      console.error('Error fetching customer documents:', error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  onNextPress = () => {
    this.handleCustomerDocumentSubmission();
  };

  navigateToNextScreenBasedOnLoanType = selectedLoanType => {
    let params = getScreenParam(this.props.route, 'params');

    switch (selectedLoanType) {
      case loanType.refinance:
        return navigate(ScreenNames.FinanceDetails, {params: params});

      case loanType.topUp:
      case loanType.internalBT:
      case loanType.externalBT:
        return navigate(ScreenNames.CarFinanceDetails, {params: params});

      case loanType.loan:
        return navigate(ScreenNames.CreateCIBILScreen);

      default:
        return navigate(ScreenNames.LoanAmount, {params: params});
    }
  };

  handleUploadMedia = async documentType => {
    try {
      const {selectedLoanApplication} = this.props;
      this.setState({isLoadingDocument: true});

      // Extract customer & loan info
      const occupationTypeValue =
        selectedLoanApplication?.customer?.customerDetails?.occupation;
      const loanTypeValue = selectedLoanApplication?.loanType;

      // Match locally stored requirement
      const matchedRequirement = loan_document_requirements.find(
        item =>
          item.loanProduct === loanTypeValue &&
          item.typeOfIndividual === occupationTypeValue &&
          item.documentType === documentType,
      );

      // Default accepted docs if API fails
      const defaultAcceptedDocs =
        matchedRequirement?.acceptedDocuments?.map(doc => ({
          document_accepted: doc,
        })) || [];

      // Proper readable variables
      const occupationLabel = occupationLabelMap[occupationTypeValue];
      const documentCategory = documentImageMap[documentType];
      const loanCategoryLabel = loanCategory[loanTypeValue];

      // Common method to update state after success/error
      const updateStateAfterFetch = (acceptedDocs, prevState) => ({
        isLoadingDocument: false,
        showFilePicker: acceptedDocs.length === 0,
        showAcceptedDocModal: acceptedDocs.length > 0,
        selectedDocType: documentType,
        acceptedDocuments: acceptedDocs,
        selectedAcceptedDocument:
          prevState.selectedDocType === documentType
            ? prevState.selectedAcceptedDocument
            : '',
        acceptedDocModalTitle: documentImageLabelMap[documentType],
      });

      // API call
      this.props.fetchLoanDocumentsByCategoryThunk(
        loanCategoryLabel,
        occupationLabel,
        documentCategory,

        // SUCCESS callback
        response => {
          const acceptedDocs = response?.data || [];
          this.setState(prev => updateStateAfterFetch(acceptedDocs, prev));
        },

        // ERROR callback → fallback to local list
        () => {
          this.setState(prev =>
            updateStateAfterFetch(defaultAcceptedDocs, prev),
          );
        },
      );
    } catch (err) {
      console.error('Unexpected error in handleUploadMedia:', err);
      this.setState({isLoadingDocument: false});
    }
  };

  handleFile = type => {
    // Handles file selected from FilePickerModal
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }
      this.setState({showFilePicker: false, isLoadingDocument: true});

      try {
        const presignedKey = await uploadDocumentViaPresignedUrl(
          asset,
          this.state.selectedDocType,
        );
        await this.uploadAndSetDocument(presignedKey);
      } catch (error) {
        this.setState({isLoadingDocument: false, showFilePicker: false});
        showToast('error', 'Something went wrong please try again..');
      }
    });
  };

  handleDeleteMedia = type => {
    this.setState(prev => {
      const updated = {...prev.documents};
      delete updated[type];
      return {documents: updated};
    });
  };

  closeFilePicker = () => {
    this.setState({showFilePicker: false});
  };

  handleViewImage = async uri => {
    if (!uri) {
      return showToast('error', strings.errorNoDocumentUpload);
    }

    this.setState({isLoadingDocument: true});

    const downloadUrlResponse = await getPresignedDownloadUrl({
      objectKey: uri,
    });

    let downloadedUrl = downloadUrlResponse?.data?.url;

    try {
      await viewDocumentHelper(
        downloadedUrl,
        imageUri => {
          navigate(ScreenNames.ImagePreviewScreen, {uri: imageUri});
        },
        error => {
          showToast('error', 'Could not open the document.', 'bottom', 3000);
        },
      );
    } finally {
      this.setState({isLoadingDocument: false});
    }
  };

  handleCustomerDocumentSubmission = () => {
    const {isEdit} = this.state;
    const {documents} = this.state;
    const {
      selectedCustomerId,
      selectedApplicationId,
      selectedLoanType,
      isReadOnlyLoanApplication,
    } = this.props;

    if (isReadOnlyLoanApplication) {
      return this.navigateToNextScreenBasedOnLoanType(selectedLoanType);
    }

    if (!validateRequiredDocuments(documents, requiredFields)) {
      return;
    }

    const payload = generateImageUploadPayload(
      documents,
      selectedCustomerId,
      isEdit,
    );

    const thunk = isEdit
      ? this.props.updateCustomerDocumentsThunk
      : this.props.uploadCustomerDocumentsThunk;

    this.setState({isLoading: true}, () => {
      thunk(
        payload,
        selectedApplicationId,
        () => {
          this.navigateToNextScreenBasedOnLoanType(selectedLoanType);
        },
        error => {
          showApiErrorToast(error);
        },
      ).finally(() => this.setState({isLoading: false}));
    });
  };

  handleBackPress = () => {
    const {isCreatingLoanApplication} = this.props;
    if (!isCreatingLoanApplication) {
      return goBack();
    }

    this.setState({showExitConfirmation: true});
  };

  setSelectedAcceptedDocument = async item => {
    const selectedAcceptedDocument = item?.document_accepted || '';
    const isAadhaar = selectedAcceptedDocument
      .toLowerCase()
      .includes('aadhaar');

    this.setState(
      {
        selectedAcceptedDocument,
        showAcceptedDocModal: false,
        isAadhaar,
        isLoadingDocument: isAadhaar,
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 330));

        this.setState(
          {
            showAcceptedDocModal: false,
            showFilePicker: !isAadhaar,
          },
          () => {
            if (isAadhaar) {
              this.autoUploadAadharCard();
            }
          },
        );
      },
    );
  };

  onModalHide = () => {
    this.setState({showExitConfirmation: false});
  };

  onContinuePress = () => {
    this.onModalHide();
  };

  onExitPress = async () => {
    this.setState({showExitConfirmation: false});
    await new Promise(resolve => setTimeout(resolve, 200));
    navigateToTab(ScreenNames.Applications);
    this.props.setIsCreatingLoanApplication(false);
  };

  autoUploadAadharCard = async () => {
    const {selectedLoanApplication} = this.props;

    let aadharKey =
      selectedLoanApplication?.customer?.customerDetails?.aadharFrontPhoto;

    await this.uploadAndSetDocument(aadharKey);
  };

  uploadAndSetDocument = async objectKey => {
    try {
      const {data} = await getPresignedDownloadUrl({objectKey});

      const docObj = {
        uri: data?.url,
        uploadedUrl: objectKey,
        uploadKey: objectKey,
        selectedDocType: this.state.selectedAcceptedDocument,
      };

      this.setState(prev => ({
        documents: {
          ...prev.documents,
          [prev.selectedDocType]: docObj,
        },
        selectedDocType: '',
        showFilePicker: false,
      }));
    } catch (error) {
      showToast('error', 'Something went wrong please try again..');
    } finally {
      this.setState({
        isLoadingDocument: false,
        showFilePicker: false,
        isAadhaar: false,
      });
    }
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      isReadOnlyLoanApplication,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};
    const {
      documents,
      showFilePicker,
      isOnboard,
      isLoading,
      isEdit,
      isLoadingDocument,
      acceptedDocuments,
      showAcceptedDocModal,
      selectedAcceptedDocument,
      acceptedDocModalTitle,
      showExitConfirmation,
    } = this.state;

    const typeOfIndividual =
      selectedLoanApplication?.customer?.customerDetails?.occupation;
    const loanProduct = selectedLoanApplication?.loanType;

    const docs = getDocumentRequirements(
      loanProduct,
      typeOfIndividual,
      loanDocuments,
    );

    return (
      <Loan_Documents_Component
        isOnboard={isOnboard || isEdit}
        headerProp={{
          title: `${
            isEdit && !isReadOnlyLoanApplication ? 'Edit ' : ''
          }Loan Documents`,
          subtitle: isCreatingLoanApplication
            ? formatVehicleNumber(UsedVehicle?.registerNumber)
            : '',
          showRightContent: true,

          rightLabel: selectedLoanApplication?.loanApplicationId || '',
          rightLabelColor: '#F8A902',
          onBackPress: this.handleBackPress,
        }}
        documentList={docs?.map(type => ({
          type,
          label: documentImageLabelMap[type],
          docObject: documents[type],
          onDeletePress: () => this.handleDeleteMedia(type),
          uploadMedia: () => this.handleUploadMedia(type),
          viewImage: () =>
            documents[type]?.uploadedUrl || isReadOnlyLoanApplication
              ? this.handleViewImage(documents[type]?.uploadedUrl)
              : this.handleUploadMedia(type),
          isRequired: requiredFields.includes(type),
        }))}
        onNextPress={this.onNextPress}
        fileModalProps={{
          isVisible: showFilePicker,
          onSelect: this.handleFile,
          onClose: this.closeFilePicker,
          autoCloseOnSelect: false,
        }}
        loading={isLoading}
        isLoadingDocument={isLoadingDocument}
        acceptedDocuments={acceptedDocuments}
        dropdownModalProps={{
          data: acceptedDocuments,
          visible: showAcceptedDocModal,
          selectedItem: selectedAcceptedDocument,
          onSelect: this.setSelectedAcceptedDocument,
          onClose: () => {
            this.setState({
              showAcceptedDocModal: false,
            });
          },
          title: `Select ${acceptedDocModalTitle} Type`,
          keyValue: 'document_accepted',
        }}
        isReadOnlyLoanApplication={isReadOnlyLoanApplication}
        exitConformationModalProp={{
          isVisible: showExitConfirmation,
          onModalHide: this.onModalHide,
          onContinuePress: this.onContinuePress,
          onExitPress: this.onExitPress,
        }}
      />
    );
  }
}

const mapActionCreators = {
  uploadCustomerDocumentsThunk,
  fetchCustomerDocumentsThunk,
  updateCustomerDocumentsThunk,
  setIsCreatingLoanApplication,
  fetchLoanDocumentsByCategoryThunk,
};

const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  isReadOnlyLoanApplication: loanData?.isReadOnlyLoanApplication,
});

export default connect(mapStateToProps, mapActionCreators)(LoanDocumentsScreen);
