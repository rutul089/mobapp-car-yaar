/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  DropdownModal,
  GroupWrapper,
  Header,
  images,
  Input,
  OptionCard,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import OTPModal from '../../components/OTPModal';
import {
  customerCategory,
  customerCategoryValue,
  customerIndividualTypeOptions,
  loanType,
} from '../../constants/enums';

const Customer_Detail_Component = ({
  onBackPress,
  vehicleNumber,
  onSelectedOption,
  mobileNumber,
  onChangeMobileNumber,
  individualType,
  onChangeUserTypeOption,
  onSendOTPPress,
  showVerifyOTP,
  onCloseVerifyOTP,
  onPressPrimaryButton,
  selectedLoanType,
  btnLabel,
  onProceedPress,
  customerType,
  selectedCustomerCategory,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');
  return (
    <SafeAreaWrapper>
      <Header
        title="Customer Details"
        subtitle={vehicleNumber}
        showRightContent
        rightLabel="#ABC123"
        rightLabelColor={'#F8A902'}
        onBackPress={onBackPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flexGrow: 1,
          padding: theme.sizes.padding,
        }}>
        <GroupWrapper title="Basic Details">
          <Text type={'label'}>Select Customer Category</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <OptionCard
              label={customerCategoryValue.INDIVIDUAL}
              backgroundColor={theme.colors.background}
              icon={images.userCircle}
              value={customerCategory.INDIVIDUAL}
              onSelect={onSelectedOption}
              isSelected={
                selectedCustomerCategory === customerCategory.INDIVIDUAL
              }
            />
            <OptionCard
              label={customerCategoryValue.CORPORATE}
              backgroundColor={theme.colors.background}
              icon={images.corporate}
              value={customerCategory.CORPORATE}
              onSelect={onSelectedOption}
              isSelected={
                selectedCustomerCategory === customerCategory.CORPORATE
              }
            />
          </View>
          <Spacing size="md_lg" />
          <Input
            label={'Select Individual Type'}
            isLeftIconVisible
            leftIconName={images.userCircle}
            isAsDropdown
            isRightIconVisible
            value={customerType}
            onPress={() => setShowModal(true)}
          />
          {selectedLoanType === loanType.loan ? null : (
            <>
              <Spacing size="md_lg" />
              <Input
                label={'Customer Mobile Number'}
                isLeftIconVisible
                leftIconName={images.callOutline}
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={onChangeMobileNumber}
                maxLength={10}
              />
            </>
          )}
        </GroupWrapper>
        <Spacing size="xl" />
        {selectedLoanType === loanType.loan ? (
          <Button label={'Proceed'} onPress={onProceedPress} />
        ) : (
          <Button label={'Send OTP'} onPress={onSendOTPPress} />
        )}
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={customerIndividualTypeOptions}
        selectedItem={customerType}
        onSelect={(item, index) => {
          onChangeUserTypeOption?.(item, index);
        }}
        onClose={() => setShowModal(false)}
        title="Select Type"
      />
      <OTPModal
        isVisible={showVerifyOTP}
        onModalHide={onCloseVerifyOTP}
        onPressPrimaryButton={onPressPrimaryButton}
        mobileNumber="+91-9876543210"
      />
    </SafeAreaWrapper>
  );
};
export default Customer_Detail_Component;
