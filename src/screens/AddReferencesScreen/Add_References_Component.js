import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  DropdownModal,
  GroupWrapper,
  Header,
  images,
  Input,
  SafeAreaWrapper,
  Spacing,
  theme,
  Loader,
} from '@caryaar/components';
import React from 'react';
import {relationshipTypeOptions} from '../../constants/enums';
import {useInputRefs} from '../../utils/useInputRefs';

const Add_References_Component = ({
  headerProp,
  onConfirmLoanPress,
  relationshipOffice,
  relationshipHome,
  onReferenceSelected,
  onReferenceNameHomeChange,
  onMobileNumberHomeChange,
  onAddressHomeChange,
  onPincodeHomeChange,
  onReferenceNameOfficeChange,
  onMobileNumberOfficeChange,
  onAddressOfficeChange,
  onPincodeOfficeChange,
  loading,
  restInputProps = {},
  isReadOnlyLoanApplication,
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'referenceNameHome',
    'mobileNumberHome',
    'relationshipHome',
    'addressHome',
    'pincodeHome',
    'referenceNameOffice',
    'mobileNumberOffice',
    'relationshipOffice',
    'addressOffice',
    'pincodeOffice',
  ]);

  const [showModal, setShowModal] = React.useState(false);
  const [referenceType, setReferenceType] = React.useState('HOME');

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        extraScrollHeight={100}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <GroupWrapper title={'Home Verification'}>
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            returnKeyType="next"
            label={'Reference Name'}
            onChangeText={onReferenceNameHomeChange}
            ref={refs?.referenceNameHome}
            onSubmitEditing={() => focusNext('mobileNumberHome')}
            onFocus={() => scrollToInput('referenceNameHome')}
            {...(restInputProps?.referenceNameHome || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.mobileNumberHome}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            returnKeyType="next"
            label={'Mobile Number'}
            keyboardType="number-pad"
            onChangeText={onMobileNumberHomeChange}
            onSubmitEditing={() => focusNext('addressHome')}
            onFocus={() => scrollToInput('mobileNumberHome')}
            {...(restInputProps?.mobileNumberHome || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.relationshipHome}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.relationship}
            isAsDropdown
            isRightIconVisible
            label="Relationship"
            value={relationshipHome}
            onPress={() => {
              setShowModal(true);
              setReferenceType('HOME');
            }}
            {...(restInputProps?.relationshipHome || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.addressHome}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Address'}
            onChangeText={onAddressHomeChange}
            onSubmitEditing={() => focusNext('pincodeHome')}
            onFocus={() => scrollToInput('addressHome')}
            {...(restInputProps?.addressHome || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.pincodeHome}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Pincode'}
            // rightLabel={'Jodhpur'}
            keyboardType="number-pad"
            onChangeText={onPincodeHomeChange}
            onSubmitEditing={() => focusNext('referenceNameOffice')}
            onFocus={() => scrollToInput('pincodeHome')}
            {...(restInputProps?.pincodeHome || {})}
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
            ref={refs?.referenceNameOffice}
            onChangeText={onReferenceNameOfficeChange}
            onSubmitEditing={() => focusNext('mobileNumberOffice')}
            onFocus={() => scrollToInput('referenceNameOffice')}
            {...(restInputProps?.referenceNameOffice || {})}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            returnKeyType="next"
            label={'Mobile Number'}
            keyboardType="number-pad"
            ref={refs?.mobileNumberOffice}
            onChangeText={onMobileNumberOfficeChange}
            onSubmitEditing={() => focusNext('addressOffice')}
            onFocus={() => scrollToInput('mobileNumberOffice')}
            {...(restInputProps?.mobileNumberOffice || {})}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.relationship}
            isAsDropdown
            isRightIconVisible
            label="Relationship"
            value={relationshipOffice}
            onPress={() => {
              setShowModal(true);
              setReferenceType('OFFICE');
            }}
            ref={refs?.relationshipOffice}
            {...(restInputProps?.relationshipOffice || {})}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Address'}
            ref={refs?.addressOffice}
            onChangeText={onAddressOfficeChange}
            onSubmitEditing={() => focusNext('pincodeOffice')}
            onFocus={() => scrollToInput('addressOffice')}
            {...(restInputProps?.addressOffice || {})}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            returnKeyType="next"
            label={'Pincode'}
            // rightLabel={'Jodhpur'}
            keyboardType="number-pad"
            ref={refs?.pincodeOffice}
            onChangeText={onPincodeOfficeChange}
            onSubmitEditing={onConfirmLoanPress}
            onFocus={() => scrollToInput('pincodeOffice')}
            {...(restInputProps?.pincodeOffice || {})}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button
          label={
            isReadOnlyLoanApplication ? 'Next' : 'Confirm & Apply for Loan'
          }
          onPress={onConfirmLoanPress}
        />
        <Spacing size="xl" />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={relationshipTypeOptions}
        selectedItem={
          referenceType === 'HOME' ? relationshipHome : relationshipOffice
        }
        onSelect={(item, index) => {
          onReferenceSelected?.(item, referenceType);
        }}
        onClose={() => setShowModal(false)}
        title="Select Type"
      />
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    paddingBottom: theme.sizes.padding,
  },
});

export default Add_References_Component;
