/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import theme from '../theme';
import {Text, Pressable, Input, Spacing} from './';
import images from '../assets/images';
import {navigate} from '../navigation/NavigationUtils';
import ScreenNames from '../constants/ScreenNames';

type ImageHeaderProps = {
  leftIconName?: ImageSourcePropType,
  rightIconName?: ImageSourcePropType,
  onLeftIconPress?: () => void,
  onRightIconPress?: () => void,
  onFilterPress?: () => void,
  subTittle?: string,
  searchPlaceHolder?: string,
  hideSubHeader?: boolean,
  showSearch?: boolean,
  profileImage?: string,
  titleText?: string,
};

const ImageHeader = ({
  leftIconName,
  rightIconName,
  onLeftIconPress,
  onRightIconPress,
  onFilterPress = () => {},
  subTittle = '',
  searchPlaceHolder = 'Search',
  hideSubHeader = false,
  showSearch = true,
  profileImage = 'https://i.pravatar.cc/150?img=3',
  titleText = 'CarYaar',
}: ImageHeaderProps) => {
  return (
    <>
      <View style={styles.header}>
        {/* Profile Row */}
        <View style={styles.profileRow}>
          <Pressable
            onPress={
              onLeftIconPress || (() => navigate(ScreenNames.UserProfile))
            }>
            <Image source={{uri: profileImage}} style={styles.avatar} />
          </Pressable>

          <Text
            hankenGroteskExtraBold
            size={28}
            lineHeight="h2"
            color={theme.colors.primary}>
            {titleText}
          </Text>

          <Pressable
            style={styles.bell}
            onPress={
              onRightIconPress || (() => navigate(ScreenNames.Notification))
            }>
            <Image
              source={rightIconName || images.notificationOutline}
              style={{height: 24, width: 24}}
            />
          </Pressable>
        </View>
      </View>

      {!hideSubHeader && (
        <View style={styles.subHeader}>
          <View style={styles.subHeaderTopRow}>
            <Text hankenGroteskExtraBold color="white" size="h2">
              {subTittle}
            </Text>
            <Pressable onPress={onFilterPress}>
              <Image
                resizeMode="contain"
                source={images.filter}
                style={{height: 24, width: 24}}
              />
            </Pressable>
          </View>
          {showSearch && (
            <>
              <Spacing size="md" />
              <Input
                leftIconName={images.icSearch}
                isLeftIconVisible
                inputContainerBackgroundColor="#222222"
                inputContainerBackgroundColorFocused="#222222"
                themeColor={theme.colors.textSecondary}
                placeholder={searchPlaceHolder}
              />
            </>
          )}
        </View>
      )}
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
  subHeader: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingBottom: theme.sizes.padding,
    paddingTop: 12,
  },
  subHeaderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default React.memo(ImageHeader);
