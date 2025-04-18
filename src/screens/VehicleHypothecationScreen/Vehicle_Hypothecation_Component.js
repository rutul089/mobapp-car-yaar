import {
  Card,
  FormFooterButtons,
  Header,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';

const Vehicle_Hypothecation_Component = ({
  onSelectedAnswer = () => {},
  answerList,
  state,
  saveAsDraftPress,
  onNextPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header
        title="Vehicle Details"
        subtitle="@12313"
        rightLabel="#ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        bounces={false}>
        <Text>Is your car Hypothecated?</Text>
        <Spacing size="smd" />
        <Card>
          <RadioGroupRow
            label={'Select answer'}
            options={answerList}
            selectedValue={state.carHypoStatus}
            onChange={onSelectedAnswer}
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

export default Vehicle_Hypothecation_Component;
