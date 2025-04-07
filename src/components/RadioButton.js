import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import images from '../assets/images';
import Text from './Text';
import theme from '../theme';

const RadioButton = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={selected ? images.radio_selected : images.radio_unselected}
        style={styles.radioIcon}
      />
      <Text
        hankenGroteskMedium={true}
        size={'small'}
        lineHeight={'small'}
        color={selected ? 'black' : theme.colors.textSecondary}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});
