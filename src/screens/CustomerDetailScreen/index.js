import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  customerIndividualTypeValue,
  customerCategory as eCustomerCategory,
  getLabelFromEnum,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import Customer_Detail_Component from './Customer_Detail_Component';

class CustomerDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCategory: eCustomerCategory.INDIVIDUAL,
      mobileNumber: '',
      selectedIndividualType: '',
      showVerifyOTP: false,
      customerType: '',
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
    this.setState({
      customerType: item?.value,
    });
  };

  onSendOTPPress = () => {
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
    navigate(ScreenNames.CustomerPersonalDetails);
  };

  render() {
    const {
      mobileNumber,
      selectedIndividualType,
      customerType,
      customerCategory,
    } = this.state;
    const {selectedLoanType} = this.props;
    return (
      <>
        <Customer_Detail_Component
          vehicleNumber={'GJ 01 JR 0945'}
          onBackPress={this.onBackPress}
          onSelectedOption={this.onSelectedOption}
          selectedCustomerCategory={customerCategory}
          mobileNumber={mobileNumber}
          onChangeMobileNumber={this.onChangeMobileNumber}
          individualType={selectedIndividualType}
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
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = ({loanData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomerDetailView);
