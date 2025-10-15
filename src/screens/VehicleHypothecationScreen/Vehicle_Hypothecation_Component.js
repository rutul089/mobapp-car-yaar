import {
  Card,
  FormFooterButtons,
  Header,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  Loader,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {currentLoanTypes} from '../../constants/enums';

const Vehicle_Hypothecation_Component = ({
  onSelectedAnswer = () => {},
  answerList,
  state,
  saveAsDraftPress,
  onNextPress,
  headerProp,
  isCreatingLoanApplication,
  loading,
}) => {
  return (
    <SafeAreaWrapper>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        bounces={false}>
        <Text>Is your car Hypothecated?</Text>
        <Spacing size="smd" />
        <Card>
          <RadioGroupRow
            label={'Select answer'}
            options={currentLoanTypes}
            selectedValue={state.carHypoStatus}
            onChange={onSelectedAnswer}
          />
        </Card>
        <Spacing size="lg" />
        <FormFooterButtons
          primaryButtonLabel={strings.next}
          onPressPrimaryButton={onNextPress}
          hideSecondaryButton={true}
        />
      </KeyboardAwareScrollView>
      {loading && <Loader visible={loading} />}
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

export default Vehicle_Hypothecation_Component;
