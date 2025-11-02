import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import Edit_Vehicle_Detail_Component from './Edit_Vehicle_Detail_Component';
import {
  calculateVehicleAge,
  formatDate,
  formatVehicleNumber,
  showToast,
  toISODateNoShift,
} from '../../utils/helper';
import ScreenNames from '../../constants/ScreenNames';
import {
  currentLoanOptions,
  fuelTypeValue,
  getLabelFromEnum,
} from '../../constants/enums';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import strings from '../../locales/strings';

class EditVehicleDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuelType: '',
      ownerName: '',
      manufactureYear: '',
      chassisNumber: '',
      engineNumber: '',
      registrationDate: '',
      registrationAuthority: '',
      emissionNorm: '',
      vehicleAge: '',
      vehicleStatus: '',
      insuranceValidUpto: '',
      fitnessValidUpto: '',
      PUCC: currentLoanOptions.NO,
      ownershipCount: '',
      make: '',
      model: '',
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      registerNumber:
        getScreenParam(props.route, 'params')?.registerNumber || '',
      errors: {},
      isManYearEdited: false,
    };
    this.setSelectedFuelType = this.setSelectedFuelType.bind(this);
    this.onSelectedPuc = this.onSelectedPuc.bind(this);
  }

  componentDidMount() {
    const {isEdit} = this.state;
    const {selectedVehicle} = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};

    if (!isEdit) {
      return;
    }
    console.log('selectedVehicle', JSON.stringify(selectedVehicle));

    const mappedFields = {
      make: selectedVehicle?.make,
      model: selectedVehicle?.model,
      fuelType: selectedVehicle?.fuelType,
      ownerName: UsedVehicle?.ownerName,
      manufactureYear: String(UsedVehicle?.manufactureYear),
      chassisNumber: UsedVehicle?.chassisNumber,
      engineNumber: UsedVehicle?.engineNumber,
      registrationDate: UsedVehicle?.registrationDate,
      registrationAuthority: UsedVehicle?.registrationAuthority,
      emissionNorm: UsedVehicle?.emissionNorm,
      vehicleAge: UsedVehicle?.vehicleAge,
      insuranceValidUpto: UsedVehicle?.insuranceValidUpto,
      fitnessValidUpto: UsedVehicle?.fitnessValidUpto,
      PUCC: UsedVehicle?.PUCC,
      vehicleStatus: UsedVehicle?.vehicleStatus,
      ownershipCount: String(UsedVehicle?.ownershipCount),
      registerNumber: UsedVehicle?.registerNumber,
    };
    this.setState({
      ...mappedFields,
    });
  }

  onNextPress = () => {
    const {isCreatingLoanApplication} = this.props;
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    let payload = this.getPayload();
    return;
    navigate(
      isCreatingLoanApplication
        ? ScreenNames.CustomerFullScreen
        : ScreenNames.VehicleImages,
    );
  };

  setSelectedFuelType = item => {
    this.setState(
      {
        fuelType: item.value,
      },
      () => {
        this.onChangeField('fuelType', this.state.fuelType);
      },
    );
  };

  onSelectedPuc = value => {
    this.onChangeField('PUCC', value);
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, value?.toString()?.trim().length === 0);
  };

  handleDateSelection = (date, key) => {
    let formattedDate = toISODateNoShift(date);
    this.setState(
      {
        [key]: formattedDate,
      },
      () => {
        this.onChangeField(key, this.state?.[key]);
      },
    );
  };

  validateAllFields = () => {
    const {isCarFinanced} = this.state;
    const fieldValidationRules = {
      loanClosedDate: {required: isCarFinanced},
    };

    const fieldsToValidate = [
      'ownerName',
      'manufactureYear',
      'chassisNumber',
      'engineNumber',
      'registrationDate',
      'registrationAuthority',
      'fuelType',
      'emissionNorm',
      'vehicleAge',
      'vehicleStatus',
      'insuranceValidUpto',
      'fitnessValidUpto',
      'PUCC',
      'ownershipCount',
      'make',
      'model',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const {required = true} = fieldValidationRules[key] || {};

      if (!required) {
        errors[key] = '';
        return;
      }

      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  getPayload = () => {
    const state = this.state;
    const {selectedCustomerId} = this.props;
    let payload = {
      registerNumber: state.registerNumber,
      ownerName: state.ownerName,
      manufactureYear: Number(state.manufactureYear),
      chassisNumber: state.chassisNumber,
      engineNumber: state.engineNumber,
      registrationDate: state.registrationDate,
      registrationAuthority: state.registrationAuthority,
      emissionNorm: state.emissionNorm,
      vehicleAge: state.vehicleAge,
      vehicleStatus: 'inventory', // Pending
      insuranceValidUpto: state.insuranceValidUpto,
      fitnessValidUpto: state.fitnessValidUpto,
      PUCC: state.PUCC,
      ownershipCount: state.ownershipCount,
      make: state.make, // Brand
      model: state.model,
      fuelType: state.fuelType,
    };

    return payload;
  };

  render() {
    const {selectedVehicle} = this.props;
    const {fuelType, errors, isEdit, registerNumber, vehicleAge} = this.state;

    return (
      <Edit_Vehicle_Detail_Component
        headerProp={{
          title: `${isEdit ? 'Edit' : 'Add'} Vehicle Detail`,
          showRightContent: true,
          rightLabel: formatVehicleNumber(registerNumber),
          rightLabelColor: '#F8A902',
          onBackPress: () => goBack(),
        }}
        selectedFuelType={getLabelFromEnum(fuelTypeValue, fuelType)}
        setSelectedFuelType={this.setSelectedFuelType}
        onNextPress={this.onNextPress}
        state={this.state}
        onSelectedPuc={this.onSelectedPuc}
        handleDateSelection={this.handleDateSelection}
        isEdit={isEdit}
        onOwnerNameChange={value => this.onChangeField('ownerName', value)}
        onMakeChange={value => this.onChangeField('make', value)}
        onManufactureYearChange={value => {
          this.onChangeField('manufactureYear', value);

          this.setState({isManYearEdited: true});
        }}
        onModelChange={value => this.onChangeField('model', value)}
        onRegistrationAuthorityChange={value =>
          this.onChangeField('registrationAuthority', value)
        }
        onChassisNumberChange={value =>
          this.onChangeField('chassisNumber', value)
        }
        onEngineNumberChange={value =>
          this.onChangeField('engineNumber', value)
        }
        onEmissionNormChange={value =>
          this.onChangeField('emissionNorm', value)
        }
        onOwnershipCountChange={value =>
          this.onChangeField('ownershipCount', value)
        }
        restInputProps={{
          ownerName: {
            isError: errors?.ownerName,
            statusMsg: errors?.ownerName,
            autoCapitalize: 'words',
            // isDisabled: isEdit,
          },
          make: {
            isError: errors?.make,
            statusMsg: errors?.make,
            // isDisabled: isEdit,
          },
          chassisNumber: {
            isError: errors?.chassisNumber,
            statusMsg: errors?.chassisNumber,
            autoCapitalize: 'characters',
            isDisabled: isEdit,
          },
          engineNumber: {
            isError: errors?.engineNumber,
            statusMsg: errors?.engineNumber,
            autoCapitalize: 'characters',
            isDisabled: isEdit,
          },
          emissionNorm: {
            isError: errors?.emissionNorm,
            statusMsg: errors?.emissionNorm,
            autoCapitalize: 'characters',
          },
          registrationAuthority: {
            isError: errors?.registrationAuthority,
            statusMsg: errors?.registrationAuthority,
            autoCapitalize: 'characters',
            isDisabled: isEdit,
          },
          model: {
            isError: errors?.model,
            statusMsg: errors?.model,
            autoCapitalize: 'characters',
            isDisabled: isEdit,
          },
          fuelType: {
            isError: errors?.fuelType,
            statusMsg: errors?.fuelType,
            isDisabled: isEdit,
          },
          manufactureYear: {
            isError: errors?.manufactureYear,
            statusMsg: errors?.manufactureYear,
            // isDisabled: isEdit,
          },
          ownershipCount: {
            isError: errors?.ownershipCount,
            statusMsg: errors?.ownershipCount,
            // isDisabled: isEdit,
          },
          vehicleAge: {
            isError: errors?.vehicleAge,
            statusMsg: errors?.vehicleAge,
            value:
              vehicleAge && !this.state.isManYearEdited
                ? vehicleAge
                : calculateVehicleAge(this.state.manufactureYear),
            isDisabled: true,
          },
          registrationDate: {
            isError: errors?.registrationDate,
            statusMsg: errors?.registrationDate,
          },
          fitnessValidUpto: {
            isError: errors?.fitnessValidUpto,
            statusMsg: errors?.fitnessValidUpto,
          },
          insuranceValidUpto: {
            isError: errors?.insuranceValidUpto,
            statusMsg: errors?.insuranceValidUpto,
          },
        }}
      />
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = ({vehicleData, loanData}) => {
  return {
    selectedVehicle: vehicleData?.selectedVehicle,
    loading: vehicleData?.loading,
    isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
    selectedLoanType: loanData.selectedLoanType,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditVehicleDetailScreen);
