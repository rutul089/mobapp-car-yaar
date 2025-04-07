import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Pressable} from '.';
import theme from '../theme';
import images from '../assets/images';

const VehicleImageCard = ({label, image, viewImage, onDeletePress}) => {
  return (
    <View style={styles.card}>
      <Text size={'small'}>{label}</Text>
      <Pressable style={styles.imageContainer} onPress={viewImage}>
        {image ? (
          <>
            <Image
              source={{uri: image}}
              style={styles.image}
              defaultSource={images.placeholder_image}
            />
            <Pressable onPress={onDeletePress} style={styles.deleteIcon}>
              <Image source={images.icDelete} style={styles.deleteIcon} />
            </Pressable>
          </>
        ) : (
          <Image
            source={images.upload_image}
            resizeMode="contain"
            style={styles.uploadImage}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: theme.sizes.borderRadius.card,
    marginTop: 12,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    height: 100,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    padding: 5,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 28,
    width: 28,
  },
  uploadImage: {width: '100%', height: '100%'},
});

export default VehicleImageCard;
