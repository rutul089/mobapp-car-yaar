import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {images, Text} from '@caryaar/components';

const NoDataFound = ({
  imageName = images.noData,
  text = 'No Result Found',
  wrapperStyle,
}) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Image
        source={imageName}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <Text type={'caption'} hankenGroteskMedium size={'h4'}>
        {text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {justifyContent: 'center', alignItems: 'center', flex: 1},
  imageStyle: {height: 100, width: 90, marginBottom: 15},
});

export default NoDataFound;
