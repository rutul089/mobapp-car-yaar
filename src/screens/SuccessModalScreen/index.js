import {
  Button,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import images from '../../assets/images';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaWrapper
        barStyle={'dark-content'}
        backgroundColor={theme.colors.background}
        statusBarColor={theme.colors.background}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.sizes.padding,
          }}>
          <Image
            source={images.vehicleSuccess}
            resizeMode="contain"
            style={{height: 112, width: 112}}
          />
          <Spacing />
          <View style={{width: '70%'}}>
            <Text
              textAlign={'center'}
              hankenGroteskBold
              size={'h4'}
              lineHeight={'h4'}>
              Vehicle details have been saved successfully
            </Text>
            <Spacing />
            <Text textAlign={'center'} type={'helper-text'} hankenGroteskMedium>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
          <Spacing size={'xl'} />
          <View style={{width: '100%'}}>
            <Button label="Back to Vehicle Listing" />
          </View>
        </View>
      </SafeAreaWrapper>
    );
  }
}
