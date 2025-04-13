import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {validateMobileNumber} from '../../utils/validation';
import Login_Component from './Login_Component';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isError: false,
    };
    this.setMobileNumber = this.setMobileNumber.bind(this);
    this.generateOTP = this.generateOTP.bind(this);
  }

  setMobileNumber = value => {
    this.setState({
      mobileNumber: value,
      isError: false,
    });
  };

  generateOTP = () => {
    const {mobileNumber} = this.state;

    if (!validateMobileNumber(mobileNumber)) {
      this.setState({isError: true});
      return;
    }
    navigate(ScreenNames.OTP, {mobileNumber});
  };

  render() {
    const {mobileNumber} = this.state;
    return (
      <>
        <Login_Component
          mobileNumber={mobileNumber}
          setMobileNumber={this.setMobileNumber}
          generateOTP={this.generateOTP}
          isError={this.state.isError}
        />
      </>
    );
  }
}

export default Login;
