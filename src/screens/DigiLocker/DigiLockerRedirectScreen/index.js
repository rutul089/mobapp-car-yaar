import React, {Component} from 'react';
import {connect} from 'react-redux';
import DigiLocker_Redirect_Component from './DigiLocker_Redirect_Component';
import {getScreenParam, navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

class DigiLockerRedirectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const response = getScreenParam(this.props.route, 'params');
    const {route} = this.props;
    const {params, onGoBack} = route.params || {};

    setTimeout(() => {
      navigate(ScreenNames.DigiLockerAadhaarScreen, {
        params: response,
        onGoBack,
      });
    }, 2000);
  }

  render() {
    return (
      <>
        <DigiLocker_Redirect_Component />
      </>
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DigiLockerRedirectScreen);
