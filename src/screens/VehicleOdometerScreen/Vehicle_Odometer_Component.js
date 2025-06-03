/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  DropdownModal,
  FilePickerModal,
  GroupWrapper,
  Header,
  images,
  ImageUploadButton,
  Input,
  Loader,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {FullLoader} from '../../components';

const Vehicle_Odometer_Component = ({
  params,
  onBackPress,
  handleOdometerImageSelect,
  odometerImage,
  selectedVehicleCondition,
  onSaveDraftPress,
  onNextPress,
  odometerReading,
  handleOdometerChange,
  fileModalProps,
  vehicleConditions,
  selectVehicleConditionOption,
  vehicleCondition,
  restInputProps,
  loading,
  onDeletePress,
  viewImage,
  isLoading,
}) => {
  const [showModal, setShowModal] = React.useState(false);

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
            onDeletePress={onDeletePress}
            viewImage={viewImage}
          />
          <Spacing size="md_lg" />
          <Input
            label={strings.odometerReading}
            isLeftIconVisible
            leftIconName={images.icOdometer}
            rightLabel={'KM'}
            value={odometerReading}
            onChangeText={handleOdometerChange}
            keyboardType="decimal-pad"
            returnKeyType="next"
            {...(restInputProps?.odometerReading || {})}
          />
          <Spacing size="md_lg" />
          <Input
            label={strings.vehicleCondition}
            isLeftIconVisible
            leftIconName={images.usedVehicle}
            isAsDropdown
            isRightIconVisible
            value={vehicleCondition}
            onPress={() => setShowModal(true)}
            {...(restInputProps?.vehicleCondition || {})}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button label={strings.next} variant="link" onPress={onNextPress} />
        {/* <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={onSaveDraftPress}
          onPressSecondaryButton={onNextPress}
        /> */}
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={vehicleConditions}
        selectedItem={vehicleCondition}
        onSelect={item => selectVehicleConditionOption?.(item)}
        onClose={() => setShowModal(false)}
        title="Select Vehicle Type"
      />

      <FilePickerModal
        isVisible={fileModalProps?.showFilePicker}
        onSelect={fileModalProps?.handleFile}
        onClose={fileModalProps?.closeFilePicker}
        autoCloseOnSelect={false}
        options={[
          {label: 'Camera', value: 'camera', icon: images.file_camera},
          {label: 'Photo Gallery', value: 'gallery', icon: images.file_gallery},
        ]}
      />
      {loading && <Loader visible={loading} />}
      {isLoading && <FullLoader />}
    </SafeAreaWrapper>
  );
};

export default Vehicle_Odometer_Component;
