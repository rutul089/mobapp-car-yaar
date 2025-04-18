import {
  Button,
  Card,
  Header,
  images,
  Input,
  RadioButton,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Customize_LoanOffer_Component = ({
  params,
  loanTypes,
  onSelectLoanType,
  onSubmitPress,
}) => {
  const [selectedType, setSelectedType] = React.useState('Vanilla Loan');
  const totalRows = Math.ceil(loanTypes?.length / 2);

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Customise Loan Offer" onBackPress={() => goBack()} />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <Text>Select Loan Type</Text>
        <Spacing size="smd" />
        <Card>
          <View style={styles.container}>
            {loanTypes &&
              loanTypes.map((type, index) => {
                const currentRow = Math.floor(index / 2) + 1;
                const isLastRow = currentRow === totalRows;
                return (
                  <View style={styles.optionWrapper} key={index}>
                    <RadioButton
                      label={type}
                      selected={selectedType === type}
                      onPress={() => {
                        setSelectedType(type),
                          onSelectLoanType && onSelectLoanType(type, index);
                      }}
                      marginBottom={isLastRow ? 0 : 14}
                    />
                  </View>
                );
              })}
          </View>
        </Card>
        <Spacing size="lg" />
        <Card>
          <Input
            leftIconName={images.percentage_circle}
            label={'Interest Rate'}
            keyboardType="decimal-pad"
            isLeftIconVisible
          />
          <Spacing size="smd" />
          <Input
            leftIconName={images.percentage_circle}
            label={'Title'}
            isLeftIconVisible
          />
          <Spacing size="smd" />
          <Input
            leftIconName={images.percentage_circle}
            label={'Title'}
            isLeftIconVisible
          />
        </Card>
        <Spacing size="xl" />
        <Button label={'Submit'} onPress={onSubmitPress} />
      </KeyboardAwareScrollView>
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
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  optionWrapper: {
    width: '45%', // two columns
  },
});

export default Customize_LoanOffer_Component;
