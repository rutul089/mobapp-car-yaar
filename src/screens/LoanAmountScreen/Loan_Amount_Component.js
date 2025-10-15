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
  Loader,
  Button,
} from '@caryaar/components';
import strings from '../../locales/strings';
import {sanitizeAmount} from '../../utils/inputHelper';
import {formatIndianCurrency} from '../../utils/helper';

const Loan_Amount_Component = ({
  headerProp,
  onSaveDraftPress,
  onNextButtonPress,
  restInputProps = {},
  onChangeLoanAmount,
  loading,
  loanAmount,
}) => {
  const [caretHidden, setCaretHidden] = React.useState(true);

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView bounces={false} style={styles.wrapper}>
        <Text>What is the desired Loan Amount?</Text>
        <Spacing size="xs" />
        <Text type={'label'} size={'caption'}>
          (Upto dealer valuation price)
        </Text>
        <Spacing size="smd" />
        <Input
          optionalLabelContainerStyles={{alignSelf: 'center'}}
          labelStyles={{fontSize: theme.typography.fontSizes.body}}
          inputContainerBackgroundColor={'white'}
          inputContainerBackgroundColorFocused={'white'}
          inputStyles={styles.inputStyle}
          returnKeyType="done"
          keyboardType="number-pad"
          autoFocus
          onChangeText={value => {
            const sanitizedText = sanitizeAmount(value);
            setCaretHidden(!(sanitizedText.length > 0));
            onChangeLoanAmount?.(sanitizedText);
          }}
          onSubmitEditing={onNextButtonPress}
          value={formatIndianCurrency(loanAmount, true, true)}
          {...(restInputProps?.loanAmount || {})}
          restProps={{}}
          maxLength={15}
        />
        <Spacing size="lg" />
        <Button
          label={strings.next}
          onPress={onNextButtonPress}
          variant="link"
        />
      </KeyboardAwareScrollView>
      {loading && <Loader visible={loading} />}
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
    flex: 1, // ✅ Takes full width
    paddingVertical: 0, // ✅ Prevent vertical shift
  },
});

export default Loan_Amount_Component;
