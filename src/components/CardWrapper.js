import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Pressable, Text} from '.';
import theme from '../theme';
import images from '../assets/images';

const CardWrapper = ({
  leftText,
  showLeftText = true,
  status,
  children,
  gradientColors = ['#E8E8E8', '#E8E8E8'],
  gradientStops = [1, 1],
  statusTextColor = 'rgba(0, 0, 0, 0.36)',
  showTrailingIcon = false,
  trailingIconSource = images.arrow_right,
  onPress,
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={gradientStops}
      style={styles.gradientContainer}>
      <Pressable style={styles.wrapper} activeOpacity={1} onPress={onPress}>
        <View style={styles.headerRow}>
          <View style={styles.flex}>
            {showLeftText && leftText && (
              <Text
                size="small"
                hankenGroteskExtraBold
                lineHeight="body"
                color={statusTextColor}>
                {leftText}
              </Text>
            )}
          </View>
          <View style={[styles.flex, styles.alignEnd]}>
            {showTrailingIcon ? (
              <Image source={trailingIconSource} style={styles.iconStyle} />
            ) : (
              status && (
                <Text hankenGroteskSemiBold size="small">
                  {status}
                </Text>
              )
            )}
          </View>
        </View>
        {children}
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: theme.sizes.borderRadius.card,
  },
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
  flex: {
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
});

export default React.memo(CardWrapper);
