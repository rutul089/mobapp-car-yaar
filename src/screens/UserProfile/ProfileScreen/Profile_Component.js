/* eslint-disable react-native/no-inline-styles */
import {
  Card,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  images,
  theme,
  CommonModal,
  Loader,
} from '@caryaar/components';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {goBack} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';
import DeviceInfo from 'react-native-device-info';
import {formatShortId} from '../../../utils/helper';

const Profile_Component = ({
  onPressRightContent,
  onModalHide,
  onPressPrimaryButton,
  showLogoutModal,
  handleMenuPress = () => {},
  loading,
  address,
  name,
  email,
  phone,
  userID,
  avatar,
  designation,
  partnerId,
  dealerType,
}) => {
  const version = DeviceInfo.getVersion();
  const build = DeviceInfo.getBuildNumber();

  const profileCard = () => {
    return (
      <View style={styles.profileCard}>
        <Image
          source={avatar == null ? images.placeholder_image : {uri: avatar}}
          style={styles.profilePic}
        />
        <View style={styles.infoSection}>
          <Text
            size={'small'}
            hankenGroteskSemiBold={true}
            color={theme.colors.primary}>
            {formatShortId(partnerId)}
          </Text>
          <Text hankenGroteskExtraBold={true} color={theme.colors.white}>
            {name}
          </Text>
          {address && (
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Image source={images.locationPin} style={styles.locationStyle} />
              <Text color={theme.colors.textSecondary}>{address}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const detailsCard = () => {
    return (
      <View style={styles.detailsCard}>
        {[
          {
            icon: images.businessSuitcase,
            label: designation,
          },
          {icon: images.user, label: dealerType},
          {icon: images.email, label: email},
          {icon: images.callOutline, label: phone},
        ].map((item, index) => (
          <View key={index} style={styles.detailRow}>
            <Image source={item.icon} style={styles.detailIcon} />
            <Text size={'small'} color={theme.colors.white}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaWrapper>
      <Header
        title={'Profile'}
        showRightContent={true}
        rightIconName={images.edit_user}
        onPressRightContent={onPressRightContent}
        onBackPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.profileWrapper}>
          {/* Profile Card */}
          {profileCard()}
          {/* Details Card */}
          {detailsCard()}
        </View>
        {/* Action Menu */}
        <View style={{padding: theme.sizes.padding}}>
          {[
            {
              label: 'Manage Members',
              icon: images.icon_users,
              screenName: ScreenNames.ManageMember,
            },
            // {
            //   label: 'Change Password',
            //   icon: images.icon_access,
            //   screenName: ScreenNames.ChangePassword,
            // },
            {
              label: 'FAQs',
              icon: images.icon_help,
              screenName: ScreenNames.FAQS,
            },
            {
              label: 'Contact Support',
              icon: images.icon_support,
              screenName: ScreenNames.ContactSupport,
            },
            {
              label: 'Logout',
              icon: images.icon_logout,
              themeColor: theme.colors.error,
              hideRightArrow: true,
              screenName: ScreenNames.Logout,
            },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Card
                onPress={() => handleMenuPress(index, item)}
                padding={15}
                noShadow={true}
                cardContainerStyle={{flexDirection: 'row'}}>
                <Image
                  source={item.icon}
                  style={[styles.menuIcon, {tintColor: item?.themeColor}]}
                />
                <Text style={{flex: 1}} color={item?.themeColor}>
                  {item.label}
                </Text>
                {!item?.hideRightArrow && (
                  <Image source={images.arrow_right} style={styles.menuIcon} />
                )}
              </Card>
              <Spacing size="smd" />
            </React.Fragment>
          ))}
        </View>
        <Text textAlign="center" type="helper-text">
          App Version: {version}.{build}
        </Text>
      </ScrollView>
      <CommonModal
        isVisible={showLogoutModal}
        onModalHide={onModalHide}
        primaryButtonLabel={'Logout'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={onPressPrimaryButton}
        title="Confirm Logout"
        isCancellable={false}>
        <View style={{paddingVertical: 10}}>
          <Text textAlign="center" lineHeight={22}>
            Are you sure you want to log out? You will need to log in again to
            access your account.
          </Text>
        </View>
      </CommonModal>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  profileWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.padding,
    paddingTop: theme.sizes.spacing.md,
  },
  profileCard: {
    backgroundColor: theme.colors.gray900,
    padding: theme.sizes.spacing.smd,
    borderRadius: theme.sizes.borderRadius.card,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: theme.sizes.borderRadius.md,
    marginRight: 5,
  },
  infoSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  locationStyle: {
    height: 20,
    width: 20,
    tintColor: theme.colors.textSecondary,
    marginRight: 3,
  },
  detailsCard: {
    backgroundColor: theme.colors.gray900,
    padding: theme.sizes.spacing.smd,
    borderRadius: theme.sizes.borderRadius.card,
    marginTop: 12,
    paddingBottom: 0,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.spacing.smd,
  },
  detailIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
});

export default Profile_Component;
