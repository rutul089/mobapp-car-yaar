/* eslint-disable react-native/no-inline-styles */
import {
  DropdownModal,
  FormFooterButtons,
  GroupWrapper,
  Header,
  ImageUploadButton,
  Input,
  SafeAreaWrapper,
  Spacing,
  theme,
  images,
} from '@caryaar/components';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';

const dropdownOptions = [
  {label: 'Option A', value: 'a'},
  {label: 'Option B', value: 'b'},
  {label: 'Option C', value: 'c'},
];

const Vehicle_Odometer_Component = ({
  params,
  onBackPress,
  handleOdometerImageSelect,
  odometerImage,
  selectedVehicleCondition,
  onSaveDraftPress,
  onNextPress,
  odometerValue,
  handleOdometerChange,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');

  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flex: 1,
          padding: theme.sizes.padding,
        }}>
        <GroupWrapper title={strings.vehicleOdometerReading}>
          <ImageUploadButton
            label={strings.uploadOdometerReadingImage}
            btnLabel={strings.clickToCaptureOrUploadImage}
            image={odometerImage}
            handleImagePick={handleOdometerImageSelect}
          />
          <Spacing size="md_lg" />
          <Input
            label={strings.odometerReading}
            isLeftIconVisible
            leftIconName={images.icOdometer}
            rightLabel={'KM'}
            value={odometerValue}
            onChangeText={handleOdometerChange}
            keyboardType="decimal-pad"
          />
          <Spacing size="md_lg" />
          <Input
            label={strings.vehicleCondition}
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            isAsDropdown
            isRightIconVisible
            value={selectedItem}
            // onPress={selectedVehicleCondition}
            onPress={() => setShowModal(true)}
          />
        </GroupWrapper>
        <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={onSaveDraftPress}
          onPressSecondaryButton={onNextPress}
        />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={dropdownOptions}
        selectedItem={selectedItem}
        onSelect={item => setSelectedItem(item.label)}
        onClose={() => setShowModal(false)}
        title="Select Other Document Type"
      />
    </SafeAreaWrapper>
  );
};

export default Vehicle_Odometer_Component;
