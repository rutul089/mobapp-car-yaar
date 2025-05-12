import React, {Component} from 'react';
import {connect} from 'react-redux';
import Profile_Component from './Profile_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';
import {Alert} from 'react-native';
import {logoutUser} from '../../../redux/actions';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
    };
    this.onPressRightContent = this.onPressRightContent.bind(this);
    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
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
    this.toggleLogoutModal(true);
  };

  toggleLogoutModal = visible => {
    this.setState({showLogoutModal: visible});
  };

  onModalHide = () => {
    this.toggleLogoutModal(false);
  };

  onPressPrimaryButton = async () => {
    this.toggleLogoutModal(false);
    this.props.logoutUser();
    // await clearLoginStatus();
    // this.props.resetAppState();
    // this.props.setLoginStatus(false);
    // navigateAndSimpleReset(ScreenNames.Login);
  };

  render() {
    const {showLogoutModal} = this.state;

    return (
      <>
        <Profile_Component
          onPressRightContent={this.onPressRightContent}
          handleMenuPress={this.handleMenuPress}
          showLogoutModal={showLogoutModal}
          onModalHide={this.onModalHide}
          onPressPrimaryButton={this.onPressPrimaryButton}
        />
      </>
    );
  }
}

const mapActionCreators = {logoutUser};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(ProfileScreen);
