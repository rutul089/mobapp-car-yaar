import React, {Component} from 'react';
import {customerCategory} from '../../constants/enums';
import {goBack} from '../../navigation/NavigationUtils';
import Customer_Detail_Component from './Customer_Detail_Component';

class CustomerDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: customerCategory.individual,
      mobileNumber: '',
      selectedIndividualType: '',
      showVerifyOTP: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onSelectedOption = this.onSelectedOption.bind(this);
    this.onChangeUserTypeOption = this.onChangeUserTypeOption.bind(this);
    this.onSendOTPPress = this.onSendOTPPress.bind(this);
    this.onCloseVerifyOTP = this.onCloseVerifyOTP.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onSelectedOption = value => {
    this.setState({
      selectedOption: value,
    });
  };

  onChangeMobileNumber = value => {
    this.setState({
      mobileNumber: value,
    });
  };

  onChangeUserTypeOption = (value, index) => {
    this.setState({
      selectedIndividualType: value?.label,
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

  render() {
    const {mobileNumber, selectedIndividualType} = this.state;
    return (
      <>
        <Customer_Detail_Component
          vehicleNumber={'GJ 01 JR 0945'}
          onBackPress={this.onBackPress}
          onSelectedOption={this.onSelectedOption}
          selectedOption={this.state.selectedOption}
          mobileNumber={mobileNumber}
          onChangeMobileNumber={this.onChangeMobileNumber}
          individualType={selectedIndividualType}
          onChangeUserTypeOption={this.onChangeUserTypeOption}
          onSendOTPPress={this.onSendOTPPress}
          showVerifyOTP={this.state.showVerifyOTP}
          onCloseVerifyOTP={this.onCloseVerifyOTP}
        />
      </>
    );
  }
}

export default CustomerDetailView;
