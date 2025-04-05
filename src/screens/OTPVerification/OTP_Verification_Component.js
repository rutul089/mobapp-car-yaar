/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import {
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  OTPVerification,
} from '../../components';
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
                hankenGroteskBold={true}
                size={typography.fontSizes.h1}
                color={theme.colors.black}>
                OTP Verification
              </Text>
              <Spacing />
              <Text
                type={'helper-text'}
                textAlign={'center'}
                style={{width: '70%'}}>
                Enter the 4 Digit Code you received in your mobile{' '}
                <Text
                  type={'helper-text'}
                  hankenGroteskBold={true}
                  color={theme.colors.primary}>
                  {mobileNumber}
                </Text>
              </Text>
              <Spacing size="xl" />
              <View style={styles.card}>
                <OTPVerification onOtpComplete={onOtpComplete} />
                <Spacing size={'xl'} />
                <Text type={'helper-text'} textAlign={'center'}>
                  Didn't get the OTP?
                  <Text
                    onPress={resendOTP}
                    type={'helper-text'}
                    hankenGroteskBold={true}
                    color={theme.colors.primary}>
                    {isResendDisabled ? ` Resend in ${timer}s` : ' Resend'}
                  </Text>
                </Text>
                <Spacing size={'xl'} />
                <Pressable style={styles.button} onPress={validateOTP}>
                  <LinearGradient
                    useAngle
                    colors={['#1D95F0', '#3DADFF']}
                    locations={[0, 1]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    angle={109}
                    style={styles.gradient}>
                    <Text
                      hankenGroteskExtraBold={true}
                      color={'white'}
                      lineHeight={theme.typography.lineHeights.button}
                      size={theme.typography.fontSizes.button}>
                      Validate Now!
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default OTP_Verification_Component;
