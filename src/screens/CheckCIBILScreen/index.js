import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import CheckCIBIL_Component from './CheckCIBIL_Component';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {
  fetchLoanApplicationFromIdThunk,
  sendOtpForCibilThunk,
  verifyOtpForCibilThunk,
} from '../../redux/actions';
import strings from '../../locales/strings';

class CheckCIBILScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isOTPSend: false,
      errors: {
        mobileNumber: '',
      },
      otp: '',
      isFormValid: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };

    this.onSendOTP = this.onSendOTP.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
  }

  componentDidMount() {
    const {selectedApplicationId} = this.props;
    this.props.fetchLoanApplicationFromIdThunk(
      selectedApplicationId,
      {},
      response => {
        this.setState({
          mobileNumber: response?.customer?.mobileNumber,
        });
      },
    );
  }

  onSendOTP = () => {
    this.sendOtpForCibil();
  };

  onConfirmPress = () => {
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    this.checkOtpForCibil();
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

  sendOtpForCibil = () => {
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    const {selectedCustomerId} = this.props;
    const {mobileNumber} = this.state;
    let payload = {
      customerId: selectedCustomerId,
      mobileNumber: mobileNumber,
    };

    this.props
      .sendOtpForCibilThunk(
        payload,
        success => {},
        error => {},
      )
      .finally(() => {
        this.setState({
          isOTPSend: true,
        });
      });
  };

  checkOtpForCibil = () => {
    const {selectedCustomerId} = this.props;
    const {mobileNumber, otp} = this.state;

    let params = getScreenParam(this.props.route, 'params');

    if (otp.length !== 4) {
      return showToast('error', 'Please enter 4 digit OTP.');
    }
    let payload = {
      customerId: selectedCustomerId,
      mobileNumber: mobileNumber,
      code: otp,
    };

    this.props
      .verifyOtpForCibilThunk(
        payload,
        success => {
          navigate(ScreenNames.CustomerEnvelope, {params});
        },
        error => {},
      )
      .finally(() => {
        this.setState({
          isOTPSend: true,
        });
      });
  };

  onOtpComplete = value => {
    this.setState({otp: value, isError: false}, () => {
      if (value.length === 4) {
        this.checkOtpForCibil();
      }
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
    const {errors, mobileNumber, isEdit} = this.state;

    return (
      <CheckCIBIL_Component
        headerProp={{
          title: 'Check CIBIL Score',
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
        loading={loading}
        onOtpComplete={this.onOtpComplete}
      />
    );
  }
}

const mapActionCreators = {
  fetchLoanApplicationFromIdThunk,
  sendOtpForCibilThunk,
  verifyOtpForCibilThunk,
};
const mapStateToProps = ({
  loanData,
  customerData,
  vehicleData,
  cibilReducer,
}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading || cibilReducer?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: customerData?.selectedCustomer,
});
export default connect(mapStateToProps, mapActionCreators)(CheckCIBILScreen);
