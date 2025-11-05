import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  GroupWrapper,
  Header,
  images,
  Input,
  Loader,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import {genderTypes} from '../../constants/enums';
import {useInputRefs} from '../../utils/useInputRefs';

const CreateCIBIL_Component = ({
  params,
  onSendOTP,
  onChangeMobileNumber,
  state,
  onGenerateNowPress,
  headerProp,
  restInputProps = {},
  loading,
  onChangePanCardNumber,
  onChangeFullName,
  selectedGender,
  onSelectedGender = () => {},
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'panCardNumber',
    'fullName',
    'mobileNumber',
  ]);
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraHeight={100}
        contentContainerStyle={styles.wrapper}>
        <GroupWrapper title="Generate Your CIBIL Score">
          <Input
            ref={refs?.mobileNumber}
            isLeftIconVisible
            leftIconName={images.callOutline}
            label="Mobile Number"
            // themeColor={theme.colors.textSecondary}
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('panCardNumber')}
            onFocus={() => scrollToInput('panCardNumber')}
            onChangeText={onChangeMobileNumber}
            statusMsg="OTP Sent Successfully!"
            showStatus={false}
            {...(restInputProps?.mobileNumber || {})}
          />
          <Spacing size="md" />
          <Input
            placeholder="ABCDE1234F"
            isLeftIconVisible
            leftIconName={images.idCard}
            onChangeText={value => {
              const sanitizedText = value
                .replace(/[^a-zA-Z0-9]/g, '')
                .toUpperCase();
              onChangePanCardNumber?.(sanitizedText);
            }}
            value={state.panCardNumber}
            returnKeyType="next"
            ref={refs?.panCardNumber}
            onSubmitEditing={() => focusNext('fullName')}
            onFocus={() => scrollToInput('fullName')}
            rightLabelColor={theme.colors.primary}
            rightIconName={images.successCheck}
            {...(restInputProps?.panCardNumber || {})}
            label="PAN"
          />
          <Spacing size="md" />
          <Input
            ref={refs?.fullName}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Full Name"
            onChangeText={onChangeFullName}
            value={state.fullName}
            returnKeyType="next"
            onFocus={() => scrollToInput('applicantName')}
            {...(restInputProps?.fullName || {})}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'Gender'}
            options={genderTypes}
            selectedValue={selectedGender}
            onChange={onSelectedGender}
            statusMsg={restInputProps?.gender?.statusMsg}
            {...(restInputProps?.gender || {})}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button label={'Generate Now'} onPress={onGenerateNowPress} />
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

export default CreateCIBIL_Component;
