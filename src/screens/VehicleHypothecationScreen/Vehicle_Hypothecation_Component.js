import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Card,
  FormFooterButtons,
  Header,
  RadioBlock,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import theme from '../../theme';

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
          <Text type={'label'}>Select answer</Text>
          <View style={styles.rowSpaceBetween}>
            {answerList &&
              answerList.map(item => (
                <RadioBlock
                  key={item?.value}
                  label={item?.label}
                  isSelected={state.carHypoStatus === item?.value}
                  wrapperStyle={styles.flex}
                  onPress={() => onSelectedAnswer(item?.value)}
                />
              ))}
          </View>
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
  flex: {
    flex: 1,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.sm,
    gap: 12,
  },
});

export default Vehicle_Hypothecation_Component;
