import {Pressable, Text} from '@caryaar/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import images from '../assets/images';

const StatusChip = ({label, onRemove, style = {}, textStyle = {}}) => {
  return (
    <View style={[styles.chip, style]}>
      <Text hankenGroteskBold size={'small'} style={[textStyle]}>
        {label}
      </Text>
      <Pressable onPress={onRemove}>
        <Image source={images.icFilterClose} style={styles.closeIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    gap: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 14,
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
});

export default StatusChip;
