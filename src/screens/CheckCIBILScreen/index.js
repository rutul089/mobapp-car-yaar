import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import CheckCIBIL_Component from './CheckCIBIL_Component';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';

class CheckCIBILScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isOTPSend: false,
      errors: {
        mobileNumber: '',
      },
      isFormValid: false,
    };

    this.onSendOTP = this.onSendOTP.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
  }

  componentDidMount() {
    const {selectedCustomer} = this.props;
    this.setState({
      mobileNumber: selectedCustomer?.mobileNumber || '',
    });
  }

  onSendOTP = () => {
    this.setState({
      isOTPSend: true,
    });
  };

  onConfirmPress = () => {
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }
    // navigate(ScreenNames.CustomerEnvelope);
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  validateAllFields = _loanType => {
    const fieldsToValidate = ['mobileNumber'];

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
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};
    const {errors, mobileNumber} = this.state;

    return (
      <CheckCIBIL_Component
        headerProp={{
          title: 'Check CIBIL Score',
          subtitle: isCreatingLoanApplication
            ? formatVehicleNumber(UsedVehicle?.registerNumber)
            : '',
          showRightContent: true,
          rightLabel: isCreatingLoanApplication
            ? selectedLoanApplication?.loanApplicationId || ''
            : '',
          rightLabelColor: '#F8A902',
          onBackPress: () => goBack(),
        }}
        onChangeMobileNumber={value =>
          this.onChangeField('mobileNumber', value)
        }
        state={this.state}
        onSendOTP={this.onSendOTP}
        isOtpSend={this.state.isOTPSend}
        onConfirmPress={this.onConfirmPress}
        restInputProps={{
          mobileNumber: {
            isError: errors.mobileNumber,
            statusMsg: errors.mobileNumber,
            value: mobileNumber,
          },
        }}
      />
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: customerData?.selectedCustomer,
});
export default connect(mapStateToProps, mapActionCreators)(CheckCIBILScreen);
