import {images, Pressable, SafeAreaWrapper, theme} from '@caryaar/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const Image_Preview_Component = ({onCancel, uri, isVisible, imageList}) => {
  return (
    <SafeAreaWrapper statusBarColor={'black'} background={'black'} hideBottom>
      <View style={styles.backButtonContainer}>
        <Pressable onPress={onCancel}>
          <Image
            source={images.arrow_left}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <ImageViewer
        imageUrls={imageList ? imageList : [{url: uri}]}
        enableSwipeDown
        onSwipeDown={onCancel}
        saveToLocalByLongPress={false}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    height: theme.sizes.icons.md,
    width: theme.sizes.icons.md,
    tintColor: 'white',
  },
});

export default Image_Preview_Component;
