import React, {Component} from 'react';
import {connect} from 'react-redux';
import Profile_Component from './Profile_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';
import {Alert} from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPressRightContent = this.onPressRightContent.bind(this);
    this.handleMenuPress = this.handleMenuPress.bind(this);
  }

  componentDidMount() {}

  onPressRightContent = () => {
    navigate(ScreenNames.EditProfile);
  };

  handleMenuPress = (index, item) => {
    if (item.screenName === ScreenNames.Logout) {
      return this.handleLogout();
    }
    navigate(item.screenName);
  };

  handleLogout = () => {
    Alert.alert('Logout');
  };

  render() {
    return (
      <>
        <Profile_Component
          onPressRightContent={this.onPressRightContent}
          handleMenuPress={this.handleMenuPress}
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
export default connect(mapStateToProps, mapActionCreators)(ProfileScreen);
