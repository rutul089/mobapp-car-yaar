/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, KeyboardAvoidingView, Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import {
  Button,
  Card,
  OTPVerification,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import strings from '../../locales/strings';
import {styles} from '../../styles/OtpVerification.style';
import theme from '../../theme';
import typography from '../../theme/typography';

const OTP_Verification_Component = ({
  params,
  mobileNumber,
  timer,
  validateOTP,
  resendOTP,
  onOtpComplete,
  isResendDisabled,
  onBackPress,
}) => {
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
          <View style={styles.mainContainer}>
            <Pressable onPress={onBackPress}>
              <Image
                source={images.arrow_left}
                style={{height: 24, width: 24}}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.container}>
              <Spacing size="md" />
              <Text
                textAlign={'center'}
                hankenGroteskBold={true}
                size={typography.fontSizes.h1}
                color={theme.colors.black}>
                {strings.otpVerificationTittle}
              </Text>
              <Spacing />
              <Text
                type={'helper-text'}
                textAlign={'center'}
                style={{width: '70%', alignSelf: 'center'}}>
                {strings.verificationNote}
                <Text
                  type={'helper-text'}
                  hankenGroteskBold={true}
                  color={theme.colors.primary}>
                  {mobileNumber}
                </Text>
              </Text>
              <Spacing size="xl" />
              <Card>
                <OTPVerification onOtpComplete={onOtpComplete} />
                <Spacing size={'xl'} />
                <Text type={'helper-text'} textAlign={'center'}>
                  {strings.didNotGetOTP}
                  <Text
                    onPress={resendOTP}
                    type={'helper-text'}
                    hankenGroteskBold={true}
                    color={theme.colors.primary}>
                    {isResendDisabled ? ` Resend in ${timer}s` : ' Resend'}
                  </Text>
                </Text>
                <Spacing size={'xl'} />
                <Button onPress={validateOTP} label={strings.validateNow} />
              </Card>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default OTP_Verification_Component;
