import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {images, Text, Button} from '@caryaar/components';

const NoDataFound = ({
  imageName = images.noData,
  text = 'No Result Found',
  wrapperStyle,
  showButton,
  btnLabel,
  onPress,
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
      {showButton && (
        <View style={{width: '100%', marginTop: 20}}>
          <Button variant="link" label={btnLabel} onPress={onPress} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {justifyContent: 'center', alignItems: 'center', flex: 1},
  imageStyle: {height: 100, width: 90, marginBottom: 15},
});

export default NoDataFound;
