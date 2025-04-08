import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import {Pressable, Text} from './';

const CustomizeLoanCard = ({description, bannerLabel, onPress}) => {
  return (
    <View style={styles.container}>
      {/* Top Section: Icon + Text */}
      <View style={styles.topRow}>
        <Image source={images.filterFill} style={styles.iconWrapper} />
        <Text size={'small'} style={styles.description}>
          {description}
        </Text>
      </View>

      {/* Bottom Section: Button */}
      <Pressable style={styles.button} onPress={onPress} disabled={!onPress}>
        <Text hankenGroteskExtraBold={true} size={'caption'} color={'white'}>
          {bannerLabel?.toUpperCase()}
        </Text>
        <Image
          source={images.arrow_right}
          style={styles.arrowRight}
          tintColor={'white'}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8eefc',
    borderRadius: theme.sizes.borderRadius.card,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
  },
  description: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1f97f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowRight: {
    height: 20,
    width: 20,
  },
});

export default CustomizeLoanCard;
