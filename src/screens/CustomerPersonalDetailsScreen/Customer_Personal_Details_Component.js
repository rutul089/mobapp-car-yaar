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
  onChangeDob,
  currentLoanOptions,
  onSelectedLoanOption = () => {},
  onSelectedOccupation = () => {},
  onSelectIncomeSourceOption = () => {},
  onSelectBankOption = () => {},
  onNextPress,
  saveAsDraftPress,
}) => {
  const aadharRef = useRef(null);
  const applicantRef = useRef(null);
  const mobileRef = useRef(null);
  const fatherMotherRef = useRef(null);
  const spouseRef = useRef(null);
  const emailRef = useRef(null);
  const dobRef = useRef(null);
  const addressRef = useRef(null);
  const pincodeRef = useRef(null);

  const [isOccupationModalVisible, setIsOccupationModalVisible] =
    React.useState(false);
  const [showIncomeSourceModal, setShowIncomeSourceModal] =
    React.useState(false);
  const [showBankOptionModal, setShowBankOptionModal] = React.useState(false);

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
            placeholder="8752 7580 9001"
            isLeftIconVisible
            leftIconName={images.idCard}
            rightLabel="VERIFY"
            rightLabelColor={theme.colors.primary}
            rightLabelPress={() => Alert.alert('test')}
            onChangeText={onChangeAadharNumber}
            value={state.aadharNumber}
            returnKeyType="next"
          />
          <Spacing size="md" />
          <Input
            ref={applicantRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Applicant Name"
            onChangeText={onChangeApplicantName}
            value={state.applicantName}
            returnKeyType="next"
            onSubmitEditing={() => mobileRef.current.focus()}
          />
          <Spacing size="md" />
          <Input
            ref={mobileRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.callOutline}
            label="Mobile Number"
            keyboardType="phone-pad"
            onChangeText={onChangemobileNumber}
            value={state.mobileNumber}
            returnKeyType="next"
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
            ref={fatherMotherRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Father/Mother Name"
            onChangeText={onChangeFatherMotherName}
            value={state.fatherMotherName}
            returnKeyType="next"
            onSubmitEditing={() => spouseRef?.current.focus()}
          />
          <Spacing size="md" />
          <Input
            ref={spouseRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Spouse Name"
            onChangeText={onChangeSpouseName}
            value={state.spouseName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <Spacing size="md" />
          <Input
            ref={emailRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.email}
            label="Email Address"
            keyboardType="email-address"
            onChangeText={onChangeEmail}
            value={state.email}
            returnKeyType="next"
            onSubmitEditing={() => addressRef.current.focus()}
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
            ref={addressRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Current Address"
            onChangeText={onChangeCurrentAddress}
            value={state.currentAddress}
            returnKeyType="next"
            onSubmitEditing={() => pincodeRef.current.focus()}
          />
          <Spacing size="md" />
          <Input
            ref={pincodeRef}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Current Pincode"
            rightLabel={state.currentState}
            onChangeText={onChangeCurrentPincode}
            value={state.currentPincode}
            returnKeyType="next"
          />
        </Section>
        {/* Professional Details */}
        <Spacing size="lg" />
        <Section title={'Personal Details'}>
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
            placeholder=""
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={state.panCardNumber}
            label="Monthly Income"
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
            placeholder=""
            isLeftIconVisible
            leftIconName={images.bank}
            label="Account Number"
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
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Current EMI"
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Max EMI Afford"
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>
          <Spacing size="md" />
          <Input
            placeholder=""
            isLeftIconVisible
            leftIconName={images.icRupee}
            label="Average Monthly Bank Balance"
            keyboardType="numbers-and-punctuation"
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
