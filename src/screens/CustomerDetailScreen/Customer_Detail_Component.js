/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {
  Button,
  DropdownModal,
  GroupWrapper,
  Header,
  Input,
  OptionCard,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import OTPModal from '../../components/OTPModal';
import {customerCategory, loanType} from '../../constants/enums';

const dropdownOptions = [
  {label: 'Corporate', value: 'a'},
  {label: 'Salaried', value: 'b'},
  {label: 'Self-Employed', value: 'c'},
  {label: 'Business Owner', value: 'c'},
  {label: 'Freelancer', value: 'c'},
  {label: 'Consultant', value: 'c'},
  {label: 'Retired', value: 'c'},
  {label: 'Unemployed', value: 'c'},
];

const Customer_Detail_Component = ({
  onBackPress,
  vehicleNumber,
  onSelectedOption,
  selectedOption,
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
              label={'Individual'}
              backgroundColor={theme.colors.background}
              icon={images.userCircle}
              value={customerCategory.individual}
              onSelect={onSelectedOption}
              isSelected={selectedOption === customerCategory.individual}
            />
            <OptionCard
              label={'Corporate'}
              backgroundColor={theme.colors.background}
              icon={images.corporate}
              value={customerCategory.corporate}
              onSelect={onSelectedOption}
              isSelected={selectedOption === customerCategory.corporate}
            />
          </View>
          <Spacing size="md_lg" />
          <Input
            label={'Select Individual Type'}
            isLeftIconVisible
            leftIconName={images.userCircle}
            isAsDropdown
            isRightIconVisible
            value={individualType}
            // onPress={selectedVehicleCondition}
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
        data={dropdownOptions}
        selectedItem={selectedItem}
        onSelect={(item, index) => {
          setSelectedItem(item.label);
          onChangeUserTypeOption && onChangeUserTypeOption(item, index);
        }}
        onClose={() => setShowModal(false)}
        title="Select Other Document Type"
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
