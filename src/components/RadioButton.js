import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import Text from './Text';

type RadioButtonProps = {
  label: string,
  selected?: boolean,
  onPress: () => void,
  containerStyle?: ViewStyle,
  iconStyle?: ImageStyle,
  labelStyle?: TextStyle,
  selectedIcon?: any,
  unselectedIcon?: any,
  marginBottom?: number,
};

const RadioButton = ({
  label,
  selected = false,
  onPress,
  containerStyle,
  iconStyle,
  labelStyle,
  selectedIcon = images.radio_selected,
  unselectedIcon = images.radio_unselected,
  marginBottom,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {marginBottom: marginBottom ?? theme.sizes.spacing.smd},
        containerStyle,
      ]}>
      <Image
        source={selected ? selectedIcon : unselectedIcon}
        style={[styles.radioIcon, iconStyle]}
        resizeMode="contain"
      />
      <Text
        hankenGroteskMedium
        size="small"
        lineHeight="small"
        color={selected ? theme.colors.black : theme.colors.textSecondary}
        style={labelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(RadioButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
