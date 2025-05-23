import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../../constants/ScreenNames';
import {navigate} from '../../../navigation/NavigationUtils';
import {fetchUser, logoutUser} from '../../../redux/actions';
import Profile_Component from './Profile_Component';
import {getLabelFromEnum, userRoleValue} from '../../../constants/enums';
import {removeCountryCode} from '../../../utils/helper';

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

  componentDidMount() {
    this.props.fetchUser();
  }

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
    const {loading, profileDetail} = this.props;
    console.log({profileDetail});

    return (
      <>
        <Profile_Component
          onPressRightContent={this.onPressRightContent}
          handleMenuPress={this.handleMenuPress}
          showLogoutModal={showLogoutModal}
          onModalHide={this.onModalHide}
          onPressPrimaryButton={this.onPressPrimaryButton}
          loading={loading}
          name={profileDetail?.name}
          email={profileDetail?.email}
          phone={removeCountryCode(profileDetail?.mobileNumber)}
          designation={getLabelFromEnum(userRoleValue, profileDetail?.role)}
          avatar={profileDetail?.profileImage}
        />
      </>
    );
  }
}

const mapActionCreators = {logoutUser, fetchUser};
const mapStateToProps = ({user}) => {
  return {
    userDetail: user?.userDetails,
    loading: user.loading,
    profileDetail: user.userProfile,
    error: user.error,
  };
};
export default connect(mapStateToProps, mapActionCreators)(ProfileScreen);
