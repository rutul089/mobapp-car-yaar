import {
  Button,
  GroupWrapper,
  Header,
  images,
  Input,
  RadioButton,
  SafeAreaWrapper,
  Spacing,
  theme,
  Loader,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useInputRefs} from '../../utils/useInputRefs';
import {formatIndianCurrency} from '../../utils/helper';
import {sanitizeAmount} from '../../utils/inputHelper';

const Customize_LoanOffer_Component = ({
  params,
  loanTypes,
  onSelectLoanType,
  onSubmitPress,
  interestRate,
  onInterestRateChange,
  tenureMonths,
  onTenureMonthsChange,
  restInputProps,
  loading,
  processingFee,
  onProcessingFeeChange,
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'interestRate',
    'tenureMonths',
    'processingFee',
  ]);

  const [editingStates, setEditingStates] = React.useState({
    processingFee: false,
  });

  const setFieldEditing = (field, value) => {
    setEditingStates(prev => ({...prev, [field]: value}));
  };

  const getDisplayValue = (isEditing, value) => {
    return isEditing ? value : formatIndianCurrency(value, false, true);
  };

  const [selectedType, setSelectedType] = React.useState('Vanilla Loan');
  const totalRows = Math.ceil(loanTypes?.length / 2);

  const renderLoanType = () => {
    return (
      loanTypes &&
      loanTypes.map((type, index) => {
        const currentRow = Math.floor(index / 2) + 1;
        const isLastRow = currentRow === totalRows;
        return (
          <View style={styles.optionWrapper} key={index}>
            <RadioButton
              label={type}
              selected={selectedType === type}
              onPress={() => {
                (setSelectedType(type),
                  onSelectLoanType && onSelectLoanType(type, index));
              }}
              marginBottom={isLastRow ? 0 : 14}
            />
          </View>
        );
      })
    );
  };

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Customise Loan Offer" onBackPress={() => goBack()} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        extraScrollHeight={100}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <GroupWrapper title={'Select Loan Type'}>
          <View style={styles.container}>{renderLoanType()}</View>
        </GroupWrapper>
        <Spacing size="md" />
        <GroupWrapper>
          <Input
            leftIconName={images.percentage_circle}
            label={'Interest Rate'}
            keyboardType="decimal-pad"
            isLeftIconVisible
            ref={refs?.interestRate}
            onSubmitEditing={() => focusNext('tenureMonths')}
            onFocus={() => scrollToInput('tenureMonths')}
            returnKeyType="next"
            value={interestRate}
            onChangeText={onInterestRateChange}
            {...(restInputProps?.interestRate || {})}
          />
          <Spacing size="smd" />
          <Input
            leftIconName={images.calendar}
            label={'Tenure in Months'}
            isLeftIconVisible
            ref={refs?.tenureMonths}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('processingFee')}
            onFocus={() => scrollToInput('processingFee')}
            onChangeText={onTenureMonthsChange}
            keyboardType="number-pad"
            value={tenureMonths}
            {...(restInputProps?.tenureMonths || {})}
          />
          <Spacing size="smd" />
          <Input
            leftIconName={images.icRupee}
            label={'Processing Fee'}
            isLeftIconVisible
            ref={refs?.processingFee}
            returnKeyType="done"
            onSubmitEditing={() => focusNext('mobileNumberHome')}
            onChangeText={value => {
              const sanitizedText = sanitizeAmount(value);
              onProcessingFeeChange?.(sanitizedText);
            }}
            keyboardType="decimal-pad"
            value={getDisplayValue(editingStates.processingFee, processingFee)}
            onFocus={() => {
              scrollToInput('processingFee');
              setFieldEditing('processingFee', true);
            }}
            onBlur={() => setFieldEditing('processingFee', false)}
            {...(restInputProps?.processingFee || {})}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button label={'Submit'} onPress={onSubmitPress} />
      </KeyboardAwareScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionWrapper: {
    width: '45%', // two columns
  },
});

export default Customize_LoanOffer_Component;
