import React, {Component} from 'react';
import Vehicle_Odometer_Component from './Vehicle_Odometer_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {pickImage} from '../../utils/imagePicker';
import {Alert} from 'react-native';
import ScreenNames from '../../constants/ScreenNames';
import {handleFileSelection} from '../../utils/documentUtils';
import {
  getLabelFromEnum,
  vehicleConditionOptions,
  vehicleConditionValue,
} from '../../constants/enums';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {showToast} from '../../utils/helper';
import {connect} from 'react-redux';
import {updateVehicleByIdThunk} from '../../redux/actions';
import {get} from 'lodash';

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
      },
      isFormValid: false,
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

      const docObj = {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
        isLocal: true,
        fileSize: asset.fileSize,
        uploadedUrl:
          'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf', // mock
      };

      this.setState({
        odometerImage: docObj.uri,
        showFilePicker: false,
      });

      // TODO : Upload API call here to get the link
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
      return showToast('error', 'Please enter all field');
    }

    let payload = {
      odometerReadingImage: 'https://example.com/images/odometer.jpg',
      odometerReading: Number(odometerReading),
      vehicleCondition: vehicleCondition,
    };

    // this.props.updateVehicleByIdThunk(vehicleId, payload);
    navigate(ScreenNames.VehiclePricing);
  };

  validateAllFields = () => {
    const fieldsToValidate = ['odometerReading', 'vehicleCondition'];

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

  render() {
    const {
      showFilePicker,
      odometerImage,
      odometerReading,
      vehicleCondition,
      errors,
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
          }}
          loading={loading}
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
