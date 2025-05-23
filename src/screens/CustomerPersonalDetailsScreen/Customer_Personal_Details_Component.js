import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  DropdownModal,
  FilePickerModal,
  FormFooterButtons,
  GroupWrapper,
  Header,
  images,
  ImageUploadButton,
  Input,
  Loader,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  AutocompleteInput,
} from '@caryaar/components';
import {
  currentLoanTypes,
  genderTypes,
  occupationOptions,
} from '../../constants/enums';
import strings from '../../locales/strings';
import {formatIndianCurrency} from '../../utils/helper';
import {
  formatInputDate,
  isValidInput,
  sanitizeAmount,
} from '../../utils/inputHelper';
import {useInputRefs} from '../../utils/useInputRefs';

const Customer_Personal_Details_Component = ({
  selectedGender,
  onSelectedGender = () => {},
  state,
  onChangePanCardNumber,
  onChangeAadharNumber,
  onChangeApplicantName,
  onChangemobileNumber,
  onChangeFatherMotherName,
  onChangeSpouseName,
  onChangeEmail,
  onChangeCurrentAddress,
  onChangeCurrentPincode,
  onChangeMonthlyIncome,
  onChangeAccountNumber,
  onChangeCurrentEMI,
  onChangeMaxEMIAfford,
  onChangeMonthlyBankBalance,
  onChangeDob,
  currentLoanOptions,
  onSelectedLoanOption = () => {},
  onSelectedOccupation = () => {},
  onSelectIncomeSourceOption = () => {},
  onSelectBankOption = () => {},
  onNextPress,
  saveAsDraftPress,
  headerProp = {},
  restInputProps = {},
  occupation,
  filePickerProps = {},
  handleFilePicker,
  loading,
  onBankNameChange,
  searchBankNameFromAPI,
  onSelectSuggestion,
  isEdit,
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'panCardNumber',
    'aadharNumber',
    'applicantName',
    'mobileNumber',
    'fatherName',
    'spouseName',
    'email',
    'dob',
    'address',
    'pincode',
    'monthlyIncome',
    'accountNumber',
    'currentEmi',
    'maxEmiAfford',
    'avgMonthlyBankBalance',
    'incomeSource',
    'occupation',
    'bankName',
  ]);

  const [isOccupationModalVisible, setIsOccupationModalVisible] =
    React.useState(false);
  const [showIncomeSourceModal, setShowIncomeSourceModal] =
    React.useState(false);
  const [showBankOptionModal, setShowBankOptionModal] = React.useState(false);

  const [editingStates, setEditingStates] = React.useState({
    currentEmi: false,
    maxEmiAfford: false,
    avgMonthlyBankBalance: false,
    monthlyIncome: false,
  });

  const setFieldEditing = (field, value) => {
    setEditingStates(prev => ({...prev, [field]: value}));
  };

  const getDisplayValue = (isEditing, value) => {
    return isEditing ? value + '' : formatIndianCurrency(value, false, true);
  };

  return (
    <SafeAreaWrapper>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={100} // adjust if needed
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={styles.wrapper}>
        {/* Personal Details */}
        <GroupWrapper title={'Personal Details'}>
          <ImageUploadButton
            label={'Applicant Photo'}
            btnLabel={'Click to Upload Photo'}
            image={state.applicantPhoto}
            handleImagePick={() => handleFilePicker?.('applicantPhoto')}
            {...(restInputProps?.applicantPhoto || {})}
          />
          <Spacing size="md" />
          <ImageUploadButton
            label={'Pan Card'}
            btnLabel={'Click to Upload PAN Card Photo'}
            image={state.pancardPhoto}
            handleImagePick={() => handleFilePicker?.('pancardPhoto')}
            {...(restInputProps?.pancardPhoto || {})}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.idCard}
            onChangeText={value => {
              const sanitizedText = value
                .replace(/[^a-zA-Z0-9]/g, '')
                .toUpperCase();
              onChangePanCardNumber?.(sanitizedText);
            }}
            value={state.panCardNumber}
            returnKeyType="next"
            ref={refs?.panCardNumber}
            onSubmitEditing={() => focusNext('aadharNumber')}
            onFocus={() => scrollToInput('aadharNumber')}
            {...(restInputProps?.panCardNumber || {})}
          />
          <Spacing size="md" />
          <Text type={'label'}>Aadhar Card</Text>
          <View style={styles.rowSpaceBetween}>
            <ImageUploadButton
              btnLabel={'Click to Upload Front Side Photo'}
              wrapperStyle={styles.halfWidth}
              image={state.aadharFrontPhoto}
              handleImagePick={() => handleFilePicker?.('aadharFrontPhoto')}
              {...(restInputProps?.aadharFrontPhoto || {})}
            />
            <ImageUploadButton
              btnLabel={'Click to Upload Back Side Photo'}
              wrapperStyle={styles.halfWidth}
              image={state.aadharBackphoto}
              handleImagePick={() => handleFilePicker?.('aadharBackphoto')}
              {...(restInputProps?.aadharBackphoto || {})}
            />
          </View>
          <Spacing size="md" />
          <Input
            ref={refs?.aadharNumber}
            placeholder="8752 7580 9001"
            isLeftIconVisible
            leftIconName={images.idCard}
            rightLabel="VERIFY"
            rightLabelColor={theme.colors.primary}
            rightLabelPress={() => Alert.alert('test')}
            onChangeText={value => {
              const sanitizedText = value.replace(/[^0-9]/g, '');
              onChangeAadharNumber?.(sanitizedText);
            }}
            value={state.aadharNumber}
            showStatus
            keyboardType="number-pad"
            maxLength={12}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('applicantName')}
            onFocus={() => scrollToInput('applicantName')}
            {...(restInputProps?.aadharNumber || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.applicantName}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Applicant Name"
            onChangeText={onChangeApplicantName}
            value={state.applicantName}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('mobileNumber')}
            onFocus={() => scrollToInput('mobileNumber')}
            {...(restInputProps?.applicantName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.mobileNumber}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            label="Mobile Number"
            keyboardType="phone-pad"
            onChangeText={onChangemobileNumber}
            value={state.mobileNumber}
            returnKeyType="next"
            maxLength={10}
            onSubmitEditing={() => focusNext('fatherName')}
            onFocus={() => scrollToInput('fatherName')}
            {...(restInputProps?.mobileNumber || {})}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'Gender'}
            options={genderTypes}
            selectedValue={selectedGender}
            onChange={onSelectedGender}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.fatherName}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Father/Mother Name"
            onChangeText={onChangeFatherMotherName}
            value={state.fatherName}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('spouseName')}
            onFocus={() => scrollToInput('spouseName')}
            {...(restInputProps?.fatherName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.spouseName}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Spouse Name"
            onChangeText={onChangeSpouseName}
            value={state.spouseName}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('email')}
            onFocus={() => scrollToInput('email')}
            {...(restInputProps?.spouseName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.email}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.email}
            label="Email Address"
            keyboardType="email-address"
            onChangeText={onChangeEmail}
            value={state.email}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('dob')}
            onFocus={() => scrollToInput('address')}
            {...(restInputProps?.email || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.dob}
            value={state.dob}
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Date Of Birth"
            onChangeText={text => {
              if (!isValidInput(text)) {
                return;
              }
              const formatted = formatInputDate(text);
              onChangeDob?.(formatted);
            }}
            keyboardType="number-pad"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('address')}
            onFocus={() => scrollToInput('dob')}
            {...(restInputProps?.dob || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.address}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Current Address"
            onChangeText={onChangeCurrentAddress}
            value={state.address}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('pincode')}
            onFocus={() => scrollToInput('pincode')}
            {...(restInputProps?.address || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.pincode}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Current Pincode"
            rightLabel={state.currentState}
            onChangeText={onChangeCurrentPincode}
            value={state.pincode}
            returnKeyType="next"
            maxLength={6}
            keyboardType="number-pad"
            onSubmitEditing={() => focusNext('monthlyIncome')}
            onFocus={() => scrollToInput('monthlyIncome')}
            {...(restInputProps?.pincode || {})}
          />
        </GroupWrapper>
        {/* Professional Details */}
        <Spacing size="lg" />
        <GroupWrapper title={'Professional Details'}>
          <Input
            ref={refs?.occupation}
            placeholder="Select Occupation"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            value={occupation}
            isAsDropdown
            isRightIconVisible
            label="Occupation"
            onPress={() => setIsOccupationModalVisible(true)}
            {...(restInputProps?.occupation || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.incomeSource}
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            isAsDropdown
            placeholder={'Select Income Source'}
            isRightIconVisible
            label="Income Source"
            onPress={() => setShowIncomeSourceModal(true)}
            {...(restInputProps?.incomeSource || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.monthlyIncome}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={getDisplayValue(
              editingStates.monthlyIncome,
              state.monthlyIncome,
            )}
            label="Monthly Income"
            onChangeText={value => {
              const sanitizedText = sanitizeAmount(value);
              onChangeMonthlyIncome?.(sanitizedText);
            }}
            keyboardType="decimal-pad"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('accountNumber')}
            onFocus={() => {
              scrollToInput('monthlyIncome');
              setFieldEditing('monthlyIncome', true);
            }}
            onBlur={() => setFieldEditing('monthlyIncome', false)}
            {...(restInputProps?.monthlyIncome || {})}
          />
        </GroupWrapper>
        {/* Bank Details */}
        <Spacing size="lg" />
        <GroupWrapper title={'Bank Details'}>
          <AutocompleteInput
            ref={refs.bankName}
            restProps={{
              label: 'Bank Name',
              isLeftIconVisible: true,
              leftIconName: images.bank,
              returnKeyType: 'next',
              onSubmitEditing: () => focusNext('accountNumber'),
              onFocus: () => scrollToInput('bankName'),
            }}
            onChangeText={onBankNameChange}
            fetchSuggestions={searchBankNameFromAPI}
            onSelectSuggestion={onSelectSuggestion}
            value={restInputProps.bankName?.value || ''}
            suggestionTextKey={'bank'}
            {...(restInputProps.bankName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.accountNumber}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.bank}
            label="Account Number"
            keyboardType="numeric"
            returnKeyType="next"
            value={state.accountNumber}
            onChangeText={value => {
              const sanitizedText = value.replace(/[^0-9]/g, '');
              onChangeAccountNumber?.(sanitizedText);
            }}
            onSubmitEditing={() => focusNext('currentEmi')}
            onFocus={() => scrollToInput('currentEmi')}
            {...(restInputProps?.accountNumber || {})}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'Current Loan?'}
            options={currentLoanTypes}
            selectedValue={state.currentLoan}
            onChange={onSelectedLoanOption}
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            {state.currentLoan && (
              <View style={styles.halfWidth}>
                <Input
                  ref={refs?.currentEmi}
                  placeholder=""
                  isLeftIconVisible
                  leftIconName={images.icRupee}
                  label="Current EMI"
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  onChangeText={onChangeCurrentEMI}
                  value={getDisplayValue(
                    editingStates.currentEmi,
                    state.currentEmi,
                  )}
                  onSubmitEditing={() => focusNext('maxEmiAfford')}
                  onFocus={() => {
                    scrollToInput('currentEmi');
                    setFieldEditing('currentEmi', true);
                  }}
                  onBlur={() => setFieldEditing('currentEmi', false)}
                  {...(restInputProps?.currentEmi || {})}
                />
              </View>
            )}
            <View
              style={state.currentLoan ? styles.halfWidth : styles.fullWidth}>
              <Input
                ref={refs?.maxEmiAfford}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Max EMI Afford"
                keyboardType="decimal-pad"
                value={getDisplayValue(
                  editingStates.maxEmiAfford,
                  state.maxEmiAfford,
                )}
                returnKeyType="next"
                onChangeText={onChangeMaxEMIAfford}
                onSubmitEditing={() => focusNext('avgMonthlyBankBalance')}
                onFocus={() => {
                  scrollToInput('maxEmiAfford');
                  setFieldEditing('maxEmiAfford', true);
                }}
                onBlur={() => setFieldEditing('maxEmiAfford', false)}
                {...(restInputProps?.maxEmiAfford || {})}
              />
            </View>
          </View>
          <Spacing size="md" />
          <Input
            placeholder=""
            ref={refs?.avgMonthlyBankBalance}
            isLeftIconVisible
            leftIconName={images.icRupee}
            label="Average Monthly Bank Balance"
            keyboardType="decimal-pad"
            value={getDisplayValue(
              editingStates.avgMonthlyBankBalance,
              state.avgMonthlyBankBalance,
            )}
            returnKeyType="done"
            onChangeText={onChangeMonthlyBankBalance}
            onSubmitEditing={onNextPress}
            onFocus={() => {
              scrollToInput('avgMonthlyBankBalance');
              setFieldEditing('avgMonthlyBankBalance', true);
            }}
            onBlur={() => setFieldEditing('avgMonthlyBankBalance', false)}
            {...(restInputProps?.avgMonthlyBankBalance || {})}
          />
        </GroupWrapper>
        <FormFooterButtons
          primaryButtonLabel={'Save'}
          // secondaryButtonLabel={strings.next}
          onPressPrimaryButton={onNextPress}
          // onPressSecondaryButton={onNextPress}
          hideSecondaryButton
        />
        <Spacing size={'xl'} />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={isOccupationModalVisible}
        data={occupationOptions}
        selectedItem={occupation}
        onSelect={(item, index) => onSelectedOccupation?.(item)}
        onClose={() => setIsOccupationModalVisible(false)}
        title="Select Occupation Type"
      />

      <DropdownModal
        visible={showIncomeSourceModal}
        data={state.incomeSourceOptions}
        selectedItem={state.incomeSource}
        onSelect={(item, index) => onSelectIncomeSourceOption?.(item)}
        onClose={() => setShowIncomeSourceModal(false)}
        title="Select Income Source Type"
      />

      <DropdownModal
        visible={showBankOptionModal}
        data={state.bankOptions}
        selectedItem={state.bankName?.label}
        onSelect={(item, index) => onSelectBankOption(item, index)}
        onClose={() => setShowBankOptionModal(false)}
        title="Select Bank Type"
      />

      <FilePickerModal {...filePickerProps} autoCloseOnSelect={false} />

      {loading && <Loader visible={loading} />}
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
    // marginTop: theme.sizes.spacing.sm,
    // gap: 12,
  },
  flex: {
    flex: 1,
  },
  halfWidth: {
    width: '47%',
  },
  fullWidth: {
    width: '100%',
  },
});

export default Customer_Personal_Details_Component;
