import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {updateUserDetailField} from '../../redux/actions';
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
    this.props.updateUserDetailField('phone', mobileNumber);
    navigate(ScreenNames.OTP, {mobileNumber});
  };

  render() {
    const {mobileNumber} = this.state;
    return (
      <Login_Component
        mobileNumber={mobileNumber}
        setMobileNumber={this.setMobileNumber}
        generateOTP={this.generateOTP}
        isError={this.state.isError}
      />
    );
  }
}

const mapDispatchToProps = {updateUserDetailField};
const mapStateToProps = ({appState}) => {
  return {
    loading: appState.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
