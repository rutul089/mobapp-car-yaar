import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  vehicleImageLabelMap,
  vehicleImageType,
  vehicleImageTypes,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {updateVehicleByIdThunk} from '../../redux/actions';
import {
  generateImageUploadPayload,
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {uploadApplicantPhoto} from '../../utils/fileUploadUtils';
import {
  formatVehicleNumber,
  showApiErrorToast,
  showToast,
} from '../../utils/helper';
import Vehicle_Images_Component from './Vehicle_Images_Component';

class VehicleImagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {}, // Holds selected/uploaded documents by type
      showImages: [],
      errorSteps: [],
      isLoadingDocument: false,
      showFilePicker: false,
      selectedDocType: null,
      isLoading: false,
    };
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    const {selectedVehicle} = this.props;
    let documentDetails = selectedVehicle?.UsedVehicle?.images?.[0];

    if (documentDetails) {
      const formattedDocs = this.convertVehicleImageData(documentDetails);
      this.setState({documents: formattedDocs});
    }
  }

  saveAsDraftPress = () => {};

  onNextPress = () => {
    const {selectedVehicle} = this.props;
    let vehicleId = selectedVehicle?.UsedVehicle?.id;

    const payload = generateImageUploadPayload(
      this.state.documents,
      '',
      true,
      vehicleImageTypes,
    );

    delete payload.customerId;

    this.props.updateVehicleByIdThunk(vehicleId, payload, () => {
      return navigate(ScreenNames.VehicleOdometer);
    });
  };

  onBackPress = () => {
    goBack();
  };

  handleDeleteMedia = type => {
    this.setState(prev => {
      const updated = {...prev.documents};
      delete updated[type];
      return {documents: updated};
    });
  };

  handleUploadMedia = async type => {
    this.setState({showFilePicker: true, selectedDocType: type});
  };

  formatImageUploadData = (imageData, selectedUri) => {
    const formatted = Object.entries(imageData).map(([key, value]) => ({
      url: value.uploadKey,
      type: key,
      uri: value.uri,
    }));

    if (!selectedUri) {
      return formatted;
    }

    // Move the selected item to the top
    const index = formatted.findIndex(item => item.uri === selectedUri);
    if (index > -1) {
      const [selectedItem] = formatted.splice(index, 1);
      formatted.unshift(selectedItem);
    }

    return formatted;
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
            navigate(ScreenNames.ImagePreviewScreen, {
              imageList: this.formatImageUploadData(
                this.state.documents,
                imageUri,
              ),
            });
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

  handleFile = type => {
    // Handles file selected from FilePickerModal
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      const fileName = asset.name || asset.fileName || 'upload';
      const mimeType = asset.type || 'application/octet-stream';

      this.setState({
        showFilePicker: false,
        isLoading: true,
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const url = await uploadApplicantPhoto(asset, fileName, mimeType);

        const docObj = {
          uri: asset.uri,
          name: fileName,
          type: mimeType,
          isLocal: true,
          fileSize: asset.fileSize,
          uploadKey: url,
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
        showApiErrorToast(error);
      } finally {
        this.setState({
          isLoading: false,
          selectedDocType: '',
          showFilePicker: false,
        });
      }
    });
  };

  closeFilePicker = () => {
    this.setState({showFilePicker: false});
  };

  convertVehicleImageData = data => {
    const result = {};

    Object.values(vehicleImageType).forEach(key => {
      const url =
        Array.isArray(data[key]) && data[key][0] ? data[key][0] : null;

      if (url) {
        result[key] = {
          fileSize: null,
          isLocal: false,
          type: null,
          uri: url,
          uploadKey: url,
        };
      }
    });

    return result;
  };

  render() {
    const {documents, isLoadingDocument, showFilePicker, isLoading} =
      this.state;
    const {loading, selectedVehicle} = this.props;

    return (
      <Vehicle_Images_Component
        registerNumber={formatVehicleNumber(
          selectedVehicle?.UsedVehicle?.registerNumber,
        )}
        vehicleImages={vehicleImageTypes.map(type => ({
          type,
          label: vehicleImageLabelMap[type],
          docObject: documents[type],
          onDeletePress: () => this.handleDeleteMedia(type),
          uploadMedia: () => this.handleUploadMedia(type),
          viewImage: () => this.handleViewImage(documents[type]?.uri),
        }))}
        saveAsDraftPress={this.saveAsDraftPress}
        onNextPress={this.onNextPress}
        onBackPress={this.onBackPress}
        filePickerProps={{
          showFilePicker: showFilePicker,
          handleFile: this.handleFile,
          closeFilePicker: this.closeFilePicker,
        }}
        isLoadingDocument={isLoadingDocument || isLoading}
        loading={loading}
      />
    );
  }
}

const mapDispatchToProps = {updateVehicleByIdThunk};
const mapStateToProps = ({vehicleData}) => {
  return {
    loading: vehicleData?.loading,
    selectedVehicle: vehicleData?.selectedVehicle,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleImagesScreen);
