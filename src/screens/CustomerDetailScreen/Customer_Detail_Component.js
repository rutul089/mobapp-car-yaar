/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {
  Button,
  Card,
  CommonModal,
  DropdownModal,
  Header,
  Input,
  OptionCard,
  OTPVerification,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import {customerCategory, loanType} from '../../constants/enums';
import theme from '../../theme';
import OTPModal from '../../components/OTPModal';

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
        <Text>{'Basic Details'}</Text>
        <Spacing size="smd" />
        <Card>
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
              type={customerCategory.individual}
              onSelectedOption={onSelectedOption}
              isSelected={selectedOption === customerCategory.individual}
            />
            <OptionCard
              label={'Corporate'}
              backgroundColor={theme.colors.background}
              icon={images.corporate}
              type={customerCategory.corporate}
              onSelectedOption={onSelectedOption}
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
        </Card>
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
      {/* <CommonModal
        title={'OTP Verification'}
        isVisible={showVerifyOTP}
        onModalHide={onCloseVerifyOTP}
        primaryButtonLabel={'Confirm & Verify'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={onPressPrimaryButton}>
        <>
          <View style={{alignItems: 'center'}}>
            <Text
              type={'helper-text'}
              textAlign={'center'}
              style={{width: '70%'}}>
              Enter the 4 Digit Code you received in your mobile{' '}
              <Text
                type={'helper-text'}
                hankenGroteskBold={true}
                color={theme.colors.primary}>
                {'mobileNumber'}
              </Text>
            </Text>
          </View>
          <Spacing size={'md_lg'} />
          <OTPVerification />
          <Spacing size={'md_lg'} />
          <Text type={'helper-text'} textAlign={'center'}>
            Didn't get the OTP?
            <Text
              type={'helper-text'}
              hankenGroteskBold={true}
              color={theme.colors.primary}>
              {false ? ` Resend in ${0}s` : ' Resend'}
            </Text>
          </Text>
        </>
      </CommonModal> */}
    </SafeAreaWrapper>
  );
};
export default Customer_Detail_Component;
