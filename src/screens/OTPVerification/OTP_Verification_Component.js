/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Card,
  Header,
  OTPVerification,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../locales/strings';
import {styles} from '../../styles/OtpVerification.style';

const OTP_Verification_Component = ({
  params,
  mobileNumber,
  timer,
  validateOTP,
  resendOTP,
  onOtpComplete,
  isResendDisabled,
  onBackPress,
  isError,
  errorMessage,
}) => {
  return (
    <SafeAreaWrapper
      barStyle="dark-content"
      statusBarColor={theme.colors.authGradient[0]}
      backgroundColor={theme.colors.authGradient[1]}>
      <LinearGradient style={styles.wrapper} colors={theme.colors.authGradient}>
        <Header
          backgroundColor="transparent"
          hideBorder
          onBackPress={onBackPress}
        />
        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <Text
              textAlign={'center'}
              hankenGroteskBold={true}
              size={theme.typography.fontSizes.h1}
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
              {isError && (
                <>
                  <Spacing size={'smd'} />
                  <Text
                    textAlign={'center'}
                    type={'status'}
                    color={theme.colors.error}>
                    {errorMessage}
                  </Text>
                </>
              )}
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
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default OTP_Verification_Component;
