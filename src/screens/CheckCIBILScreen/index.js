import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckCIBIL_Component from './CheckCIBIL_Component';
import {Alert} from 'react-native';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CheckCIBILScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isOTPSend: false,
    };
    this.handleMobileNumberInput = this.handleMobileNumberInput.bind(this);
    this.onSendOTP = this.onSendOTP.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
  }

  componentDidMount() {}

  handleMobileNumberInput = value => {
    this.setState({mobileNumber: value});
  };

  onSendOTP = () => {
    this.setState({
      isOTPSend: true,
    });
  };

  onConfirmPress = () => {
    navigate(ScreenNames.CustomerEnvelope);
  };

  render() {
    return (
      <>
        <CheckCIBIL_Component
          handleMobileNumberInput={this.handleMobileNumberInput}
          state={this.state}
          onSendOTP={this.onSendOTP}
          isOtpSend={this.state.isOTPSend}
          onConfirmPress={this.onConfirmPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(CheckCIBILScreen);
