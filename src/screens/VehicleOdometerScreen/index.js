import {get} from 'lodash';
import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  getLabelFromEnum,
  vehicleConditionOptions,
  vehicleConditionValue,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {updateVehicleByIdThunk} from '../../redux/actions';
import {
  handleFileSelection,
  viewDocumentHelper,
} from '../../utils/documentUtils';
import {uploadApplicantPhoto} from '../../utils/fileUploadUtils';
import {showApiErrorToast, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Vehicle_Odometer_Component from './Vehicle_Odometer_Component';
import strings from '../../locales/strings';

class VehicleOdometerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odometerImage: null,
      odometerReading: '',
      showFilePicker: false,
      vehicleCondition: '',
      errors: {
        odometerReading: '',
        vehicleCondition: '',
        odometerImage: '',
      },
      isFormValid: false,
      isLoading: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.handleOdometerImageSelect = this.handleOdometerImageSelect.bind(this);
    this.selectedVehicleCondition = this.selectedVehicleCondition.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
    this.selectVehicleConditionOption =
      this.selectVehicleConditionOption.bind(this);
  }

  componentDidMount() {
    const {selectedVehicle} = this.props;
    const odometer = get(selectedVehicle, 'UsedVehicle.odometerReading');

    this.setState({
      odometerReading: odometer != null ? `${odometer}` : '' + '',
      vehicleCondition: get(
        selectedVehicle,
        'UsedVehicle.vehicleCondition',
        '',
      ),
      odometerImage: selectedVehicle?.UsedVehicle?.images?.[0]?.odometerReading,
    });
  }

  onBackPress = () => {
    goBack();
  };

  handleOdometerImageSelect = async () => {
    this.setState({showFilePicker: true});
  };

  selectedVehicleCondition = () => {
    Alert.alert('Test');
  };

  handleFile = type => {
    handleFileSelection(type, async asset => {
      if (!asset?.uri) {
        return;
      }

      this.setState({
        showFilePicker: false,
      });

      await new Promise(resolve => setTimeout(resolve, 110));
      this.setState({isLoading: true});

      try {
        const url = await uploadApplicantPhoto(
          asset,
          asset.fileName || asset.name || '',
          asset.type,
        );

        this.setState(
          prev => ({
            selectedDocType: '',
            odometerImage: url,
            showFilePicker: false,
          }),
          () => {
            this.onChangeField('odometerImage', url);
          },
        );
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
    this.setState({
      showFilePicker: false,
    });
  };

  selectVehicleConditionOption = item => {
    this.setState(
      {
        vehicleCondition: item.value,
      },
      () => {
        this.onChangeField('vehicleCondition', this.state.vehicleCondition);
      },
    );
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  onNextPress = () => {
    const {selectedVehicle} = this.props;
    const {vehicleCondition, odometerImage, odometerReading} = this.state;
    let vehicleId = selectedVehicle?.UsedVehicle?.id;
    const isFormValid = this.validateAllFields();
    if (!isFormValid) {
      return showToast('error', strings.errorMissingField);
    }

    let payload = {
      odometerReadingImage: odometerImage,
      odometerReading: Number(odometerReading),
      vehicleCondition: vehicleCondition,
    };

    this.props.updateVehicleByIdThunk(vehicleId, payload, () => {
      navigate(ScreenNames.VehiclePricing);
    });
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'odometerReading',
      'vehicleCondition',
      'odometerImage',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  onDeletePress = () => {
    this.setState({
      odometerImage: null,
    });
  };

  handleViewImage = async () => {
    const {odometerImage} = this.state;
    if (!odometerImage) {
      return showToast('error', strings.errorNoDocumentUpload);
    }

    setTimeout(async () => {
      this.setState({isLoadingDocument: true});
      try {
        await viewDocumentHelper(
          odometerImage,
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

  render() {
    const {
      showFilePicker,
      odometerImage,
      odometerReading,
      vehicleCondition,
      errors,
      isLoading,
    } = this.state;

    const {loading} = this.props;
    return (
      <>
        <Vehicle_Odometer_Component
          onBackPress={this.onBackPress}
          handleOdometerImageSelect={this.handleOdometerImageSelect}
          odometerImage={odometerImage}
          selectedVehicleCondition={this.selectedVehicleCondition}
          handleOdometerChange={value =>
            this.onChangeField('odometerReading', value)
          }
          odometerReading={odometerReading}
          onNextPress={this.onNextPress}
          fileModalProps={{
            showFilePicker: showFilePicker,
            handleFile: this.handleFile,
            closeFilePicker: this.closeFilePicker,
          }}
          vehicleConditions={vehicleConditionOptions}
          vehicleCondition={getLabelFromEnum(
            vehicleConditionValue,
            vehicleCondition,
          )}
          selectVehicleConditionOption={this.selectVehicleConditionOption}
          restInputProps={{
            odometerReading: {
              isError: errors.odometerReading,
              statusMsg: errors.odometerReading,
            },
            vehicleCondition: {
              isError: errors.vehicleCondition,
              statusMsg: errors.vehicleCondition,
            },
            odometerReadingPhoto: {
              isError: errors?.odometerImage,
              statusMsg: errors?.odometerImage,
            },
          }}
          loading={loading}
          onDeletePress={this.onDeletePress}
          viewImage={this.handleViewImage}
          isLoading={isLoading}
        />
      </>
    );
  }
}

const mapDispatchToProps = {updateVehicleByIdThunk};
const mapStateToProps = ({vehicleData}) => {
  return {
    selectedVehicle: vehicleData?.selectedVehicle,
    loading: vehicleData?.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleOdometerScreen);
