import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewLoanCustomerOtp_Component from './NewLoanCustomerOtp_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

class NewLoanCustomerOtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSendOTPPress = this.handleSendOTPPress.bind(this);
  }

  componentDidMount() {}

  handleSendOTPPress = () => {
    navigate(ScreenNames.SelectVehicle);
  };

  render() {
    return (
      <>
        <NewLoanCustomerOtp_Component
          handleSendOTPPress={this.handleSendOTPPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(NewLoanCustomerOtpScreen);
