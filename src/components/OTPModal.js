import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  CommonModal,
  OTPVerification,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';

const OTPModal = ({
  isVisible,
  onModalHide,
  onPressPrimaryButton,
  mobileNumber,
  initialCountdown = 10, // default 30s timer
  onResendPress,
  onOtpComplete,
  isError,
  errorMessage,
}) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [resendEnabled, setResendEnabled] = useState(false);
  const timerRef = React.useRef(null); // ✅ store timer ref

  const startCountdown = () => {
    clearInterval(timerRef.current); // clear previous timer
    setCountdown(initialCountdown);
    setResendEnabled(false);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 🔁 Start when modal becomes visible
  useEffect(() => {
    if (isVisible) {
      startCountdown();
    }
    return () => clearInterval(timerRef.current); // clean up
  }, [isVisible]);

  // 🔁 Handle resend and restart timer
  const handleResend = () => {
    if (resendEnabled) {
      onResendPress?.();
      startCountdown(); // ✅ restart timer
    }
  };

  return (
    <CommonModal
      isVisible={isVisible}
      onModalHide={onModalHide}
      primaryButtonLabel={'Confirm & Verify'}
      isScrollableContent={true}
      isPrimaryButtonVisible={true}
      title="OTP Verification"
      isCancellable={false}
      onPressPrimaryButton={onPressPrimaryButton}>
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
              {mobileNumber}
            </Text>
          </Text>
        </View>

        <Spacing size={'md_lg'} />
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
        <Spacing size={'md_lg'} />

        <Text type={'helper-text'} textAlign={'center'}>
          Didn't get the OTP?
          <Text
            type={'helper-text'}
            hankenGroteskBold={true}
            color={theme.colors.primary}
            onPress={handleResend}
            style={{opacity: resendEnabled ? 1 : 0.5}}>
            {resendEnabled ? ' Resend' : ` Resend in ${countdown}s`}
          </Text>
        </Text>
      </>
    </CommonModal>
  );
};

export default OTPModal;
