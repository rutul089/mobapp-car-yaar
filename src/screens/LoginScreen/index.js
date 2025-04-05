import React, {Component} from 'react';
import Login_Component from './Login_Component';
import {validateMobileNumber} from '../../utils/validation';
import {Alert} from 'react-native';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
    };
    this.setMobileNumber = this.setMobileNumber.bind(this);
    this.generateOTP = this.generateOTP.bind(this);
  }

  setMobileNumber = value => {
    this.setState({
      mobileNumber: value,
    });
  };

  generateOTP = () => {
    const {mobileNumber} = this.state;
    navigate(ScreenNames.HomeTab, {mobileNumber});
    if (validateMobileNumber(mobileNumber)) {
      // navigate(ScreenNames.OTP, {mobileNumber});
      navigate(ScreenNames.HomeTab, {mobileNumber});
    } else {
      Alert.alert(
        '❌ Invalid Number',
        'Please enter a valid 10-digit mobile number.',
      );
    }
  };

  render() {
    const {mobileNumber} = this.state;
    return (
      <>
        <Login_Component
          mobileNumber={mobileNumber}
          setMobileNumber={this.setMobileNumber}
          generateOTP={this.generateOTP}
        />
      </>
    );
  }
}

export default Login;
