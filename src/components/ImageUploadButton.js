import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import images from '../assets/images';
import {Pressable, Text} from './';

const ImageUploadButton = ({
  label,
  btnLabel,
  onPress,
  handleImagePick,
  image,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text type={'helper-text'}>{label}</Text>}

      <Pressable style={styles.uploadBox} onPress={handleImagePick}>
        {image ? (
          <Image source={{uri: image}} style={styles.imagePreview} />
        ) : (
          <View style={styles.dashedWrapper}>
            <Image source={images.icUpload} style={styles.icon} />
            <Text type={'helper-text'} size={'caption'}>
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
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  uploadBox: {
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    padding: 7,
    marginTop: 8,
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 8,
  },

  imagePreview: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  dashedWrapper: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#5DB4F2',
    borderRadius: 12,
    height: 90,
    backgroundColor: '#E9F4FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageUploadButton;
