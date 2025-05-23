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
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {formatVehicleNumber, showToast} from '../../utils/helper';
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

    const payload = Object.keys(this.state.documents).reduce((acc, key) => {
      acc[key] = this.state.documents[key].uploadedUrl;
      return acc;
    }, {});

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
    // Trigger file picker modal
    this.setState({showFilePicker: true, selectedDocType: type});
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
          uploadedUrl: url,
          uri: url,
        };
      }
    });

    return result;
  };

  render() {
    const {documents, isLoadingDocument, showFilePicker} = this.state;
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
        isLoadingDocument={isLoadingDocument}
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
