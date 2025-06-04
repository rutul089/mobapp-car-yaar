import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  customerIndividualTypeValue,
  customerCategory as eCustomerCategory,
  getLabelFromEnum,
  loanType,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {
  createCustomerBasicDetailThunk,
  verifyCustomerOtpThunk,
} from '../../redux/actions';
import {getErrorMessage, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Customer_Detail_Component from './Customer_Detail_Component';

class CustomerDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCategory: eCustomerCategory.INDIVIDUAL,
      mobileNumber: '',
      showVerifyOTP: false,
      customerType: '',
      errors: {
        customerType: '',
        mobileNumber: '',
      },
      isFormValid: false,
      isOnboard: getScreenParam(props.route, 'params')?.isOnboard || false,
      registrationNumber: 'GJ01RM5023',
      loading: false,
      otp: '',
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onSelectedOption = this.onSelectedOption.bind(this);
    this.onChangeUserTypeOption = this.onChangeUserTypeOption.bind(this);
    this.onSendOTPPress = this.onSendOTPPress.bind(this);
    this.onCloseVerifyOTP = this.onCloseVerifyOTP.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
    this.onProceedPress = this.onProceedPress.bind(this);
    // applicationId: getScreenParam(props.route, 'params')?.id || '',
  }

  componentDidMount() {
    const {isOnboard} = this.state;
    console.log({isOnboard});
  }

  onBackPress = () => {
    goBack();
  };

  onSelectedOption = value => {
    this.setState({
      customerCategory: value,
    });
  };

  onChangeMobileNumber = value => {
    this.setState({
      mobileNumber: value,
    });
  };

  onChangeUserTypeOption = (item, index) => {
    this.setState(
      {
        customerType: item?.value,
      },
      () => {
        this.onChangeField('customerType', this.state.customerType);
      },
    );
  };

  onSendOTPPress = () => {
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    this.addCustomerBasicDetail();
  };

  onCloseVerifyOTP = () => {
    this.setState({
      showVerifyOTP: false,
    });
  };

  onPressPrimaryButton = () => {
    const {otp} = this.state;
    if (otp.length !== 4) {
      this.setState({
        isError: true,
        errorMessage: 'Enter all 4 digits of the OTP to continue.',
      });
      return;
    }

    this.verifyCustomerOtp();
  };

  onProceedPress = () => {
    const isFormValid = this.validateAllFields(loanType.loan);

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }
    navigate(ScreenNames.CustomerPersonalDetails);
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  validateAllFields = _loanType => {
    const {selectedLoanType} = this.props;
    const fieldValidationRules = {
      customerType: {required: true},
      mobileNumber: {required: selectedLoanType !== loanType.loan},
    };

    const fieldsToValidate = ['customerType', 'mobileNumber'];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const {required} = fieldValidationRules[key] || {};

      // Skip validation if field is optional and empty
      if (
        !required &&
        (value === undefined || value === null || value === '')
      ) {
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

  addCustomerBasicDetail = () => {
    const {customerCategory, customerType, mobileNumber} = this.state;
    this.setState({loading: true});
    let payload = {
      customerCategory,
      customerType,
      mobileNumber,
    };
    this.props
      .createCustomerBasicDetailThunk(
        payload,
        response => {
          if (response?.success) {
            this.showOTPAfterDelay();
          }
        },
        error => {},
      )
      .finally(() => {
        this.setState({loading: false});
      });
  };

  showOTPAfterDelay = () => {
    this.setState({loading: false, showVerifyOTP: true});
  };

  onOtpComplete = value => {
    this.setState({otp: value, isError: false}, () => {
      if (value.length === 4) {
        this.onPressPrimaryButton();
      }
    });
  };

  verifyCustomerOtp = () => {
    const {route} = this.props;
    const {otp, mobileNumber} = this.state;
    let params = route.params;

    let payload = {
      code: otp,
      mobileNumber: mobileNumber,
    };
    this.props.verifyCustomerOtpThunk(
      payload,
      response => {
        if (response?.success) {
          this.onCloseVerifyOTP();
          navigate(ScreenNames.CustomerPersonalDetails, params);
        }
      },
      error => {
        this.setState({
          isError: true,
          errorMessage: getErrorMessage(error),
        });
      },
    );
  };

  render() {
    const {
      mobileNumber,
      customerType,
      customerCategory,
      errors,
      isOnboard,
      registrationNumber,
      loading,
      showVerifyOTP,
      errorMessage,
      isError,
    } = this.state;
    const {selectedLoanType} = this.props;
    return (
      <Customer_Detail_Component
        headerProp={{
          title: 'Add Customer Details',
          subtitle: isOnboard ? '' : '',
          showRightContent: true,
          rightLabel: isOnboard ? '' : registrationNumber,
          rightLabelColor: '#F8A902',
          onBackPress: this.onBackPress,
        }}
        vehicleNumber={'GJ 01 JR 0945'}
        onBackPress={this.onBackPress}
        onSelectedOption={this.onSelectedOption}
        selectedCustomerCategory={customerCategory}
        mobileNumber={mobileNumber}
        onChangeMobileNumber={value =>
          this.onChangeField('mobileNumber', value)
        }
        onChangeUserTypeOption={this.onChangeUserTypeOption}
        onSendOTPPress={this.onSendOTPPress}
        showVerifyOTP={showVerifyOTP}
        onCloseVerifyOTP={this.onCloseVerifyOTP}
        onPressPrimaryButton={this.onPressPrimaryButton}
        selectedLoanType={selectedLoanType}
        onProceedPress={this.onProceedPress}
        customerType={getLabelFromEnum(
          customerIndividualTypeValue,
          customerType,
        )}
        restInputProps={{
          mobileNumber: {
            isError: errors.mobileNumber,
            statusMsg: errors.mobileNumber,
          },
          customerType: {
            isError: errors.customerType,
            statusMsg: errors.customerType,
          },
        }}
        loading={loading}
        otpModalProp={{
          isVisible: showVerifyOTP,
          onModalHide: this.onCloseVerifyOTP,
          onOtpComplete: this.onOtpComplete,
          onPressPrimaryButton: this.onPressPrimaryButton,
          mobileNumber: mobileNumber,
          isError: isError,
          errorMessage: errorMessage,
        }}
      />
    );
  }
}

const mapActionCreators = {
  createCustomerBasicDetailThunk,
  verifyCustomerOtpThunk,
};
const mapStateToProps = ({loanData, customerData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: customerData.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomerDetailView);
