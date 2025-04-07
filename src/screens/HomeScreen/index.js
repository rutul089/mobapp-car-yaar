import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Home_Component from './Home_Component';
import {connect} from 'react-redux';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarType: '',
    };
    this.onSelectedCarType = this.onSelectedCarType.bind(this);
    this.onPurchasePress = this.onPurchasePress.bind(this);
    this.onRefinancePress = this.onRefinancePress.bind(this);
    this.onTopUpPress = this.onTopUpPress.bind(this);
    this.onInternalBTPress = this.onInternalBTPress.bind(this);
    this.onExternalBTPress = this.onExternalBTPress.bind(this);
    this.onNotificationPress = this.onNotificationPress.bind(this);
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
    navigate(ScreenNames.SearchView);
  };

  onRefinancePress = () => {};

  onTopUpPress = () => {};

  onInternalBTPress = () => {};

  onExternalBTPress = () => {};

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
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(HomeScreen);
