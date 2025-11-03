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
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'interestRate',
    'tenureMonths',
  ]);

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
            leftIconName={images.percentage_circle}
            label={'Tenure in Months'}
            isLeftIconVisible
            ref={refs?.tenureMonths}
            returnKeyType="done"
            onSubmitEditing={() => focusNext('mobileNumberHome')}
            onFocus={() => scrollToInput('referenceNameHome')}
            onChangeText={onTenureMonthsChange}
            keyboardType="number-pad"
            value={tenureMonths}
            {...(restInputProps?.tenureMonths || {})}
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
