import React from 'react';
import {Pressable, Text} from './';
import {Image, View, StyleSheet} from 'react-native';
import images from '../assets/images';
import theme from '../theme';

const OptionCard = ({
  type,
  label,
  icon,
  backgroundColor = '#FFF',
  selectedBackgroundColor = '#E0F2FE',
  onSelectedOption,
  isSelected,
}) => {
  return (
    <Pressable
      onPress={() => {
        onSelectedOption && onSelectedOption(type);
      }}
      style={[
        styles.carTypeBox,
        isSelected && styles.carTypeBoxSelected,
        {
          backgroundColor: isSelected
            ? selectedBackgroundColor
            : backgroundColor,
        },
      ]}>
      <Image source={icon} style={styles.carTypeIcon} />
      <Text hankenGroteskBold={isSelected}>{label}</Text>
      {isSelected && (
        <View style={styles.checkIcon}>
          <Image
            resizeMode="contain"
            source={images.checkCircle}
            style={styles.circleCheck}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  carTypeBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: theme.sizes.spacing.md,
    borderRadius: theme.sizes.borderRadius.xxl,
    marginRight: 8,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
  },
  carTypeBoxSelected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  carTypeIcon: {
    width: theme.sizes.icons.lg,
    height: theme.sizes.icons.lg,
    marginBottom: 8,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#007BFF',
    width: theme.sizes.icons.smd,
    height: theme.sizes.icons.smd,
    borderRadius: theme.sizes.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCheck: {height: theme.sizes.icons.md, width: theme.sizes.icons.md},
});

export default OptionCard;
