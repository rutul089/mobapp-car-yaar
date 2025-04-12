import React from 'react';
import {Image, StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import {Pressable, Text} from '.';
import theme from '../theme';
import images from '../assets/images';

const Header = ({
  title = '',
  subtitle = '',
  rightLabel = '',
  onBackPress = () => {},
  containerStyle = {},
  titleStyle = {},
  subtitleStyle = {},
  rightLabelStyle = {},
  themedColor,
  iconColor,
  rightLabelColor,
  backgroundColor,
  hideBorder = false,
  isRightDisabled = false,
  showRightContent = false,
  onPressRightContent,
  rightIconName,
}: {
  title?: string,
  subtitle?: string,
  rightLabel?: string,
  onBackPress?: () => void,
  containerStyle?: ViewStyle,
  titleStyle?: TextStyle,
  subtitleStyle?: TextStyle,
  rightLabelStyle?: TextStyle,
  themedColor?: string,
  iconColor?: string,
  rightLabelColor?: string,
  backgroundColor?: string,
  hideBorder?: boolean,
  isRightDisabled?: boolean,
  showRightContent?: boolean,
  onPressRightContent?: () => void,
  rightIconName?: any, // You can use ImageSourcePropType if you're strict
}) => {
  const _themedColor = themedColor ?? theme.colors.white;
  const _iconColor = iconColor ?? theme.colors.textLabel;
  const _containerStyle = [
    styles.container,
    containerStyle,
    backgroundColor && {backgroundColor},
    {height: subtitle ? 72 : 64},
    hideBorder && {borderBottomWidth: 0},
  ];

  return (
    <View style={_containerStyle}>
      <View style={styles.leftContainer}>
        <Pressable onPress={onBackPress} style={styles.backIconContainer}>
          <Image
            source={images.arrow_left}
            style={{
              height: theme.sizes.icons.md,
              width: theme.sizes.icons.md,
              tintColor: _iconColor,
            }}
          />
        </Pressable>

        <View style={styles.titleBlock}>
          <Text
            hankenGroteskExtraBold
            color={_themedColor}
            size="h3"
            numberOfLines={1}
            style={titleStyle}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              size="small"
              hankenGroteskSemiBold
              color={theme.colors.textLabel}
              style={subtitleStyle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {showRightContent && (
        <Pressable
          style={styles.rightContainer}
          onPress={onPressRightContent}
          disabled={isRightDisabled}>
          {rightIconName ? (
            <Image
              resizeMode="contain"
              source={rightIconName}
              style={styles.rightIcon}
            />
          ) : (
            <Text
              hankenGroteskMedium
              size="small"
              color={rightLabelColor ?? '#F8A902'}
              style={rightLabelStyle}>
              {rightLabel}
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.spacing.md,
    paddingVertical: theme.sizes.spacing.smd,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  backIconContainer: {
    paddingRight: 12,
    alignSelf: 'center',
  },
  titleBlock: {
    flexShrink: 1,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightIcon: {
    height: theme.sizes.icons.md,
    width: theme.sizes.icons.md,
  },
});

export default Header;
