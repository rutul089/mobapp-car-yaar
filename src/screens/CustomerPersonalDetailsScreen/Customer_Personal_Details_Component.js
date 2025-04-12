import React, {useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Card,
  Header,
  ImageUploadButton,
  Input,
  RadioBlock,
  SafeAreaWrapper,
  Spacing,
  Text,
  DropdownModal,
  Button,
  FormFooterButtons,
  RadioGroupRow,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import theme from '../../theme';
import images from '../../assets/images';
import {gender} from '../../constants/enums';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';

const Section = ({title, children}) => {
  return (
    <View>
      <Text>{title}</Text>
      <Spacing size="smd" />
      <Card>{children}</Card>
    </View>
  );
};

const Customer_Personal_Details_Component = ({
  selectedGender,
  onSelectedGender = () => {},
  genderOptions,
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
}) => {
  const [errors, setErrors] = React.useState({});

  const refs = {
    panCard: useRef(null),
    aadhar: useRef(null),
    applicant: useRef(null),
    mobile: useRef(null),
    fatherMother: useRef(null),
    spouse: useRef(null),
    email: useRef(null),
    dob: useRef(null),
    address: useRef(null),
    pincode: useRef(null),
    monthlyIncome: useRef(null),
    accountNumber: useRef(null),
    currentEMI: useRef(null),
    maxEMIAfford: useRef(null),
    monthlyBankBalance: useRef(null),
  };

  const focusNext = key => {
    refs[key]?.current?.focus();
  };

  const [isOccupationModalVisible, setIsOccupationModalVisible] =
    React.useState(false);
  const [showIncomeSourceModal, setShowIncomeSourceModal] =
    React.useState(false);
  const [showBankOptionModal, setShowBankOptionModal] = React.useState(false);

  const validateFields = () => {
    const errors = {};

    // PERSONAL DETAILS
    if (!state.panCardNumber?.trim()) {
      errors.panCardNumber = 'PAN card number is required';
    }

    if (!/^\d{12}$/.test(state.aadharNumber)) {
      errors.aadharNumber = 'Aadhar number must be 12 digits';
    }

    if (!state.applicantName?.trim()) {
      errors.applicantName = 'Applicant name is required';
    }

    if (!/^\d{10}$/.test(state.mobileNumber)) {
      errors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }

    if (!state.fatherMotherName?.trim()) {
      errors.fatherMotherName = 'This field is required';
    }

    // Spouse name is optional

    if (state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errors.email = 'Enter a valid email';
    }

    if (!state.dob) {
      errors.dob = 'Date of birth is required';
    }

    if (!state.currentAddress?.trim()) {
      errors.currentAddress = 'Address is required';
    }

    if (!/^\d{6}$/.test(state.currentPincode)) {
      errors.currentPincode = 'Enter a valid 6-digit pincode';
    }

    if (!selectedGender) {
      errors.gender = 'Please select gender';
    }

    // PROFESSIONAL DETAILS
    if (!state.occupation?.label) {
      errors.occupation = 'Occupation is required';
    }

    if (!state.incomeSource?.label) {
      errors.incomeSource = 'Income source is required';
    }

    if (!state.monthlyIncome || isNaN(state.monthlyIncome)) {
      errors.monthlyIncome = 'Enter a valid monthly income';
    }

    // BANK DETAILS
    if (!state.bankName?.label) {
      errors.bankName = 'Bank name is required';
    }

    if (!state.accountNumber || state.accountNumber.length < 6) {
      errors.accountNumber = 'Enter a valid account number';
    }

    if (
      state.currentEMI &&
      (isNaN(state.currentEMI) || Number(state.currentEMI) < 0)
    ) {
      errors.currentEMI = 'Enter a valid EMI amount';
    }

    if (
      !state.maxEMIAfford ||
      isNaN(state.maxEMIAfford) ||
      Number(state.maxEMIAfford) <= 0
    ) {
      errors.maxEMIAfford = 'Enter max EMI you can afford';
    }

    if (
      !state.monthlyBankBalance ||
      isNaN(state.monthlyBankBalance) ||
      Number(state.monthlyBankBalance) <= 0
    ) {
      errors.monthlyBankBalance = 'Enter valid bank balance';
    }

    return errors;
  };

  const handleNext = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // No errors, continue
    onNextPress();
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Customer Details"
        subtitle="GJ 01 JR 0945"
        rightLabel="#ABC123213"
        showRightContent
        onBackPress={() => goBack()}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={100} // adjust if needed
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={styles.wrapper}>
        {/* Personal Details */}
        <Section title={'Personal Details'}>
          <ImageUploadButton
            label={'Applicant Photo'}
            btnLabel={'Click to Upload Photo'}
          />
          <Spacing size="md" />
          <ImageUploadButton
            label={'Pan Card'}
            btnLabel={'Click to Upload PAN Card Photo'}
          />
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.idCard}
            onChangeText={onChangePanCardNumber}
            value={state.panCardNumber}
            returnKeyType="next"
            ref={refs.panCard}
          />
          <Spacing size="md" />
          <Text type={'label'}>Aadhar Card</Text>
          <View style={styles.rowSpaceBetween}>
            <ImageUploadButton
              btnLabel={'Click to Upload Front Side Photo'}
              wrapperStyle={styles.flex}
            />
            <ImageUploadButton
              btnLabel={'Click to Upload Back Side Photo'}
              wrapperStyle={styles.flex}
            />
          </View>
          <Spacing size="md" />
          <Input
            ref={refs.aadhar}
            placeholder="8752 7580 9001"
            isLeftIconVisible
            leftIconName={images.idCard}
            rightLabel="VERIFY"
            rightLabelColor={theme.colors.primary}
            rightLabelPress={() => Alert.alert('test')}
            onChangeText={onChangeAadharNumber}
            value={state.aadharNumber}
            returnKeyType="next"
            isError={!!errors.aadharNumber}
            showStatus
            statusMsg={errors.aadharNumber}
          />
          <Spacing size="md" />
          <Input
            ref={refs.applicant}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Applicant Name"
            onChangeText={onChangeApplicantName}
            value={state.applicantName}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('mobile')}
          />
          <Spacing size="md" />
          <Input
            ref={refs.mobile}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            label="Mobile Number"
            keyboardType="phone-pad"
            onChangeText={onChangemobileNumber}
            value={state.mobileNumber}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('fatherMother')}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'Gender'}
            options={genderOptions}
            selectedValue={selectedGender}
            onChange={onSelectedGender}
          />
          <Spacing size="md" />
          <Input
            ref={refs.fatherMother}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Father/Mother Name"
            onChangeText={onChangeFatherMotherName}
            value={state.fatherMotherName}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('spouse')}
          />
          <Spacing size="md" />
          <Input
            ref={refs.spouse}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Spouse Name"
            onChangeText={onChangeSpouseName}
            value={state.spouseName}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('email')}
          />
          <Spacing size="md" />
          <Input
            ref={refs.email}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.email}
            label="Email Address"
            keyboardType="email-address"
            onChangeText={onChangeEmail}
            value={state.email}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('address')}
          />
          <Spacing size="md" />
          <Input
            value={state.dob}
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Date Of Birth"
            isAsDropdown
            onPress={onChangeDob}
          />
          <Spacing size="md" />
          <Input
            ref={refs.address}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Current Address"
            onChangeText={onChangeCurrentAddress}
            value={state.currentAddress}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('pincode')}
          />
          <Spacing size="md" />
          <Input
            ref={refs.pincode}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Current Pincode"
            rightLabel={state.currentState}
            onChangeText={onChangeCurrentPincode}
            value={state.currentPincode}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('monthlyIncome')}
          />
        </Section>
        {/* Professional Details */}
        <Spacing size="lg" />
        <Section title={'Professional Details'}>
          <Input
            placeholder="Select Occupation"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            value={state.occupation?.label}
            isAsDropdown
            isRightIconVisible
            label="Occupation"
            onPress={() => setIsOccupationModalVisible(true)}
          />
          <Spacing size="md" />
          <Input
            placeholder="Select Income Source"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            value={state.incomeSource?.label}
            isAsDropdown
            isRightIconVisible
            label="Income Source"
            onPress={() => setShowIncomeSourceModal(true)}
          />
          <Spacing size="md" />
          <Input
            ref={refs.monthlyIncome}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={state.monthlyIncome}
            label="Monthly Income"
            onChangeText={onChangeMonthlyIncome}
            keyboardType="decimal-pad"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('accountNumber')}
          />
        </Section>
        {/* Bank Details */}
        <Spacing size="lg" />
        <Section title={'Bank Details'}>
          <Input
            placeholder="Select Bank Option"
            isLeftIconVisible
            leftIconName={images.bank}
            isAsDropdown
            isRightIconVisible
            label="Bank Name"
            value={state.bankName?.label}
            onPress={() => setShowBankOptionModal(true)}
          />
          <Spacing size="md" />
          <Input
            ref={refs.accountNumber}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.bank}
            label="Account Number"
            keyboardType="numeric"
            returnKeyType="next"
            value={state.accountNumber}
            onSubmitEditing={() => focusNext('currentEMI')}
            onChangeText={onChangeAccountNumber}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'Current Loan?'}
            options={currentLoanOptions}
            selectedValue={state.selectedLoanOption}
            onChange={onSelectedLoanOption}
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
              <Input
                ref={refs.currentEMI}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Current EMI"
                keyboardType="decimal-pad"
                value={state.currentEMI}
                returnKeyType="next"
                onSubmitEditing={() => focusNext('maxEMIAfford')}
                onChangeText={onChangeCurrentEMI}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                ref={refs.maxEMIAfford}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Max EMI Afford"
                keyboardType="decimal-pad"
                value={state.maxEMIAfford}
                returnKeyType="next"
                onSubmitEditing={() => focusNext('monthlyBankBalance')}
                onChangeText={onChangeMaxEMIAfford}
              />
            </View>
          </View>
          <Spacing size="md" />
          <Input
            placeholder=""
            ref={refs.monthlyBankBalance}
            isLeftIconVisible
            leftIconName={images.icRupee}
            label="Average Monthly Bank Balance"
            keyboardType="decimal-pad"
            value={state.monthlyBankBalance}
            returnKeyType="done"
            onSubmitEditing={onNextPress}
            onChangeText={onChangeMonthlyBankBalance}
            isError
          />
        </Section>
        <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={saveAsDraftPress}
          onPressSecondaryButton={onNextPress}
        />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={isOccupationModalVisible}
        data={state.occupationOptions}
        selectedItem={state.occupation?.label}
        onSelect={(item, index) => onSelectedOccupation(item, index)}
        onClose={() => setIsOccupationModalVisible(false)}
        title="Select Occupation Type"
      />

      <DropdownModal
        visible={showIncomeSourceModal}
        data={state.incomeSourceOptions}
        selectedItem={state.incomeSource?.label}
        onSelect={(item, index) => onSelectIncomeSourceOption(item, index)}
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

export default Customer_Personal_Details_Component;
