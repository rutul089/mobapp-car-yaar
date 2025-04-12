/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, KeyboardAvoidingView, Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import {
  Button,
  Card,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import strings from '../../locales/strings';
import {styles} from '../../styles/Login.style';
import theme from '../../theme';
import typography from '../../theme/typography';

const LoginScreen = ({params, mobileNumber, setMobileNumber, generateOTP}) => {
  return (
    <SafeAreaWrapper
      barStyle="dark-content"
      statusBarColor="rgba(29, 149, 240, 0)"
      backgroundColor={'rgba(61, 173, 255, 0.48)'}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LinearGradient
          style={styles.wrapper}
          useAngle
          angle={360}
          colors={['rgba(61, 173, 255, 0.48)', 'rgba(29, 149, 240, 0)']}>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Text
                hankenGroteskExtraBold={true}
                size={28}
                color={theme.colors.primary}>
                CarYaar
              </Text>
              <Spacing size="md" />
              <Text
                hankenGroteskBold={true}
                size={typography.fontSizes.h1}
                color={theme.colors.black}>
                {strings.welcomeBack}
              </Text>
              <Spacing />
              <Text type={'helper-text'}>{strings.welcomeNote}</Text>
            </View>
            <Spacing size="xl" />
            <Card noShadow={true}>
              <View style={styles.label}>
                <Image
                  source={images.callOutline}
                  style={styles.labelIcon}
                  resizeMode="contain"
                />
                <Text
                  type={'helper-text'}
                  color={theme.colors.primary}
                  lineHeight={typography.lineHeights.small}>
                  {strings.enterMobile}
                </Text>
              </View>
              <Input
                placeholder="98744 32092"
                optionalLabelContainerStyles={{alignSelf: 'center'}}
                inputStyles={styles.inputStyle}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                maxLength={10}
                keyboardType="number-pad"
              />
              <Spacing size="xl" />
              <Button label={strings.generateOTP} onPress={generateOTP} />
            </Card>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
