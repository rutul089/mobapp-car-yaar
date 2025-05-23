import {
  Card,
  FormFooterButtons,
  Header,
  images,
  Input,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React, {useRef} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {currentLoanTypes} from '../../constants/enums';

const Finance_Details_Component = ({
  answerOption,
  state,
  onSelectAnswer,
  saveAsDraftPress,
  onNextPress,
}) => {
  const bankNameRef = useRef(null);
  const loanAccountRef = useRef(null);
  const loanAmountRef = useRef(null);
  const monthlyEmiRef = useRef(null);

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Finance Details"
        subtitle="GJ 01 JR 0945"
        rightLabel="ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        bounces={false}>
        <Text>Was this car financed?</Text>
        <Spacing size="smd" />
        <Card>
          <RadioGroupRow
            label={'Select answer'}
            options={currentLoanTypes}
            selectedValue={state.selectedAnswer}
            onChange={onSelectAnswer}
          />
          <Spacing size="md" />
          <Input
            leftIconName={images.bank}
            isLeftIconVisible
            label="Bank Name"
            isAsDropdown
            isRightIconVisible
            ref={bankNameRef}
            onSubmitEditing={() => loanAccountRef.current.focus()}
          />
          <Spacing size="md" />
          <Input
            leftIconName={images.bank}
            isLeftIconVisible
            label="Loan Account Number"
            keyboardType="number-pad"
            returnKeyType="next"
            ref={loanAccountRef}
            onSubmitEditing={() => loanAmountRef.current.focus()}
          />
          <Spacing size="md" />
          <Input
            leftIconName={images.icRupee}
            isLeftIconVisible
            label="Loan Amount"
            keyboardType="number-pad"
            returnKeyType="next"
            ref={loanAmountRef}
            onSubmitEditing={() => monthlyEmiRef.current.focus()}
          />
          <Spacing size="md" />
          <Input
            leftIconName={images.calendar}
            isLeftIconVisible
            label="Tenure"
            isAsDropdown
            isRightIconVisible
          />
          <Spacing size="md" />
          <Input
            leftIconName={images.icRupee}
            isLeftIconVisible
            label="Monthly EMI"
            keyboardType="decimal-pad"
            returnKeyType="next"
            ref={monthlyEmiRef}
          />
          <Spacing size="md" />
          <Input
            leftIconName={images.calendar}
            isLeftIconVisible
            label="When was this loan closed"
            keyboardType="number-pad"
            returnKeyType="next"
            isAsDropdown
            onPress={() => Alert.alert('test')}
          />
        </Card>
        <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={saveAsDraftPress}
          onPressSecondaryButton={onNextPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
});

export default Finance_Details_Component;
