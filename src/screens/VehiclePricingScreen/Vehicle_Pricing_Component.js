/* eslint-disable react-native/no-inline-styles */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

import {
  FormFooterButtons,
  GroupWrapper,
  Header,
  ImageUploadButton,
  Input,
  SafeAreaWrapper,
  Spacing,
  TextAreaInput,
  theme,
  images,
  Loader,
  FilePickerModal,
} from '@caryaar/components';
import strings from '../../locales/strings';
import {formatIndianCurrency} from '../../utils/helper';
import {FullLoader} from '../../components';
import {sanitizeAmount} from '../../utils/inputHelper';

const Vehicle_Pricing_Component = ({
  params,
  onBackPress,
  handleOdometerImageSelect,
  odometerImage,
  selectedVehicleCondition,
  onSaveDraftPress,
  onNextPress,
  handleOdometerChange,
  onChangeEstimatedPrice,
  onChangeSalePrice,
  onChangeTrueValuePrice,
  onChangeAdditionalNotes,
  restInputProps = {},
  state,
  loading,
  uploadValueReport,
  fileModalProps,
  onDeletePress,
  viewImage,
  isLoading,
}) => {
  const [editingStates, setEditingStates] = React.useState({
    estimatedPrice: false,
    salePrice: false,
    trueValuePrice: false,
  });

  const setFieldEditing = (field, value) => {
    setEditingStates(prev => ({...prev, [field]: value}));
  };

  const refs = {
    estimatedPrice: React.useRef(null),
    salePrice: React.useRef(null),
    trueValuePrice: React.useRef(null),
    additionalNotes: React.useRef(null),
  };

  const focusNext = key => {
    refs[key]?.current?.focus();
  };

  const handleNumericChange = setter => text => {
    const sanitizedText = sanitizeAmount(text);
    setter?.(sanitizedText);
  };

  const getDisplayValue = (isEditing, value) => {
    return formatIndianCurrency(value, false, true);
  };

  return (
    <SafeAreaWrapper>
      <Header
        title={strings.vehicleDetailTitle}
        onBackPress={onBackPress}
        showRightContent
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={100}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flexGrow: 1,
          padding: theme.sizes.padding,
          paddingBottom: theme.sizes.padding,
        }}>
        <GroupWrapper title="Vehicle Pricing">
          <Input
            ref={refs.estimatedPrice}
            label={'Estimated Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            onChangeText={handleNumericChange(onChangeEstimatedPrice)}
            value={getDisplayValue(
              editingStates.estimatedPrice,
              state.estimatedPrice,
            )}
            keyboardType="number-pad"
            onFocus={() => setFieldEditing('estimatedPrice', true)}
            onBlur={() => setFieldEditing('estimatedPrice', false)}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('salePrice')}
            {...(restInputProps?.estimatedPrice || {})}
          />
          <Spacing size="md_lg" />
          <Input
            ref={refs.salePrice}
            label={'Dealer Valuation Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            onChangeText={handleNumericChange(onChangeSalePrice)}
            value={getDisplayValue(editingStates.salePrice, state.salePrice)}
            keyboardType="number-pad"
            onFocus={() => setFieldEditing('salePrice', true)}
            onBlur={() => setFieldEditing('salePrice', false)}
            returnKeyType="next"
            onSubmitEditing={() => focusNext('trueValuePrice')}
            {...(restInputProps?.salePrice || {})}
          />
          <Spacing size="md_lg" />
          <Input
            ref={refs.trueValuePrice}
            label={'True Value Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            onChangeText={handleNumericChange(onChangeTrueValuePrice)}
            value={getDisplayValue(
              editingStates.trueValuePrice,
              state.trueValuePrice,
            )}
            keyboardType="number-pad"
            onFocus={() => setFieldEditing('trueValuePrice', true)}
            onBlur={() => setFieldEditing('trueValuePrice', false)}
            returnKeyType="next"
            // onSubmitEditing={() => focusNext('additionalNotes')}
            {...(restInputProps?.trueValuePrice || {})}
          />
          <Spacing size="md_lg" />
          <ImageUploadButton
            image={state.valueReportUrl}
            handleImagePick={handleOdometerImageSelect}
            btnLabel={'Click to Upload Value Report PDF'}
            label={'Value Report'}
            onDeletePress={onDeletePress}
            viewImage={viewImage}
          />
          <Spacing size="md_lg" />
          <TextAreaInput
            label="Additional Notes"
            optionalText="(optional)"
            value={state.additionalNotes}
            onChangeText={onChangeAdditionalNotes}
            returnKeyType="done"
            onSubmitEditing={onNextPress}
            placeholderTextColor={'#82828299'}
          />
        </GroupWrapper>
        <Spacing size="lg" />
        <FormFooterButtons
          primaryButtonLabel={strings.next}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={onNextPress}
          onPressSecondaryButton={onNextPress}
          hideSecondaryButton
        />
      </KeyboardAwareScrollView>

      <FilePickerModal
        isVisible={fileModalProps?.showFilePicker}
        onSelect={fileModalProps?.handleFile}
        onClose={fileModalProps?.closeFilePicker}
        autoCloseOnSelect={false}
        options={[
          {label: 'Camera', value: 'camera', icon: images.file_camera},
          {label: 'Documents', value: 'document', icon: images.file_documents},
        ]}
      />

      {loading && <Loader visible={loading} />}
      {isLoading && <FullLoader visible={isLoading} />}
    </SafeAreaWrapper>
  );
};

export default Vehicle_Pricing_Component;
