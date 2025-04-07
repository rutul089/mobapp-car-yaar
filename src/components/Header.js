/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
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
  backIcon = '←',
  backIconStyle = {},
  themedColor,
  iconColor,
  backgroundColor,
  hideBorder,
  rightLabelColor,
  isRightDisabled,
  showRightContent,
  onPressRightContent,
  ...rest
}) => {
  let _themedColor = themedColor ?? theme.colors.white;
  const _iconColor = iconColor ?? theme.colors.textLabel;
  return (
    <View
      style={[styles.container, containerStyle, {height: subtitle ? 72 : 64}]}>
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
            hankenGroteskExtraBold={true}
            color={_themedColor}
            size={'h3'}
            numberOfLines={1}
            style={titleStyle}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              size={'small'}
              hankenGroteskSemiBold={true}
              color={theme.colors.textLabel}
              style={subtitleStyle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {showRightContent ? (
        <Pressable style={styles.rightContainer} onPress={onPressRightContent}>
          <Text
            hankenGroteskMedium={true}
            size={'small'}
            color={rightLabelColor ?? '#F8A902'}
            style={rightLabelStyle}>
            {rightLabel}
          </Text>
        </Pressable>
      ) : null}
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
});

export default Header;
