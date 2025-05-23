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
  updateCustomerDocumentsThunk,
  uploadCustomerDocumentsThunk,
} from '../../redux/actions';
import {
  formatDocumentImages,
  generateImageUploadPayload,
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {showApiErrorToast, showToast} from '../../utils/helper';
import Loan_Documents_Component from './Loan_Documents_Component';

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
    };
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    const {isOnboard, isEdit} = this.state;
    const {documentDetail} = this.props;
    const isEmpty =
      Array.isArray(documentDetail) && documentDetail.length === 0;

    if (isEdit) {
      this.fetchCustomerDocuments();
    }
  }

  fetchCustomerDocuments = async () => {
    const {selectedCustomerId} = this.props;

    this.setState({isLoading: true}, async () => {
      try {
        await this.props.fetchCustomerDocumentsThunk(
          selectedCustomerId,
          {},
          response => {
            if (
              response.success &&
              Array.isArray(response.data) &&
              response.data.length > 0
            ) {
              const data = response.data[0];
              this.setState({documents: formatDocumentImages(data, '')});
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
    switch (selectedLoanType) {
      case loanType.refinance:
        return navigate(ScreenNames.FinanceDetails);

      case loanType.topUp:
      case loanType.internalBT:
      case loanType.externalBT:
        return navigate(ScreenNames.CarFinanceDetails);

      case loanType.loan:
        return navigate(ScreenNames.CheckCIBIL);

      default:
        return navigate(ScreenNames.LoanAmount);
    }
  };

  handleUploadMedia = async type => {
    // Trigger file picker modal
    this.setState({showFilePicker: true, selectedDocType: type});
  };

  handleFile = type => {
    // Handles file selected from FilePickerModal
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      const docObj = {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
        isLocal: true,
        fileSize: asset.fileSize,
        uploadedUrl: asset.uri,
        // uploadedUrl:
        //   'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf', // mock URL for now
      };

      this.setState(prev => ({
        documents: {
          ...prev.documents,
          [this.state.selectedDocType]: docObj,
        },
        selectedDocType: '',
        showFilePicker: false,
      }));

      // TODO: Upload logic placeholder, uncomment when implementing real upload
      // try {
      //   const formData = new FormData();
      //   formData.append('file', {
      //     uri: docObj.uri,
      //     type: docObj.type,
      //     name: docObj.name,
      //   });

      //   const response = await uploadDocumentMultipart(formData);
      //   const url = response?.data?.url;

      //   if (url) {
      //     this.setState(prev => ({
      //       documents: {
      //         ...prev.documents,
      //         [type]: {
      //           ...prev.documents[type],
      //           uploadedUrl: url,
      //         },
      //       },
      //     }));
      //   }
      // } catch (error) {
      //   showApiErrorToast(error);
      // }
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

    setTimeout(async () => {
      this.setState({isLoadingDocument: true});
      try {
        await viewDocumentHelper(
          uri,
          imageUri => {
            navigate(ScreenNames.ImagePreviewScreen, {uri: imageUri});
          },
          error => {
            console.warn('Error opening file:', error);
            showToast('error', 'Could not open the document.', 'bottom', 3000);
          },
        );
      } finally {
        this.setState({isLoadingDocument: false});
      }
    }, 50);
  };

  handleCustomerDocumentSubmission = () => {
    const {isEdit} = this.state;
    const {documents} = this.state;
    const {selectedCustomerId, selectedApplicationId, selectedLoanType} =
      this.props;

    const customerId = isEdit ? selectedCustomerId : selectedApplicationId;

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

          // navigateToTab(ScreenNames.Customer);
        },
        error => {
          showApiErrorToast(error);
        },
      ).finally(() => this.setState({isLoading: false}));
    });
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};
    const {
      documents,
      isLoadingDocument,
      showFilePicker,
      isOnboard,
      registrationNumber,
      isLoading,
      isEdit,
    } = this.state;
    return (
      <Loan_Documents_Component
        isOnboard={isOnboard || isEdit}
        headerProp={{
          title: `${isEdit ? 'Edit ' : ''}Loan Documents`,
          subtitle: isCreatingLoanApplication
            ? UsedVehicle?.registerNumber
            : '',
          showRightContent: true,
          rightLabel: isCreatingLoanApplication
            ? selectedLoanApplication?.loanApplicationId || ''
            : '',
          rightLabelColor: '#F8A902',
          onBackPress: () => goBack(),
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
      />
    );
  }
}

const mapActionCreators = {
  uploadCustomerDocumentsThunk,
  fetchCustomerDocumentsThunk,
  updateCustomerDocumentsThunk,
};

const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
});

export default connect(mapStateToProps, mapActionCreators)(LoanDocumentsScreen);
