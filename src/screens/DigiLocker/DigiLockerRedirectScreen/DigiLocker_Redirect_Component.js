/* eslint-disable react-native/no-inline-styles */
import {SafeAreaWrapper, Text, theme} from '@caryaar/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import images from '../../../assets/images';

const DigiLocker_Redirect_Component = ({params}) => {
  return (
    <SafeAreaWrapper
      statusBarColor={theme.colors.background}
      barStyle={'dark-content'}
      backgroundColor={theme.colors.background}>
      <View style={styles.mainWrapper}>
        <View style={{position: 'absolute', top: 20}}>
          <Text
            hankenGroteskBold
            size={'h2'}
            lineHeights={'h2'}
            textAlign={'center'}
            style={styles.textWrapper}>
            We’re redirecting you to DigiLocker App
          </Text>
        </View>

        <Image
          source={images.icDigiLocker}
          resizeMode="contain"
          style={styles.imageWrapper}
        />
        <View style={{position: 'absolute', bottom: 40}}>
          <Text
            textAlign={'center'}
            style={styles.textWrapper}
            type={'helper-text'}>
            Don’t press back or close the app while we complete the process.
          </Text>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {flex: 1, backgroundColor: theme.colors.background},
  imageWrapper: {height: '100%', width: null},
  textWrapper: {width: '70%', alignSelf: 'center'},
});

export default DigiLocker_Redirect_Component;
