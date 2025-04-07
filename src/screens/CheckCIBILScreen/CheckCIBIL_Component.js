/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Header,
  Input,
  OTPVerification,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import theme from '../../theme';
import {goBack} from '../../navigation/NavigationUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';

const CheckCIBIL_Component = ({
  params,
  onSendOTP,
  handleMobileNumberInput,
  state,
  resendOTP,
  onConfirmPress,
  isOtpSend,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Check CIBIL Score"
        subtitle="GJ 01 JR 0945"
        rightLabel="#ABC123"
        showRightContent
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.wrapper}>
        <Text>Verify Your CIBIL Score</Text>
        <Spacing size="smd" />
        <Card>
          <Input
            isLeftIconVisible
            leftIconName={images.callOutline}
            label="Mobile Number"
            themeColor={theme.colors.textSecondary}
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType={'done'}
            onSubmitEditing={onSendOTP}
            onChangeText={handleMobileNumberInput}
            value={state.mobileNumber}
            statusMsg="OTP Sent Successfully!"
            showStatus
          />
          {isOtpSend ? (
            <>
              <Spacing size="md_lg" />
              <Text type={'label'}>Enter OTP</Text>
              <OTPVerification containerStyle={{left: -10, marginTop: 6}} />
              <Spacing size={'sm'} />
              <Text type={'helper-text'} textAlign={'center'}>
                Didn't get the OTP?
                <Text
                  onPress={resendOTP}
                  type={'helper-text'}
                  hankenGroteskBold={true}
                  color={theme.colors.primary}>
                  {false ? ` Resend in ${0}s` : ' Resend'}
                </Text>
              </Text>
            </>
          ) : null}
        </Card>
        <Spacing size="xl" />
        {!isOtpSend ? (
          <Button label={'Send OTP'} onPress={onSendOTP} />
        ) : (
          <Button label={'Confirm & Save'} onPress={onConfirmPress} />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
});

export default CheckCIBIL_Component;
