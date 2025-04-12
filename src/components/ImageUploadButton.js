import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import images from '../assets/images';
import {Pressable, Text} from './';
import theme from '../theme';

type ImageUploadButtonProps = {
  label?: string,
  btnLabel: string,
  onPress?: () => void,
  handleImagePick: () => void,
  image?: string,
  wrapperStyle?: ViewStyle,
  uploadBoxStyle?: ViewStyle,
  imageStyle?: ImageStyle,
  previewHeight?: number,
};

const ImageUploadButton = ({
  label,
  btnLabel,
  onPress,
  handleImagePick,
  image,
  wrapperStyle,
  uploadBoxStyle,
  imageStyle,
  previewHeight = 90,
}: ImageUploadButtonProps) => {
  return (
    <View style={[styles.container, wrapperStyle]}>
      {label ? (
        <Text type="helper-text" style={styles.label}>
          {label}
        </Text>
      ) : null}

      <Pressable
        style={[styles.uploadBox, uploadBoxStyle]}
        onPress={handleImagePick}>
        {image ? (
          <Image
            source={{uri: image}}
            style={[styles.imagePreview, {height: previewHeight}, imageStyle]}
          />
        ) : (
          <View style={[styles.dashedWrapper, {height: previewHeight}]}>
            <Image source={images.icUpload} style={styles.icon} />
            <Text type="helper-text" size="caption" textAlign="center">
              {btnLabel}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 8,
    color: theme.colors.textPrimary,
  },
  uploadBox: {
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    padding: 7,
    marginTop: theme.sizes.spacing.sm,
  },
  dashedWrapper: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#5DB4F2',
    borderRadius: 12,
    backgroundColor: '#E9F4FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 8,
  },
});

export default React.memo(ImageUploadButton);
