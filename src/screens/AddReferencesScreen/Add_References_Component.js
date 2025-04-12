import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {
  Button,
  GroupWrapper,
  Header,
  Input,
  SafeAreaWrapper,
  Spacing,
} from '../../components';
import {goBack} from '../../navigation/NavigationUtils';
import theme from '../../theme';

const Add_References_Component = ({onConfirmLoanPress}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Add References"
        subtitle="GJ 01 JR 0945"
        rightLabel="ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        bounces={false}>
        <GroupWrapper title={'Home Verification'}>
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            returnKeyType="next"
            label={'Reference Name'}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            returnKeyType="next"
            label={'Mobile Number'}
            keyboardType="number-pad"
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.relationship}
            isAsDropdown
            isRightIconVisible
            label="Relationship"
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Address'}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Pincode'}
            rightLabel={'Jodhpur'}
          />
        </GroupWrapper>
        <Spacing size="md" />
        <GroupWrapper title={'Office Verification'}>
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            returnKeyType="next"
            label={'Reference Name'}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            returnKeyType="next"
            label={'Mobile Number'}
            keyboardType="number-pad"
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.relationship}
            isAsDropdown
            isRightIconVisible
            label="Relationship"
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Address'}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Pincode'}
            rightLabel={'Jodhpur'}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button
          label={'Confirm & Apply for Loan'}
          onPress={onConfirmLoanPress}
        />
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
});

export default Add_References_Component;
