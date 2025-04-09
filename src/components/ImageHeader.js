/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import theme from '../theme';
import {Text, Pressable, Input, Spacing} from './';
import images from '../assets/images';
import {navigate} from '../navigation/NavigationUtils';
import ScreenNames from '../constants/ScreenNames';

const ImageHeader = ({
  leftIconName,
  rightIconName,
  onRightIconPress,
  onLeftIconPress,
  subTittle,
  searchPlaceHolder,
  hideSubHeader = false,
}) => {
  return (
    <>
      <View style={styles.header}>
        {/* Profile Row */}
        <View style={styles.profileRow}>
          <Pressable onPress={() => navigate(ScreenNames.UserProfile)}>
            <Image
              source={{uri: 'https://i.pravatar.cc/150?img=3'}}
              style={styles.avatar}
            />
          </Pressable>
          <Text
            hankenGroteskExtraBold={true}
            size={28}
            lineHeight={'h2'}
            color={theme.colors.primary}>
            CarYaar
          </Text>
          <Pressable
            style={styles.bell}
            onPress={() => navigate(ScreenNames.Notification)}>
            <Image
              source={images.notificationOutline}
              style={{height: 24, width: 24}}
            />
          </Pressable>
        </View>
      </View>
      {!hideSubHeader ? (
        <View
          style={{
            backgroundColor: theme.colors.primaryBlack,
            paddingHorizontal: theme.sizes.padding,
            paddingBottom: theme.sizes.padding,
            paddingTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text hankenGroteskExtraBold={true} color={'white'} size={'h2'}>
              {subTittle}
            </Text>
            <Pressable>
              <Image
                resizeMode={'contain'}
                source={images.filter}
                style={{height: 24, width: 24}}
              />
            </Pressable>
          </View>
          <Spacing size="md" />
          <Input
            leftIconName={images.icSearch}
            isLeftIconVisible
            inputContainerBackgroundColor={'#222222'}
            inputContainerBackgroundColorFocused={'#222222'}
            themeColor={theme.colors.textSecondary}
            placeholder={searchPlaceHolder}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.spacing.smd,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    borderRadius: theme.sizes.borderRadius.jumbo,
  },
  bell: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    backgroundColor: theme.colors.gray900,
    borderRadius: theme.sizes.borderRadius.jumbo,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ImageHeader;
