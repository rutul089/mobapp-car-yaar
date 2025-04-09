import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Home_Component from './Home_Component';
import {connect} from 'react-redux';
import {selectedLoanType} from '../../redux/actions';
import {loanType, vehicleType} from '../../constants/enums';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarType: vehicleType.used,
    };
    this.onSelectedCarType = this.onSelectedCarType.bind(this);
    this.onPurchasePress = this.onPurchasePress.bind(this);
    this.onRefinancePress = this.onRefinancePress.bind(this);
    this.onTopUpPress = this.onTopUpPress.bind(this);
    this.onInternalBTPress = this.onInternalBTPress.bind(this);
    this.onExternalBTPress = this.onExternalBTPress.bind(this);
    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.handleLoanOptionPress = this.handleLoanOptionPress.bind(this);
    this.handleLeaseOptionPress = this.handleLeaseOptionPress.bind(this);
    this.handleSubscribeOptionPress =
      this.handleSubscribeOptionPress.bind(this);
  }

  onNotificationPress = () => {
    navigate(ScreenNames.Notification);
  };

  onSelectedCarType = value => {
    this.setState({
      selectedCarType: value,
    });
  };

  onPurchasePress = () => {
    this.props.selectedLoanType(loanType.purchase);
    navigate(ScreenNames.SearchView);
  };

  onRefinancePress = () => {
    this.props.selectedLoanType(loanType.refinance);
    navigate(ScreenNames.SearchView);
    // navigate(ScreenNames.CustomerPersonalDetails);
    // navigate(ScreenNames.CustomerEnvelope);
    //    loanType: state.global.selectedLoanType,
  };

  onTopUpPress = () => {
    this.props.selectedLoanType(loanType.topUp);
    navigate(ScreenNames.SearchView);
  };

  onInternalBTPress = () => {
    this.props.selectedLoanType(loanType.internalBT);
    navigate(ScreenNames.SearchView);
  };

  onExternalBTPress = () => {
    this.props.selectedLoanType(loanType.externalBT);
    navigate(ScreenNames.SearchView);
  };

  handleLoanOptionPress = () => {};

  handleLeaseOptionPress = () => {};

  handleSubscribeOptionPress = () => {};

  render() {
    return (
      <>
        <Home_Component
          onSelectedCarType={this.onSelectedCarType}
          onPurchasePress={this.onPurchasePress}
          onRefinancePress={this.onRefinancePress}
          onTopUpPress={this.onTopUpPress}
          onInternalBTPress={this.onInternalBTPress}
          onExternalBTPress={this.onExternalBTPress}
          onNotificationPress={this.onNotificationPress}
          selectedCarType={this.state.selectedCarType}
          handleLoanOptionPress={this.handleLoanOptionPress}
          handleLeaseOptionPress={this.handleLeaseOptionPress}
          handleSubscribeOptionPress={this.handleSubscribeOptionPress}
        />
      </>
    );
  }
}

const mapActionCreators = {selectedLoanType};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(HomeScreen);
