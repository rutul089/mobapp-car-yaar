import {
  Button,
  CommonModal,
  Header,
  Input,
  OTPVerification,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {goBack} from '../../../navigation/NavigationUtils';

const NewLoanCustomerOtp_Component = ({handleSendOTPPress}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Customer Details" onBackPress={() => goBack()} />
      <KeyboardAwareScrollView style={styles.wrapper}>
        <Input
          placeholder={'123'}
          optionalLabelContainerStyles={{alignSelf: 'center'}}
          labelStyles={{fontSize: theme.typography.fontSizes.body}}
          inputContainerBackgroundColor={'white'}
          inputContainerBackgroundColorFocused={'white'}
          inputStyles={styles.inputStyle}
          returnKeyType="done"
          keyboardType="number-pad"
          autoFocus
          label="Customer Mobile Number"
          maxLength={10}
        />
        <Spacing size="xl" />
        <Button label={'Send OTP'} onPress={handleSendOTPPress} />
        <CommonModal
          isVisible={false}
          onModalHide={() => {}}
          primaryButtonLabel={'Confirm & Verify'}
          isScrollableContent={true}
          isPrimaryButtonVisible={true}
          title="OTP Verification"
          onPressPrimaryButton={() => {}}>
          <>
            <View style={{alignItems: 'center'}}>
              <Text
                type={'helper-text'}
                textAlign={'center'}
                style={{width: '80%'}}>
                Enter the 4 Digit Code you received in your mobile{' '}
                <Text
                  type={'helper-text'}
                  hankenGroteskBold={true}
                  color={theme.colors.primary}>
                  {'mobileNumber'}
                </Text>
              </Text>
            </View>
            <Spacing size={'md_lg'} />
            <OTPVerification />
            <Spacing size={'md_lg'} />
            <Text type={'helper-text'} textAlign={'center'}>
              Didn't get the OTP?
              <Text
                type={'helper-text'}
                hankenGroteskBold={true}
                color={theme.colors.primary}>
                {false ? ` Resend in ${0}s` : ' Resend'}
              </Text>
            </Text>
          </>
        </CommonModal>
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
  inputStyle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.h4,
    textAlign: 'center',
    ...theme.typography.fontStyles.hankenGroteskBold,
  },
});

export default NewLoanCustomerOtp_Component;
