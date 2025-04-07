/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import {Pressable, Spacing, Text} from '..';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  label,
  isLoading,
  onPress,
  style,
  variant = 'solid',
  isDisabled,
  disableColor,
  themedColor,
  buttonLabelStyle,
  disableLabelColor,
  border_Width,
  borderRadius = theme.sizes.borderRadius.md,
  borderColor,
  isCompact,
  textProp,
  iconLeft,
  rightIcon,
  showIconRight,
  rightIconName = 'Arrow_Right',
  showIconLeft,
  leftIcon,
  leftIconName = 'Message-1',
  size = 'large',
  _iconSize,
  removeSpace,
  bgColor,
  gradientColors,
  buttonWrapper,
  ...rest
}) => {
  const getBackgroundColorStyles = () => {
    let backgroundColor =
      variant === 'solid'
        ? themedColor ?? theme.colors.primary
        : bgColor ?? 'transpbarent';
    let borderColor =
      variant === 'link'
        ? theme.colors.primary
        : borderColor ?? theme.colors.primary;

    let borderWidth = variant === 'link' ? border_Width ?? 1 : border_Width;

    if (isDisabled) {
      backgroundColor =
        variant === 'solid'
          ? disableColor ?? theme.colors.secondary
          : 'transparent';
      borderColor =
        variant === 'solid'
          ? disableColor ?? theme.colors.secondaryLight
          : variant === 'link'
          ? theme.colors.secondary
          : disableColor ?? theme.colors.secondary;
    }

    return {
      backgroundColor,
      borderColor,
      borderWidth,
    };
  };

  const containerStyle = [
    {
      borderRadius,
      //   paddingHorizontal: theme.sizes.padding,
      height: size === 'large' ? 48 : 40,
      ...getBackgroundColorStyles(),
    },
    isCompact && {alignSelf: 'center'},
  ];

  const labelStyle = [
    {
      textAlign: 'center',
      color:
        variant === 'solid'
          ? theme.colors.white
          : variant === 'link'
          ? themedColor ?? theme.colors.primary
          : themedColor,
      flex: 1,
    },
    isDisabled && {
      color: disableLabelColor ?? theme.colors.textSecondary,
    },
    isCompact && {
      marginHorizontal: theme.sizes.padding,
      flex: 0,
    },
    buttonLabelStyle,
  ];

  const iconColor = themedColor ?? theme.colors.white;
  const activityIndicatorColor = themedColor ?? theme.colors.white;
  const disableIconColor = disableLabelColor ?? theme.colors.textSecondary;
  const iconSize = _iconSize
    ? _iconSize
    : size === 'large'
    ? theme.sizes.icons.md
    : theme.sizes.icons.sm;

  const _gradientColors = _gradientColors ?? ['#1D95F0', '#3DADFF'];

  const renderContent = () => {
    return isLoading ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          animating={isLoading}
          size={'small'}
          color={isDisabled ? disableIconColor : activityIndicatorColor}
        />
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {showIconLeft ? (
          React.isValidElement(leftIcon) ? (
            leftIcon
          ) : (
            <Image
              source={leftIconName}
              style={{
                height: iconSize,
                width: iconSize,
                tintColor: isDisabled ? disableIconColor : iconColor,
              }}
            />
          )
        ) : showIconRight && !removeSpace ? (
          <Spacing direction={'x'} size={iconSize} />
        ) : null}
        <Text
          type={'button'}
          hankenGroteskBold={true}
          style={labelStyle}
          size={size === 'large' ? 'button' : 'small'}
          {...textProp}>
          {label}
        </Text>
        {showIconRight ? (
          React.isValidElement(rightIcon) ? (
            rightIcon
          ) : (
            <Image
              source={rightIconName}
              style={{
                height: iconSize,
                width: iconSize,
                tintColor: isDisabled ? disableIconColor : iconColor,
              }}
            />
          )
        ) : showIconLeft ? (
          <Spacing direction={'x'} size={iconSize} />
        ) : null}
      </View>
    );
  };
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      {...rest}
      style={buttonWrapper}>
      {variant === 'solid' && !isDisabled ? (
        <LinearGradient
          colors={_gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          locations={[0, 1]}
          useAngle
          angle={109}
          style={[containerStyle, style]}>
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={[containerStyle, style]}>{renderContent()}</View>
      )}
    </Pressable>
  );
};

export default Button;
