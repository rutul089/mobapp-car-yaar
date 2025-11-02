import {
  AutocompleteInput,
  Card,
  Header,
  images,
  Input,
  Loader,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  DropdownModal,
  GroupWrapper,
  Button,
} from '@caryaar/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  currentLoanTypes,
  fuelTypeOptions,
  vehicleConditionOptions,
} from '../../constants/enums';
import strings from '../../locales/strings';
import {formatDate, formatIndianCurrency} from '../../utils/helper';
import {
  formatInputDate,
  isValidInput,
  sanitizeAmount,
} from '../../utils/inputHelper';
import {useInputRefs} from '../../utils/useInputRefs';
import {CustomDatePickerModal} from '../../components';

const Edit_Vehicle_Detail_Component = ({
  headerProp,
  state,
  onSelectAnswer,
  onNextPress,
  isCreatingLoanApplication,
  loading,
  restInputProps = {},
  onSelectedPuc,
  isEdit,
  setSelectedFuelType,
  selectedFuelType,
  setState,
  handleDateSelection,
  onOwnerNameChange,
  onManufactureYearChange,
  onChassisNumberChange,
  onEngineNumberChange,
  onRegistrationAuthorityChange,
  onEmissionNormChange,
  onVehicleAgeChange,
  onVehicleStatusChange,
  onOwnershipCountChange,
  onMakeChange,
  onModelChange,
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'ownerName',
    'manufactureYear',
    'chassisNumber',
    'engineNumber',
    'registrationDate',
    'registrationAuthority',
    'fuelType',
    'emissionNorm',
    'vehicleAge',
    'vehicleStatus',
    'insuranceValidUpto',
    'fitnessValidUpto',
    'PUCC',
    'ownershipCount',
    'make',
    'model',
  ]);

  const [isFuelTypeModalVisible, setFuelTypeModalVisible] = useState(false);
  //One single modal controller
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerField, setDatePickerField] = useState(null);
  //Compute initial date dynamically based on which field opened the modal
  const getInitialDate = () => {
    if (!datePickerField) {
      return new Date();
    }
    const selectedDate = state?.[datePickerField];
    return selectedDate ? new Date(selectedDate) : new Date();
  };

  //Handle the selected date
  const handleDateConfirm = date => {
    handleDateSelection?.(date.toISOString(), datePickerField);
    setDatePickerVisible(false);
    setDatePickerField(null);
  };

  const today = new Date();
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header {...headerProp} />
      <KeyboardAwareScrollView
        enableOnAndroid
        bounces={false}
        contentContainerStyle={styles.wrapper}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled">
        <GroupWrapper title={'Vehicle Detail'}>
          <Input
            ref={refs?.ownerName}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.user}
            label="Owner Name"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('make')}
            value={state?.ownerName}
            onFocus={() => !isEdit && scrollToInput('make')}
            onChangeText={onOwnerNameChange}
            {...(restInputProps?.ownerName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.make}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Your Car Brand"
            returnKeyType="next"
            value={state?.make}
            onSubmitEditing={() => focusNext('model')}
            onFocus={() => !isEdit && scrollToInput('model')}
            onChangeText={onMakeChange}
            {...(restInputProps?.make || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.model}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Car Model"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('registrationAuthority')}
            onFocus={() => !isEdit && scrollToInput('registrationAuthority')}
            value={state?.model}
            onChangeText={onModelChange}
            {...(restInputProps?.model || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.registrationAuthority}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.locationPin}
            label="Registration Authority"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('manufactureYear')}
            onFocus={() => !isEdit && scrollToInput('manufactureYear')}
            value={state?.registrationAuthority}
            onChangeText={onRegistrationAuthorityChange}
            {...(restInputProps?.registrationAuthority || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.registrationDate}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Registration Date"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('manufactureYear')}
            onFocus={() => !isEdit && scrollToInput('manufactureYear')}
            value={formatDate(state?.registrationDate, 'DD MMM YYYY', '')}
            isAsButton={true}
            isAsDropdown={true}
            onPress={() => {
              setDatePickerField('registrationDate');
              setDatePickerVisible(true);
            }}
            {...(restInputProps?.registrationDate || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.manufactureYear}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Manufacture Year"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('chassisNumber')}
            onFocus={() => !isEdit && scrollToInput('chassisNumber')}
            value={state?.manufactureYear}
            onChangeText={onManufactureYearChange}
            keyboardType="number-pad"
            maxLength={4}
            {...(restInputProps?.manufactureYear || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.chassisNumber}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.idCard}
            label="Chassis Number"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('engineNumber')}
            onFocus={() => !isEdit && scrollToInput('engineNumber')}
            value={state?.chassisNumber}
            onChangeText={onChassisNumberChange}
            maxLength={17}
            {...(restInputProps?.chassisNumber || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.engineNumber}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.idCard}
            label="Engine Number"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('fuelType')}
            onFocus={() => !isEdit && scrollToInput('fuelType')}
            value={state?.engineNumber}
            onChangeText={onEngineNumberChange}
            {...(restInputProps?.engineNumber || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.fuelType}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Fuel Type"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('emissionNorm')}
            onFocus={() => !isEdit && scrollToInput('emissionNorm')}
            isAsDropdown
            isRightIconVisible
            onPress={() => setFuelTypeModalVisible(true)}
            value={state.fuelType}
            {...(restInputProps?.fuelType || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.emissionNorm}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Emission Norm"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('ownershipCount')}
            onFocus={() => !isEdit && scrollToInput('ownershipCount')}
            value={state?.emissionNorm}
            onChangeText={onEmissionNormChange}
            {...(restInputProps?.emissionNorm || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.vehicleAge}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Vehicle Age"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('insuranceValidUpto')}
            onFocus={() => !isEdit && scrollToInput('insuranceValidUpto')}
            value={state?.vehicleAge}
            onChangeText={onVehicleAgeChange}
            {...(restInputProps?.vehicleAge || {})}
          />
          {/* <Spacing size="md" />
          <Input
            ref={refs?.vehicleStatus}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Vehicle Status"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('insuranceValidUpto')}
            onFocus={() => !isEdit && scrollToInput('insuranceValidUpto')}
            value={state?.vehicleStatus}
            {...(restInputProps?.vehicleStatus || {})}
          /> */}
          <Spacing size="md" />
          <Input
            ref={refs?.insuranceValidUpto}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Insurance Valid Upto"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('fitnessValidUpto')}
            onFocus={() => !isEdit && scrollToInput('fitnessValidUpto')}
            value={formatDate(state.insuranceValidUpto, 'DD MMM YYYY', '')}
            isAsButton={true}
            isAsDropdown={true}
            onPress={() => {
              setDatePickerField('insuranceValidUpto');
              setDatePickerVisible(true);
            }}
            {...(restInputProps?.insuranceValidUpto || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.fitnessValidUpto}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.calendar}
            label="Fitness Valid Upto"
            returnKeyType="next"
            onSubmitEditing={() => focusNext('ownershipCount')}
            onFocus={() => !isEdit && scrollToInput('ownershipCount')}
            value={formatDate(state?.fitnessValidUpto, 'DD MMM YYYY', '')}
            isAsButton={true}
            isAsDropdown={true}
            onPress={() => {
              setDatePickerField('fitnessValidUpto');
              setDatePickerVisible(true);
            }}
            {...(restInputProps?.fitnessValidUpto || {})}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'PUC'}
            options={currentLoanTypes}
            selectedValue={state?.PUCC}
            onChange={onSelectedPuc}
          />
          <Spacing size="md" />
          <Input
            ref={refs?.ownershipCount}
            placeholder=""
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            label="Ownership"
            returnKeyType="done"
            value={state?.ownershipCount}
            onChangeText={onOwnershipCountChange}
            keyboardType="number-pad"
            maxLength={2}
            onSubmitEditing={onNextPress}
            {...(restInputProps?.ownershipCount || {})}
          />
          <Spacing size="md" />
        </GroupWrapper>
        <Spacing size="lg" />
        <Button variant="link" onPress={onNextPress} label={strings.next} />
        <Spacing size={theme.sizes.padding + 10} />
      </KeyboardAwareScrollView>

      {loading && <Loader visible={loading} />}

      <DropdownModal
        visible={isFuelTypeModalVisible}
        data={fuelTypeOptions}
        selectedItem={selectedFuelType}
        onSelect={item => setSelectedFuelType?.(item)}
        onClose={() => setFuelTypeModalVisible(false)}
        title="Select Fuel Type"
      />

      <CustomDatePickerModal
        visible={isDatePickerVisible}
        onDismiss={() => {
          setDatePickerVisible(false);
          setDatePickerField(null);
        }}
        onConfirm={handleDateConfirm}
        initialDate={getInitialDate()}
        // restProps={{
        //   validRange: {
        //     startDate: new Date(2000, 0, 1),
        //     endDate: endOfToday, // till today
        //   },
        // }}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    paddingBottom: 0,
    backgroundColor: theme.colors.background,
  },
});

export default Edit_Vehicle_Detail_Component;

//idCard
//usedVehicle
