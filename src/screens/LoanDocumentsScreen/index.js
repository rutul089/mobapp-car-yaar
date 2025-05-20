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
  generateImageUploadPayload,
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {showToast} from '../../utils/helper';
import Loan_Documents_Component from './Loan_Documents_Component';
import {uploadCustomerDocumentsThunk} from '../../redux/actions';

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
    };
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    const formattedDocs = {};

    const {isOnboard} = this.state;

    // this.setState({
    //   documents: formatDocumentImages(
    //     response?.details,
    //     'https://your-image-server.com/images/',
    //   ),
    // });
    console.log({isOnboard});
  }

  onNextPress = () => {
    const {selectedLoanType} = this.props;
    const {isOnboard} = this.state;
    if (isOnboard) {
      this.uploadCustomerDocuments();
      return;
    }
    if (selectedLoanType === loanType.refinance) {
      return navigate(ScreenNames.FinanceDetails);
    } else if (
      selectedLoanType === loanType.topUp ||
      selectedLoanType === loanType.internalBT ||
      selectedLoanType === loanType.externalBT
    ) {
      return navigate(ScreenNames.CarFinanceDetails);
    } else if (selectedLoanType === loanType.loan) {
      return navigate(ScreenNames.CheckCIBIL);
    } else {
      navigate(ScreenNames.LoanAmount);
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
        uploadedUrl:
          'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf', // mock URL for now
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

  uploadCustomerDocuments = () => {
    this.setState({isLoading: true});
    const {documents} = this.state;
    const {selectedCustomerId} = this.props;

    const customerId = selectedCustomerId;
    // const customerId = '0a9a0e0d-c8a9-4534-9c04-c1eb8df4ae0d';

    const payload = generateImageUploadPayload(documents, customerId);
    console.log(payload);
    this.props
      .uploadCustomerDocumentsThunk(
        payload,
        response => {
          return navigateToTab(ScreenNames.Customer);
        },
        error => {},
      )
      .finally(() => this.setState({isLoading: false}));
  };

  render() {
    const {
      documents,
      isLoadingDocument,
      showFilePicker,
      isOnboard,
      registrationNumber,
      isLoading,
    } = this.state;
    return (
      <Loan_Documents_Component
        isOnboard={isOnboard}
        headerProp={{
          title: 'Loan Documents',
          subtitle: isOnboard ? '' : '',
          showRightContent: true,
          rightLabel: isOnboard ? '' : registrationNumber,
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

const mapActionCreators = {uploadCustomerDocumentsThunk};

const mapStateToProps = ({loanData, customerData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  loading: customerData?.loading,
});

export default connect(mapStateToProps, mapActionCreators)(LoanDocumentsScreen);
