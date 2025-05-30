import React, {Component} from 'react';
import {connect} from 'react-redux';
import Finance_Documents_Component from './Finance_Documents_Component';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {documentImageLabelMap, documentImageType} from '../../constants/enums';
import {
  formatDocumentImages,
  generateImageUploadPayload,
  handleFileSelection,
  validateRequiredDocuments,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {
  fetchCustomerFinanceDocumentsThunk,
  postCustomerFinanceDocumentsThunk,
} from '../../redux/actions';

const requiredFields = [
  documentImageType.SANCTION_LETTER,
  documentImageType.NOC,
];

class FinanceDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {},
      isLoadingDocument: false,
      showFilePicker: false,
      selectedDocType: null,
      isLoading: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
  }

  componentDidMount() {
    const {isEdit} = this.state;
    const {selectedApplicationId} = this.props;
    if (isEdit) {
      this.props.fetchCustomerFinanceDocumentsThunk(
        selectedApplicationId,
        {},
        response => {
          this.setState({
            documents: formatDocumentImages(response?.financeDocuments, ''),
          });
          console.log('response', JSON.stringify(response));
        },
      );
    }
  }

  onNextPress = () => {
    const {documents} = this.state;
    const {selectedApplicationId} = this.props;

    if (!validateRequiredDocuments(documents, requiredFields)) {
      return;
    }

    const payload = generateImageUploadPayload(documents, null, true, [
      documentImageType.SOA,
      documentImageType.SANCTION_LETTER,
      documentImageType.NOC,
      documentImageType.FORM_34,
    ]);

    delete payload.customerId;

    this.props.postCustomerFinanceDocumentsThunk(
      selectedApplicationId,
      payload,
      success => {
        let params = getScreenParam(this.props.route, 'params');
        navigate(ScreenNames.LoanAmount, {params});
      },
      error => {},
    );
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

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
    } = this.props;

    const {UsedVehicle = {}} = selectedVehicle || {};

    const {documents, showFilePicker, isOnboard, isLoading, isEdit} =
      this.state;

    return (
      <>
        <Finance_Documents_Component
          headerProp={{
            title: 'Finance Document',
            subtitle: isCreatingLoanApplication
              ? formatVehicleNumber(UsedVehicle?.registerNumber)
              : '',
            showRightContent: true,
            rightLabel:
              isCreatingLoanApplication || isEdit
                ? selectedLoanApplication?.loanApplicationId || ''
                : '',
            rightLabelColor: '#F8A902',
            onBackPress: () => goBack(),
          }}
          documentList={[
            documentImageType.SOA,
            documentImageType.SANCTION_LETTER,
            documentImageType.NOC,
            documentImageType.FORM_34,
          ].map(type => ({
            type,
            label: documentImageLabelMap[type],
            docObject: documents[type],
            onDeletePress: () => this.handleDeleteMedia(type),
            uploadMedia: () => this.handleUploadMedia(type),
            viewImage: () => this.handleViewImage(documents[type]?.uri),
            isRequired: requiredFields.includes(type),
          }))}
          handleNextStepPress={this.handleNextStepPress}
          onNextPress={this.onNextPress}
          fileModalProps={{
            isVisible: showFilePicker,
            onSelect: this.handleFile,
            onClose: this.closeFilePicker,
            autoCloseOnSelect: false,
          }}
          loading={loading}
        />
      </>
    );
  }
}

const mapActionCreators = {
  postCustomerFinanceDocumentsThunk,
  fetchCustomerFinanceDocumentsThunk,
};

const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: loanData?.selectedCustomer,
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(FinanceDocumentsScreen);
