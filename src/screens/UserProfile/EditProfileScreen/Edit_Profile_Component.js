import {
  Button,
  Card,
  Header,
  Input,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  images,
  theme,
  FilePickerModal,
  Loader,
} from '@caryaar/components';
import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {goBack} from '../../../navigation/NavigationUtils';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Edit_Profile_Component = ({
  state,
  handleSavePress,
  onFullNameChange,
  onEmailChange,
  onEditProfilePicPress,
  onDeleteProfileImage,
  viewProfileImage,
  profileImage,
  fileModalProps,
  restInputProps = {},
  loading,
}) => {
  const refs = {
    fullName: useRef(null),
    email: useRef(null),
    mobileNumber: useRef(null),
    salesExecutivePosition: useRef(null),
  };

  const focusNext = key => {
    refs[key]?.current?.focus();
  };
  const profileCard = () => {
    return (
      <View style={styles.profileCard}>
        <Pressable onPress={onEditProfilePicPress}>
          <Image source={images.edit_profile} style={styles.iconImage} />
        </Pressable>
        <Pressable onPress={viewProfileImage}>
          <Image
            source={
              profileImage ? {uri: profileImage} : images.placeholder_image
            }
            style={styles.profilePic}
          />
        </Pressable>
        <Pressable onPress={onDeleteProfileImage}>
          <Image source={images.ic_delete} style={styles.iconImage} />
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaWrapper>
      <Header title={'Edit Profile'} onBackPress={() => goBack()} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.wrapper}>
        <View style={styles.profileWrapper}>{profileCard()}</View>
        <View style={{padding: theme.sizes.padding}}>
          <Text>Personal Details</Text>
          <Spacing size="smd" />
          <Card>
            <Input
              ref={refs.fullName}
              label="Full Name"
              leftIconName={images.user}
              isLeftIconVisible
              value={state.fullName}
              onChangeText={onFullNameChange}
              returnKeyType="next"
              onSubmitEditing={() => focusNext('email')}
              {...(restInputProps.fullName || {})}
            />
            <Spacing size="smd" />
            <Input
              ref={refs.email}
              label="Email Address"
              leftIconName={images.email}
              isLeftIconVisible
              value={state.email}
              onChangeText={onEmailChange}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => focusNext('mobileNumber')}
              {...(restInputProps.email || {})}
            />
            <Spacing size="smd" />
            <Input
              isDisabled
              ref={refs.mobileNumber}
              label="Mobile Number"
              leftIconName={images.callOutline}
              isLeftIconVisible
              value={state.mobileNumber}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={() => focusNext('salesExecutivePosition')}
              {...(restInputProps.mobileNumber || {})}
            />
            {/* <Spacing size="smd" />
            <Input
              label="CarYaar Designation"
              leftIconName={images.businessSuitcase}
              isLeftIconVisible
              isAsDropdown
              isRightIconVisible
              value="Name"
            /> */}
            <Spacing size="smd" />
            <Input
              label="Dealer Type"
              leftIconName={images.user}
              isLeftIconVisible
              isDisabled
              value={state.salesExecutivePosition}
            />
          </Card>
          <Spacing size="xl" />
          <Button label={'Save'} onPress={handleSavePress} />
        </View>
      </KeyboardAwareScrollView>

      <FilePickerModal
        {...fileModalProps}
        autoCloseOnSelect={false}
        options={[
          {label: 'Camera', value: 'camera', icon: images.file_camera},
          {label: 'Photo Gallery', value: 'gallery', icon: images.file_gallery},
        ]}
      />

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
    justifyContent: 'center',
    gap: theme.sizes.spacing.lg,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: theme.sizes.borderRadius.md,
  },
  iconImage: {
    height: theme.sizes.icons.lg,
    width: theme.sizes.icons.lg,
  },
});

export default Edit_Profile_Component;
