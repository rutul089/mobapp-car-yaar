import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import theme from '../theme';
import {Text, Pressable} from './';
import images from '../assets/images';

const ImageHeader = ({
  leftIconName,
  rightIconName,
  onRightIconPress,
  onLeftIconPress,
}) => {
  return (
    <View style={styles.header}>
      {/* Profile Row */}
      <View style={styles.profileRow}>
        <Pressable onPress={onLeftIconPress}>
          <Image
            source={{uri: 'https://i.pravatar.cc/150?img=3'}}
            style={styles.avatar}
          />
        </Pressable>
        <Text
          hankenGroteskExtraBold={true}
          size={28}
          lineHeight={'h2'}
          color={theme.colors.primary}>
          CarYaar
        </Text>
        <Pressable style={styles.bell} onPress={onRightIconPress}>
          <Image
            source={images.notificationOutline}
            style={{height: 24, width: 24}}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.spacing.smd,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    borderRadius: theme.sizes.borderRadius.jumbo,
  },
  bell: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    backgroundColor: theme.colors.gray900,
    borderRadius: theme.sizes.borderRadius.jumbo,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ImageHeader;
