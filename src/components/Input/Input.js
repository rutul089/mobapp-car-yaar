import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {Text} from '..';
import theme from '../../theme';
import {styles} from '../../styles/Input.style';
import images from '../../assets/images';

/** @typedef {import('./Input.types').InputProps} InputProps */

const LeftIcon = ({leftIcon, leftIconStyle, leftIconName, leftIconColor}) => {
  return (
    <View style={[styles.leftIcnStyle, leftIconStyle]}>
      {leftIcon ? (
        leftIcon
      ) : (
        <Image
          source={leftIconName}
          resizeMode="contain"
          style={[styles.iconStyle, {tintColor: leftIconColor}]}
        />
      )}
      <View style={styles.divider} />
    </View>
  );
};

const RightIcon = ({
  onRightIconPress = () => {},
  rightIcon,
  isDisabled,
  rightIconStyle,
  rightIconName,
  rightIconColor,
  setSecureTextInput,
  secureTextEntry,
  isPasswordInput,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        isPasswordInput
          ? setSecureTextInput(!secureTextEntry)
          : onRightIconPress
      }
      disabled={isDisabled}
      style={[styles.searchIconStyle, rightIconStyle]}>
      {rightIcon ? (
        rightIcon
      ) : isPasswordInput ? (
        <Image
          source={secureTextEntry ? images.eye_open : images.eye_close}
          resizeMode="contain"
          style={[styles.iconStyle, {tintColor: rightIconColor}]}
        />
      ) : (
        <Image
          source={rightIconName}
          resizeMode="contain"
          style={[styles.iconStyle, {tintColor: rightIconColor}]}
        />
      )}
    </TouchableOpacity>
  );
};

/**
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<InputProps> & React.RefAttributes<any>>}
 */

const Input = React.forwardRef((props, ref) => {
  const {
    label,
    labelStyles,
    optionalLabel,
    labelTextColor,
    optionalLabelStyle,
    isDisabled = false,
    isAsDropdown = false,
    inputContainerWidth,
    inputContainerBorder,
    inputContainerBackgroundColor,
    inputContainerBackgroundColorFocused,
    inputContainerStyles,
    onPress,
    inputStyles,
    value,
    dropdownItemStyle,
    keyboardType = 'default',
    placeholder,
    onChangeText,
    restProps,
    onFocus,
    onBlur,
    disableFocusHandling = false,
    isRightIconVisible = false,
    rightIcon,
    rightIconName,
    rightIconColor,
    rightIconStyle,
    onRightIconPress,
    isLeftIconVisible = false,
    leftIcon,
    leftIconName,
    leftIconColor,
    leftIconStyle,
    isError,
    statusMsgStyle,
    rightIcnDisable,
    onSubmitEditing,
    returnKeyType,
    autoFocus = false,
    optionalLabelContainerStyles,
    statusMsg,
    statusTextColor,
    statusIcon,
    rightLabel,
    rightLabelColor,
    rightLabelPress,
    showStatus,
    showStatusIcon,
    maxLength,
    placeholderTextColor,
    isAsButton = false,
    themeColor,
    isPasswordInput,
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const [secureTextEntry, setSecureTextInput] = React.useState(isPasswordInput);

  const iInputStyle = StyleSheet.flatten([
    styles.input,
    {
      color: themeColor ?? theme.colors.textPrimary,
    },
    inputStyles,
  ]);

  const inputContainer = [
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 45,
      borderRadius: theme.sizes.borderRadius.md,
      borderWidth: 1,
      paddingHorizontal: 15,
    },
    {
      width: inputContainerWidth,
      borderColor: isFocused
        ? theme.colors.inputBorder
        : inputContainerBorder ?? theme.colors.inputBorder,
      backgroundColor: isFocused
        ? inputContainerBackgroundColorFocused ?? theme.colors.lightGray
        : inputContainerBackgroundColor ?? theme.colors.lightGray,
    },
    inputContainerStyles,
  ];

  const handleFocus = (focusState, callback) => {
    !disableFocusHandling && setIsFocused(focusState);
    callback();
  };

  return (
    <View>
      <View
        style={[
          styles.optionalLabelContainerStyles,
          optionalLabelContainerStyles,
        ]}>
        <View>
          {label?.length > 0 && (
            <Text
              type={'label'}
              style={[
                styles.label,
                {color: labelTextColor ?? theme.colors.textSecondary},
                labelStyles,
              ]}>
              {label}
            </Text>
          )}
        </View>
        <View>
          {optionalLabel?.length > 0 && (
            <Text
              type={'label'}
              color={theme.colors.textSecondary}
              style={[styles.optionalLabelStyles, optionalLabelStyle]}>
              {optionalLabel}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        disabled={isDisabled || !isAsDropdown}
        activeOpacity={1}
        style={inputContainer}
        onPress={onPress}>
        {isLeftIconVisible && (
          <LeftIcon
            leftIcon={leftIcon}
            leftIconStyle={leftIconStyle}
            leftIconName={leftIconName}
            leftIconColor={leftIconColor}
          />
        )}
        {isAsDropdown || isAsButton ? (
          <View style={iInputStyle}>
            <Text
              type={'input'}
              style={dropdownItemStyle}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {value ?? placeholder}
            </Text>
          </View>
        ) : (
          <TextInput
            autoFocus={autoFocus}
            ref={ref}
            secureTextEntry={secureTextEntry}
            value={value}
            editable={!isDisabled}
            keyboardType={keyboardType}
            style={iInputStyle}
            placeholder={placeholder}
            placeholderTextColor={
              placeholderTextColor ?? theme.colors.placeHolder
            }
            onChangeText={onChangeText}
            onFocus={e => {
              handleFocus(true, onFocus ? () => onFocus(e) : () => {});
            }}
            onBlur={e => {
              handleFocus(false, onBlur ? () => onBlur(e) : () => {});
            }}
            onSubmitEditing={onSubmitEditing}
            focusable={true}
            returnKeyType={returnKeyType}
            maxLength={maxLength}
            {...restProps}
          />
        )}
        {rightLabel?.length > 0 && (
          <TouchableOpacity
            onPress={rightLabelPress}
            disabled={!rightLabelPress}>
            <Text
              type={'status'}
              hankenGroteskBold={true}
              color={rightLabelColor ?? theme.colors.textSecondary}
              size={theme.typography.fontSizes.small}>
              {rightLabel}
            </Text>
          </TouchableOpacity>
        )}

        {isRightIconVisible && (
          <RightIcon
            onRightIconPress={onRightIconPress}
            rightIcon={rightIcon}
            isDisabled={rightIcnDisable}
            rightIconStyle={rightIconStyle}
            rightIconName={
              isAsDropdown ? rightIconName ?? images.arrow_down : rightIconName
            }
            rightIconColor={rightIconColor}
            setSecureTextInput={setSecureTextInput}
            secureTextEntry={secureTextEntry}
            isPasswordInput={isPasswordInput}
          />
        )}
      </TouchableOpacity>
      {statusMsg?.length > 0 && (showStatus || isError) && (
        <View style={styles.statusContainer}>
          {showStatusIcon ? (
            <Image
              source={statusIcon}
              style={styles.statusIcon}
              resizeMode="contain"
            />
          ) : null}
          <Text
            type={'status'}
            lineHeight={theme.typography.lineHeights.small}
            style={[
              styles.errorMsg,
              {
                color:
                  statusTextColor ?? isError
                    ? theme.colors.error
                    : theme.colors.success,
              },
              statusMsgStyle,
            ]}>
            {statusMsg}
          </Text>
        </View>
      )}
    </View>
  );
});

export default Input;
