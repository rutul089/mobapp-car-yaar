/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  GroupWrapper,
  Header,
  images,
  Input,
  OTPVerification,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  Loader,
} from '@caryaar/components';

const CheckCIBIL_Component = ({
  params,
  onSendOTP,
  onChangeMobileNumber,
  state,
  resendOTP,
  onConfirmPress,
  isOtpSend,
  headerProp,
  restInputProps = {},
  loading,
  onOtpComplete,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.wrapper}>
        <GroupWrapper title="Verify Your CIBIL Score">
          <Input
            isLeftIconVisible
            leftIconName={images.callOutline}
            label="Mobile Number"
            themeColor={theme.colors.textSecondary}
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType={'done'}
            onSubmitEditing={onSendOTP}
            onChangeText={onChangeMobileNumber}
            statusMsg="OTP Sent Successfully!"
            showStatus={false}
            {...(restInputProps?.mobileNumber || {})}
          />
          {isOtpSend ? (
            <>
              <Spacing size="md_lg" />
              <Text type={'label'}>Enter OTP</Text>
              <OTPVerification
                containerStyle={{
                  left: Platform.OS === 'android' ? '-4%' : '-9%',
                  marginTop: 9,
                }}
                onOtpComplete={onOtpComplete}
              />
              <Spacing size={'smd'} />
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
        </GroupWrapper>
        <Spacing size="xl" />
        {!isOtpSend ? (
          <Button label={'Send OTP'} onPress={onSendOTP} />
        ) : (
          <Button label={'Confirm & Save'} onPress={onConfirmPress} />
        )}
      </KeyboardAwareScrollView>
      {loading && <Loader visible={loading} />}
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
