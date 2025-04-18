/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  FormFooterButtons,
  Header,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import {goBack} from '../../navigation/NavigationUtils';
import strings from '../../locales/strings';

const Loan_Amount_Component = ({onSaveDraftPress, onNextButtonPress}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Loan Amount"
        subtitle="GJ 01 JR 0945"
        rightLabel="ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView bounces={false} style={styles.wrapper}>
        <Text>What is the desired Loan Amount?</Text>
        <Spacing size="xs" />
        <Text type={'label'} size={'caption'}>
          (Upto dealer valuation price)
        </Text>
        <Spacing size="smd" />
        <Input
          placeholder={'123'}
          optionalLabelContainerStyles={{alignSelf: 'center'}}
          labelStyles={{fontSize: theme.typography.fontSizes.body}}
          inputContainerBackgroundColor={'white'}
          inputContainerBackgroundColorFocused={'white'}
          inputStyles={styles.inputStyle}
          returnKeyType="done"
          keyboardType="decimal-pad"
          autoFocus
        />
        <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={onSaveDraftPress}
          onPressSecondaryButton={onNextButtonPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
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

export default Loan_Amount_Component;
