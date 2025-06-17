import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  documentImageLabelMap,
  documentImageType,
  loanType,
} from '../../constants/enums';
import {
  getScreenParam,
  goBack,
  navigate,
  navigateToTab,
} from '../../navigation/NavigationUtils';
import {
  fetchCustomerDocumentsThunk,
  setIsCreatingLoanApplication,
  updateCustomerDocumentsThunk,
  uploadCustomerDocumentsThunk,
} from '../../redux/actions';
import {getPresignedDownloadUrl} from '../../services';
import {
  formatDocumentImages,
  generateImageUploadPayload,
  handleFileSelection,
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
import {loan_document_requirements} from '../../constants/loan_document_requirements';
import {Alert, BackHandler} from 'react-native';

const requiredFields = [
  'addressProofImage',
  'idProofImage',
  'incomeProofImage',
  'bankingProofImage',
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
    };
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
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

    this.setState({isLoading: true}, async () => {
      try {
        await this.props.fetchCustomerDocumentsThunk(
          selectedApplicationId,
          {},
          response => {
            if (response.success && response !== null) {
              this.setState({
                documents: formatDocumentImages(response.data, ''),
              });
            }
          },
        );
      } finally {
        this.setState({isLoading: false});
      }
    });
  };

  onNextPress = () => {
    const {selectedLoanType} = this.props;
    const {isOnboard, isEdit} = this.state;
    // if (isOnboard || isEdit) {
    //   this.handleCustomerDocumentSubmission();
    //   return;
    // }
    this.handleCustomerDocumentSubmission();

    // this.navigateToNextScreenBasedOnLoanType(selectedLoanType);
  };

  navigateToNextScreenBasedOnLoanType = selectedLoanType => {
    let params = getScreenParam(this.props.route, 'params');

    switch (selectedLoanType) {
      case loanType.refinance:
        return navigate(ScreenNames.FinanceDetails, {params: params});
      // return navigate(ScreenNames.VehicleHypothecation);

      case loanType.topUp:
      case loanType.internalBT:
      case loanType.externalBT:
        return navigate(ScreenNames.CarFinanceDetails, {params: params});

      case loanType.loan:
        return navigate(ScreenNames.CheckCIBIL);

      default:
        return navigate(ScreenNames.LoanAmount, {params: params});
    }
  };

  handleUploadMedia = async type => {
    const {selectedLoanApplication} = this.props;
    let typeOfIndividual =
      selectedLoanApplication?.customer?.customerDetails?.occupation;
    let documentType = type;
    let loadProduct = selectedLoanApplication?.loanType;

    const matched = loan_document_requirements.find(
      item =>
        item.loadProduct === loadProduct &&
        item.typeOfIndividual === typeOfIndividual &&
        item.documentType === documentType,
    );

    let acceptedDocuments =
      matched?.acceptedDocuments?.map(doc => ({label: doc})) || [];

    // console.log({typeOfIndividual, documentType, loadProduct});
    // console.log(acceptedDocuments);

    // Trigger file picker modal
    this.setState({
      showFilePicker: true,
      // showFilePicker: !acceptedDocuments.length,
      // showAcceptedDocModal: acceptedDocuments.length,
      selectedDocType: type,
      acceptedDocuments,
    });
  };

  handleFile = type => {
    // Handles file selected from FilePickerModal
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      this.setState({showFilePicker: false, isLoadingDocument: true});

      try {
        const fileName = asset.name || asset.fileName || 'upload';
        const mimeType = asset.type || 'application/octet-stream';

        const presignedKey = await uploadDocumentViaPresignedUrl(
          asset,
          fileName,
          mimeType,
          this.state.selectedDocType,
        );

        const docObj = {
          uri: presignedKey,
          uploadedUrl: presignedKey,
          uploadKey: presignedKey,
        };

        this.setState(prev => ({
          documents: {
            ...prev.documents,
            [this.state.selectedDocType]: docObj,
          },
          selectedDocType: '',
          showFilePicker: false,
        }));
      } catch (error) {
        showToast('error', 'Something went wrong please try again..');
      } finally {
        this.setState({isLoadingDocument: false, showFilePicker: false});
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
      return;
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
    const customerId = isEdit ? selectedCustomerId : selectedApplicationId;

    if (!validateRequiredDocuments(documents, requiredFields)) {
      return;
    }

    const payload = generateImageUploadPayload(
      documents,
      selectedCustomerId,
      isEdit,
    );

    const thunk = isEdit
      ? this.props.uploadCustomerDocumentsThunk
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

    Alert.alert(
      'Warning',
      "You're in the middle of your loan application. If you exit now, your progress may be lost.",
      [
        {
          text: 'Continue',
          onPress: () => console.log('Exit cancelled'), // or navigate back to form
          style: 'cancel',
        },
        {
          text: 'Exit Anyway',
          onPress: () => {
            navigateToTab(ScreenNames.Applications);
            this.props.setIsCreatingLoanApplication(false);
          },
        },
      ],
      {cancelable: true},
    );
  };

  setSelectedAcceptedDocument = async item => {
    this.setState(
      {
        selectedAcceptedDocument: item?.label,
        showAcceptedDocModal: false,
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 330));
        this.setState({
          showAcceptedDocModal: false,
          showFilePicker: true,
        });
      },
    );
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
    } = this.state;

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
          // rightLabel: isCreatingLoanApplication
          //   ? selectedLoanApplication?.loanApplicationId || ''
          //   : '',
          rightLabel: selectedLoanApplication?.loanApplicationId || '',
          rightLabelColor: '#F8A902',
          onBackPress: this.handleBackPress,
        }}
        documentList={[
          documentImageType.ID_PROOF,
          documentImageType.ADDRESS_PROOF,
          documentImageType.PERMANENT_ADDRESS,
          documentImageType.INCOME_PROOF,
          documentImageType.BANKING_PROOF,
          documentImageType.BUSINESS_PROOF,
          documentImageType.INSURANCE,
        ].map(type => ({
          type,
          label: documentImageLabelMap[type],
          docObject: documents[type],
          onDeletePress: () => this.handleDeleteMedia(type),
          uploadMedia: () => this.handleUploadMedia(type),
          viewImage: () => this.handleViewImage(documents[type]?.uri),
          isRequired: requiredFields.includes(type),
        }))}
        otherDocuments={[
          documentImageType.APPLICATION_FORM,
          documentImageType.PASSPORT_SIZE_PHOTO,
          documentImageType.CO_APPLICANT_DOCUMENTS,
        ].map(type => ({
          type,
          label: documentImageLabelMap[type],
          docObject: documents[type],
          onDeletePress: () => this.handleDeleteMedia(type),
          uploadMedia: () => this.handleUploadMedia(type),
          viewImage: () => this.handleViewImage(documents[type]?.uri),
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
            this.setState({showAcceptedDocModal: false});
          },
        }}
        isReadOnlyLoanApplication={isReadOnlyLoanApplication}
      />
    );
  }
}

const mapActionCreators = {
  uploadCustomerDocumentsThunk,
  fetchCustomerDocumentsThunk,
  updateCustomerDocumentsThunk,
  setIsCreatingLoanApplication,
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
