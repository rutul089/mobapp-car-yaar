import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  customerIndividualTypeValue,
  customerCategory as eCustomerCategory,
  getLabelFromEnum,
  loanType,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import Customer_Detail_Component from './Customer_Detail_Component';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {showToast} from '../../utils/helper';
import {createCustomerBasicDetailThunk} from '../../redux/actions';

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
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onSelectedOption = this.onSelectedOption.bind(this);
    this.onChangeUserTypeOption = this.onChangeUserTypeOption.bind(this);
    this.onSendOTPPress = this.onSendOTPPress.bind(this);
    this.onCloseVerifyOTP = this.onCloseVerifyOTP.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
    this.onProceedPress = this.onProceedPress.bind(this);
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

    // this.addCustomerBasicDetail();
    this.setState({
      showVerifyOTP: true,
    });
  };

  onCloseVerifyOTP = () => {
    this.setState({
      showVerifyOTP: false,
    });
  };

  onPressPrimaryButton = () => {
    this.onCloseVerifyOTP();
    navigate(ScreenNames.CustomerPersonalDetails);
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
    let payload = {
      customerCategory,
      customerType,
      mobileNumber,
    };
    this.props.createCustomerBasicDetailThunk(
      payload,
      response => {
        console.log('response', response);
      },
      error => {
        console.log('error', error);
      },
    );
  };

  render() {
    const {mobileNumber, customerType, customerCategory, errors} = this.state;
    const {selectedLoanType, loading} = this.props;
    return (
      <>
        <Customer_Detail_Component
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
          showVerifyOTP={this.state.showVerifyOTP}
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
        />
      </>
    );
  }
}

const mapActionCreators = {createCustomerBasicDetailThunk};
const mapStateToProps = ({loanData, customerData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: customerData.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomerDetailView);
