import {
  AutocompleteInput,
  Card,
  Header,
  images,
  Input,
  Loader,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  DropdownModal,
  Button,
  DatePicker,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {currentLoanTypes} from '../../constants/enums';
import strings from '../../locales/strings';
import {formatIndianCurrency} from '../../utils/helper';
import {
  formatInputDate,
  isValidInput,
  sanitizeAmount,
} from '../../utils/inputHelper';
import {useInputRefs} from '../../utils/useInputRefs';

const defaultTenure = Array(60)
  .fill(0)
  .map((_, i) => {
    const month = i + 1;
    return {
      label: `${month} ${month > 1 ? 'Months' : 'Month'}`,
      value: month,
    };
  });

const Finance_Details_Component = ({
  headerProp,
  state,
  onSelectAnswer,
  onNextPress,
  isCreatingLoanApplication,
  loading,
  onBankNameChange,
  searchBankNameFromAPI,
  onSelectSuggestion,
  onChangeAccountNumber,
  onChangeLoanAmount,
  onChangeTenure,
  onChangeMonthlyAmount,
  onChangeLoanClosedDate,
  selectTenure,
  restInputProps = {},
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'bankName',
    'loanAccountNumber',
    'loanAmount',
    'monthlyEmi',
    'emiPaid',
    'tenure',
    'loanClosedDate',
  ]);

  const [editingStates, setEditingStates] = React.useState({
    loanAmount: false,
    monthlyEmi: false,
    tenure: false,
    monthlyIncome: false,
  });

  const setFieldEditing = (field, value) => {
    setEditingStates(prev => ({...prev, [field]: value}));
  };

  const getDisplayValue = React.useCallback((isEditing, value) => {
    return formatIndianCurrency(value, false, true);
  }, []);

  const [showTenureModal, setShowTenureModal] = React.useState(false);

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={150}
        bounces={false}
        contentContainerStyle={styles.wrapper}
        keyboardShouldPersistTaps="handled">
        <Text>Was this car financed?</Text>
        <Spacing size="smd" />
        <Card>
          <RadioGroupRow
            label={'Select answer'}
            options={currentLoanTypes}
            selectedValue={state.isCarFinanced}
            onChange={onSelectAnswer}
            restInputProps={restInputProps?.radioGroup}
          />
          <Spacing size="md" />
          {state.isCarFinanced && (
            <>
              <AutocompleteInput
                ref={refs.bankName}
                restProps={{
                  label: 'Bank Name',
                  isLeftIconVisible: true,
                  leftIconName: images.bank,
                  returnKeyType: 'next',
                  onSubmitEditing: () => focusNext('loanAccountNumber'),
                  onFocus: () => scrollToInput('bankName'),
                }}
                onChangeText={onBankNameChange}
                fetchSuggestions={searchBankNameFromAPI}
                onSelectSuggestion={onSelectSuggestion}
                value={restInputProps?.bankName?.value || ''}
                suggestionTextKey={'bank'}
                {...(restInputProps?.bankName || {})}
              />
              <Spacing size="md" />
              <Input
                ref={refs?.loanAccountNumber}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.bank}
                label="Loan Account Number"
                keyboardType="numeric"
                returnKeyType="next"
                value={state.loanAccountNumber}
                onChangeText={value => {
                  const sanitizedText = value.replace(/[^0-9]/g, '');
                  onChangeAccountNumber?.(sanitizedText);
                }}
                onSubmitEditing={() => focusNext('loanAmount')}
                onFocus={() => scrollToInput('loanAccountNumber')}
                {...(restInputProps?.loanAccountNumber || {})}
              />
              <Spacing size="md" />
              <Input
                ref={refs?.loanAmount}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Loan Amount"
                keyboardType="number-pad"
                returnKeyType="next"
                onChangeText={value => {
                  const sanitizedText = sanitizeAmount(value);
                  onChangeLoanAmount?.(sanitizedText);
                }}
                value={getDisplayValue(
                  editingStates.loanAmount,
                  state.loanAmount,
                )}
                onSubmitEditing={() => focusNext('monthlyEmi')}
                onFocus={() => {
                  scrollToInput('loanAmount');
                  setFieldEditing('loanAmount', true);
                }}
                onBlur={() => setFieldEditing('loanAmount', false)}
                {...(restInputProps?.loanAmount || {})}
              />

              <Spacing size="md" />
              <Input
                ref={refs?.tenure}
                placeholder="Select Tenure"
                isLeftIconVisible
                leftIconName={images.calendar}
                label="Tenure"
                onChangeText={onChangeTenure}
                value={
                  state.tenure
                    ? `${state.tenure} ${state.tenure > 1 ? 'Months' : 'Month'}`
                    : ''
                }
                isAsDropdown
                isRightIconVisible
                onPress={() => setShowTenureModal(true)}
                {...(restInputProps?.tenure || {})}
              />
              <Spacing size="md" />
              <Input
                ref={refs?.monthlyEmi}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Monthly EMI"
                keyboardType="number-pad"
                returnKeyType="next"
                onChangeText={value => {
                  const sanitizedText = sanitizeAmount(value);
                  onChangeMonthlyAmount?.(sanitizedText);
                }}
                value={getDisplayValue(
                  editingStates.monthlyEmi,
                  state.monthlyEmi,
                )}
                onSubmitEditing={() => focusNext('loanClosedDate')}
                onFocus={() => {
                  scrollToInput('monthlyEmi');
                  setFieldEditing('monthlyEmi', true);
                }}
                onBlur={() => setFieldEditing('monthlyEmi', false)}
                {...(restInputProps?.monthlyEmi || {})}
              />
              <Spacing size="md" />
              <Input
                ref={refs?.loanClosedDate}
                value={state.loanClosedDate}
                isLeftIconVisible
                leftIconName={images.calendar}
                label="When was this loan closed"
                // onChangeText={text => {
                //   if (!isValidInput(text)) {
                //     return;
                //   }
                //   const formatted = formatInputDate(text); // TODO add datepicker here
                //   onChangeLoanClosedDate?.(formatted);
                // }}
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={onNextPress}
                isAsButton
                isAsDropdown
                onPress={() => setShowDatePicker(true)} // 👈 open picker on click
                onFocus={() => scrollToInput('loanClosedDate')}
                {...(restInputProps?.loanClosedDate || {})}
              />
            </>
          )}
        </Card>
        <Spacing size="lg" />
        <Button variant="link" onPress={onNextPress} label={strings.next} />
        <Spacing size={theme.sizes.padding + 10} />
      </KeyboardAwareScrollView>

      <DropdownModal
        visible={showTenureModal}
        data={defaultTenure}
        selectedItem={`${state.tenure} ${state.tenure > 1 ? 'Months' : 'Month'}`}
        onSelect={(item, index) => {
          selectTenure?.(item);
        }}
        onClose={() => setShowTenureModal(false)}
        title="Select Tenure"
      />

      <DatePicker
        visible={showDatePicker}
        value={state.loanClosedDate}
        onConfirm={date => {
          onChangeLoanClosedDate?.(date);
        }}
        onClose={() => setShowDatePicker(false)}
        stopUpdate
      />

      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    paddingBottom: 0,
    backgroundColor: theme.colors.background,
  },
});

export default Finance_Details_Component;
