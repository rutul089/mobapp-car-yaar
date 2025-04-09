import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {
  Card,
  FormFooterButtons,
  Header,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import theme from '../../theme';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';

const CarFinance_Details_Component = ({
  handleSaveDraftPress,
  handleNextStepPress,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Car Finance Details"
        subtitle="GJ 01 JR 0945"
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        bounces={false}>
        <Text>Basic Details</Text>
        <Spacing size="smd" />
        <Card>
          <Input
            label="Bank Name"
            leftIconName={images.bank}
            isAsDropdown
            isRightIconVisible
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Loan Account Number"
            leftIconName={images.bank}
            keyboardType="number-pad"
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Loan Amount"
            leftIconName={images.icRupee}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Monthly EMI"
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="EMI Paid"
                isAsDropdown
                isRightIconVisible
              />
            </View>
          </View>
          <Spacing size="md" />
          <Input
            leftIconName={images.calendar}
            isAsDropdown
            isRightIconVisible
            isLeftIconVisible
            label="Tenure"
          />
        </Card>
        <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={handleSaveDraftPress}
          onPressSecondaryButton={handleNextStepPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
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
