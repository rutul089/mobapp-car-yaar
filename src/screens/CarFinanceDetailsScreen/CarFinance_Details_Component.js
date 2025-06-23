import {
  Card,
  FormFooterButtons,
  Header,
  images,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  AutocompleteInput,
  Loader,
  DropdownModal,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {formatIndianCurrency} from '../../utils/helper';
import {useInputRefs} from '../../utils/useInputRefs';
import {sanitizeAmount} from '../../utils/inputHelper';

const defaultTenure = Array(60)
  .fill(0)
  .map((_, i) => {
    const month = i + 1;
    return {
      label: `${month} ${month > 1 ? 'Months' : 'Month'}`,
      value: month,
    };
  });

const CarFinance_Details_Component = ({
  headerProp,
  handleSaveDraftPress,
  handleNextStepPress,
  state,
  onSelectAnswer,
  isCreatingLoanApplication,
  loading,
  onBankNameChange,
  searchBankNameFromAPI,
  onSelectSuggestion,
  onChangeAccountNumber,
  onChangeLoanAmount,
  onChangeTenure,
  onChangeMonthlyAmount,
  onChangeEmiPaid,
  tenure,
  restInputProps = {},
  selectTenure,
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'bankName',
    'loanAccountNumber',
    'loanAmount',
    'monthlyEmi',
    'emiPaid',
    'tenure',
  ]);

  const [editingStates, setEditingStates] = React.useState({
    loanAmount: false,
    monthlyEmi: false,
    tenure: false,
    emiPaid: false,
  });

  const setFieldEditing = (field, value) => {
    setEditingStates(prev => ({...prev, [field]: value}));
  };

  const getDisplayValue = React.useCallback((isEditing, value) => {
    return formatIndianCurrency(value, false, true);
  }, []);

  const getDisplayValueTenure = React.useCallback((isEditing, value) => {
    return isEditing ? value + '' : value > 0 ? `${value} Months` : '';
  }, []);

  const [showTenureModal, setShowTenureModal] = React.useState(false);

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        bounces={false}>
        <Text>Basic Details</Text>
        <Spacing size="smd" />
        <Card>
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
            value={getDisplayValue(editingStates.loanAmount, state.loanAmount)}
            onSubmitEditing={() => focusNext('monthlyEmi')}
            onFocus={() => {
              scrollToInput('loanAmount');
              setFieldEditing('loanAmount', true);
            }}
            onBlur={() => setFieldEditing('loanAmount', false)}
            {...(restInputProps?.loanAmount || {})}
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
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
                onSubmitEditing={() => focusNext('emiPaid')}
                onFocus={() => {
                  scrollToInput('monthlyEmi');
                  setFieldEditing('monthlyEmi', true);
                }}
                onBlur={() => setFieldEditing('monthlyEmi', false)}
                {...(restInputProps?.monthlyEmi || {})}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                ref={refs?.emiPaid}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="EMI Paid"
                keyboardType="number-pad"
                returnKeyType="next"
                onChangeText={value => {
                  onChangeEmiPaid?.(value);
                }}
                value={state.emiPaid}
                onSubmitEditing={() => focusNext('tenure')}
                onFocus={() => {
                  scrollToInput('emiPaid');
                  setFieldEditing('emiPaid', true);
                }}
                onBlur={() => setFieldEditing('emiPaid', false)}
                {...(restInputProps?.emiPaid || {})}
              />
            </View>
          </View>
          <Spacing size="md" />
          <Input
            ref={refs?.tenure}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Tenure"
            keyboardType="number-pad"
            returnKeyType="done"
            value={`${state.tenure} ${state.tenure > 1 ? 'Months' : 'Month'}`}
            isAsDropdown
            isRightIconVisible
            onPress={() => setShowTenureModal(true)}
            {...(restInputProps?.tenure || {})}
          />
        </Card>
        <FormFooterButtons
          primaryButtonLabel={strings.next}
          onPressPrimaryButton={handleNextStepPress}
          // secondaryButtonLabel={strings.next}
          // onPressSecondaryButton={onNextPress}
          hideSecondaryButton={true}
        />

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
      </KeyboardAwareScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
    paddingBottom: theme.sizes.padding,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.sm,
    // gap: 12,
  },
  flex: {
    flex: 1,
  },
  halfWidth: {
    width: '47%',
  },
});

export default CarFinance_Details_Component;
