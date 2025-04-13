import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import OTP_Verification_Component from './OTP_Verification_Component';
const timerValue = 30;

class OTPVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      timer: timerValue,
      isResendDisabled: true,
      otp: '',
      isError: false,
    };
    this.interval = null;
    this.resendOTP = this.resendOTP.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onOtpComplete = this.onOtpComplete.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    const mobileNumber = getScreenParam(route, 'mobileNumber');
    this.setState(
      {
        mobileNumber,
      },
      () => this.startTimer(),
    );
    console.log({mobileNumber});
  }

  startTimer = () => {
    this.setState({isResendDisabled: true, timer: timerValue});

    this.interval = setInterval(() => {
      this.setState(
        prevState => ({timer: prevState.timer - 1}),
        () => {
          if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({isResendDisabled: false});
          }
        },
      );
    }, 1000);
  };

  resendOTP = () => {
    if (this.state.isResendDisabled) {
      return;
    }
    this.startTimer();
  };

  onBackPress = () => {
    goBack();
  };

  onOtpComplete = value => {
    this.setState(
      {
        otp: value,
      },
      () => {
        this.handleVerify();
      },
    );
  };

  handleVerify = () => {
    const {otp} = this.state;
    console.log('OTP', otp);
    console.log('OTP', otp === 4);

    if (otp.length === 4) {
      return navigateAndSimpleReset(ScreenNames.HomeTab);
    } else {
      this.setState({
        isError: true,
      });
    }
  };

  render() {
    const {mobileNumber, timer, isResendDisabled} = this.state;
    return (
      <>
        <OTP_Verification_Component
          mobileNumber={mobileNumber}
          timer={timer}
          isResendDisabled={isResendDisabled}
          resendOTP={this.resendOTP}
          validateOTP={this.handleVerify}
          onOtpComplete={this.onOtpComplete}
          onBackPress={this.onBackPress}
          isError={this.state.isError}
          errorMessage="Please enter valid OTP"
        />
      </>
    );
  }
}

export default OTPVerification;
