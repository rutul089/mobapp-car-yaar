/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Pressable, Text} from '.';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';
import images from '../assets/images';

const CardWrapper = ({
  status,
  applicationNumber,
  showApplicationNumber = true,
  children,
  gradientColors = ['#E8E8E8', '#E8E8E8'],
  locations = [1, 1],
  statusColor = 'rgba(0, 0, 0, 0.36)',
  showRightArrow,
  rightIconName = images.arrow_right,
  onWrapperClick,
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={locations}
      style={{borderRadius: theme.sizes.borderRadius.card}}>
      <Pressable
        style={{padding: 5}}
        activeOpacity={1}
        onPress={onWrapperClick}>
        <View style={styles.headerRow}>
          <Text
            size={'small'}
            hankenGroteskExtraBold={true}
            lineHeight={'body'}
            color={statusColor}>
            {`${applicationNumber}`}
          </Text>
          {showRightArrow ? (
            <Image source={rightIconName} style={styles.iconStyle} />
          ) : (
            <Text hankenGroteskSemiBold={true}>{status}</Text>
          )}
        </View>
        {children}
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: 'center',
  },
  iconStyle: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
});

export default CardWrapper;
