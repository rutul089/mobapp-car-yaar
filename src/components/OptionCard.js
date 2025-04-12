import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import {Pressable, Text} from './';
import images from '../assets/images';
import theme from '../theme';

type OptionCardProps = {
  value: string,
  label: string,
  icon: ImageSourcePropType,
  isSelected?: boolean,
  onSelect?: (value: string) => void,
  backgroundColor?: string,
  selectedBackgroundColor?: string,
  containerStyle?: ViewStyle,
  iconStyle?: ImageStyle,
  labelStyle?: TextStyle,
  showCheckIcon?: boolean,
  textProps?: React.ComponentProps<typeof Text>,
};

const OptionCard = ({
  value,
  label,
  icon,
  isSelected = false,
  onSelect,
  backgroundColor = '#FFF',
  selectedBackgroundColor = '#E0F2FE',
  containerStyle,
  iconStyle,
  labelStyle,
  showCheckIcon = true,
  textProps,
}: OptionCardProps) => {
  const handlePress = () => {
    onSelect?.(value);
  };

  const cardDynamicStyle = {
    backgroundColor: isSelected ? selectedBackgroundColor : backgroundColor,
    borderColor: isSelected ? theme.colors.primary : backgroundColor,
    borderWidth: isSelected ? 2 : 1,
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.card, cardDynamicStyle, containerStyle]}>
      <Image source={icon} style={[styles.icon, iconStyle]} />
      <Text
        hankenGroteskBold={isSelected}
        style={labelStyle}
        color={theme.colors.textPrimary}
        {...textProps}>
        {label}
      </Text>

      {isSelected && showCheckIcon && (
        <View style={styles.checkIcon}>
          <Image
            source={images.checkCircle}
            style={styles.checkImage}
            resizeMode="contain"
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: theme.sizes.spacing.md,
    borderRadius: theme.sizes.borderRadius.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
  },
  icon: {
    width: theme.sizes.icons.lg,
    height: theme.sizes.icons.lg,
    marginBottom: 8,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.colors.primary,
    width: theme.sizes.icons.smd,
    height: theme.sizes.icons.smd,
    borderRadius: theme.sizes.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkImage: {
    width: theme.sizes.icons.md,
    height: theme.sizes.icons.md,
  },
});

export default React.memo(OptionCard);
