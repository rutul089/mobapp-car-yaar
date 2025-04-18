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
} from '@caryaar/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {goBack} from '../../../navigation/NavigationUtils';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Edit_Profile_Component = ({handleSavePress}) => {
  const profileCard = () => {
    return (
      <View style={styles.profileCard}>
        <Pressable>
          <Image source={images.edit_profile} style={styles.iconImage} />
        </Pressable>
        <Image source={images.placeholder_image} style={styles.profilePic} />
        <Pressable>
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
              label="Full Name"
              leftIconName={images.user}
              isLeftIconVisible
            />
            <Spacing size="smd" />
            <Input
              label="Email Address"
              leftIconName={images.email}
              isLeftIconVisible
            />
            <Spacing size="smd" />
            <Input
              label="Mobile Number"
              leftIconName={images.callOutline}
              isLeftIconVisible
            />
            <Spacing size="smd" />
            <Input
              label="CarYaar Designation"
              leftIconName={images.businessSuitcase}
              isLeftIconVisible
              isAsDropdown
              isRightIconVisible
              value="Name"
            />
            <Spacing size="smd" />
            <Input
              label="Dealer Type"
              leftIconName={images.user}
              isLeftIconVisible
              isAsDropdown
              isRightIconVisible
              placeholder="Select"
            />
          </Card>
          <Spacing size="xl" />
          <Button label={'Save'} onPress={handleSavePress} />
        </View>
      </KeyboardAwareScrollView>
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
