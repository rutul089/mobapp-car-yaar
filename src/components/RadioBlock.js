import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Pressable, Text} from '.';
import images from '../assets/images';
import theme from '../theme';

const RadioBlock = ({label, isSelected, onPress, wrapperStyle}) => {
  return (
    <Pressable
      style={[styles.block, isSelected && styles.blockSelected, wrapperStyle]}
      onPress={onPress}>
      <Image
        source={isSelected ? images.radio_selected : images.radio_unselected}
        style={styles.radioIcon}
      />
      <Text
        size={'small'}
        hankenGroteskMedium={isSelected}
        color={isSelected ? theme.colors.black : theme.colors.textSecondary}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.sizes.borderRadius.md,
    backgroundColor: theme.colors.lightGray,
  },
  blockSelected: {
    borderColor: theme.colors.primary,
    // backgroundColor: '#fff',
  },
  radioIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  label: {
    color: '#777',
    fontSize: 16,
  },
  labelSelected: {
    color: '#000',
    fontWeight: '600',
  },
});

export default RadioBlock;
