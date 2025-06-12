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
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {getPresignedDownloadUrl, getPresignedUploadUrl} from '../../services';
import {uploadDocumentViaPresignedUrl} from '../../utils/fileUploadUtils';

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
          if (response.financeDocuments) {
            this.setState({
              documents: formatDocumentImages(response?.financeDocuments, ''),
            });
          }
        },
      );
    }
  }

  onNextPress = () => {
    const {documents} = this.state;
    const {selectedApplicationId, isReadOnlyLoanApplication, route} =
      this.props;

    const goToFinanceDocuments = () => {
      let params = getScreenParam(route, 'params');
      navigate(ScreenNames.LoanAmount, {params});
    };

    if (isReadOnlyLoanApplication) {
      return goToFinanceDocuments();
    }

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
        goToFinanceDocuments();
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

      this.setState({showFilePicker: false, isLoadingDocument: true});
      await new Promise(resolve => setTimeout(resolve, 110));

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
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
          isLocal: true,
          fileSize: asset.fileSize,
          uploadedUrl: asset.uri,
          uploadKey: presignedKey,
        };

        this.setState(prev => ({
          documents: {
            ...prev.documents,
            [this.state.selectedDocType]: docObj,
          },
          selectedDocType: '',
        }));
      } catch (error) {
        this.closeFilePicker();
        setTimeout(() => {
          showToast('error', 'Image do not upload');
        }, 100);
      } finally {
        this.setState({
          isLoadingDocument: false,
          showFilePicker: false,
        });
      }
    });
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
      isReadOnlyLoanApplication,
    } = this.props;

    const {UsedVehicle = {}} = selectedVehicle || {};

    const {documents, showFilePicker, isLoadingDocument, isEdit} = this.state;

    return (
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
          documentImageType.OTHER_DOCUMENTS,
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
        isLoadingDocument={isLoadingDocument}
        isReadOnlyLoanApplication={isReadOnlyLoanApplication}
      />
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
  isReadOnlyLoanApplication: loanData?.isReadOnlyLoanApplication,
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(FinanceDocumentsScreen);
