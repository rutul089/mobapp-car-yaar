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
} from '../../navigation/NavigationUtils';
import {
  fetchCustomerDocumentsThunk,
  getPresignedUploadUrlThunk,
  updateCustomerDocumentsThunk,
  uploadCustomerDocumentsThunk,
  uploadFileToPresignedUrlThunk,
} from '../../redux/actions';
import {
  formatDocumentImages,
  generateImageUploadPayload,
  handleFileSelection,
  validateRequiredDocuments,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {
  formatVehicleNumber,
  showApiErrorToast,
  showToast,
} from '../../utils/helper';
import Loan_Documents_Component from './Loan_Documents_Component';
import {
  getPresignedDownloadUrl,
  getPresignedUploadUrl,
  uploadFileToPresignedUrl,
} from '../../services';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

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
    const {selectedApplicationId} = this.props;

    this.setState({isLoading: true}, async () => {
      try {
        await this.props.fetchCustomerDocumentsThunk(
          selectedApplicationId,
          {},
          response => {
            if (response.success) {
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
    // Trigger file picker modal
    this.setState({showFilePicker: true, selectedDocType: type});
  };

  handleFile = type => {
    // Handles file selected from FilePickerModal
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      try {
        this.setState({isLoading: true});
        const fileName = asset.name || asset.fileName || 'upload';
        const mimeType = asset.type || 'application/octet-stream';

        // Step 1: Get the presigned upload URL
        const uploadUrlResponse = await getPresignedUploadUrl({
          objectKey: fileName,
          prefix: this.state.selectedDocType,
        });

        const presignedUrl = uploadUrlResponse?.data?.url;
        const presignedKey = uploadUrlResponse?.data?.key;

        if (!presignedUrl) {
          throw new Error('Presigned URL not received');
        }
        const fileBase64 = await RNFS.readFile(asset.uri, 'base64');
        const fileBuffer = Buffer.from(fileBase64, 'base64');

        await fetch(presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': mimeType,
            'Content-Length': fileBuffer.length.toString(),
          },
          body: fileBuffer,
        });

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
          showFilePicker: false,
        }));
      } catch (error) {
        this.closeFilePicker();
        setTimeout(() => {
          showToast('error', 'Image do not upload');
        }, 100);
      } finally {
        this.setState({isLoading: false});
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

  handleCustomerDocumentSubmission = () => {
    const {isEdit} = this.state;
    const {documents} = this.state;
    const {selectedCustomerId, selectedApplicationId, selectedLoanType} =
      this.props;

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

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};
    const {documents, showFilePicker, isOnboard, isLoading, isEdit} =
      this.state;
    return (
      <Loan_Documents_Component
        isOnboard={isOnboard || isEdit}
        headerProp={{
          title: `${isEdit ? 'Edit ' : ''}Loan Documents`,
          subtitle: isCreatingLoanApplication
            ? formatVehicleNumber(UsedVehicle?.registerNumber)
            : '',
          showRightContent: true,
          // rightLabel: isCreatingLoanApplication
          //   ? selectedLoanApplication?.loanApplicationId || ''
          //   : '',
          rightLabel: selectedLoanApplication?.loanApplicationId || '',
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
      />
    );
  }
}

const mapActionCreators = {
  uploadCustomerDocumentsThunk,
  fetchCustomerDocumentsThunk,
  updateCustomerDocumentsThunk,
  getPresignedUploadUrlThunk,
  uploadFileToPresignedUrlThunk,
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
