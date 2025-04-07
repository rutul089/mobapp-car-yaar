/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {
  AdditionalNotes,
  Card,
  FormFooterButtons,
  Header,
  ImageUploadButton,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import strings from '../../locales/strings';
import theme from '../../theme';

const Vehicle_Pricing_Component = ({
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
  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flexGrow: 1,
          padding: theme.sizes.padding,
        }}>
        <Text>{'Vehicle Pricing'}</Text>
        <Spacing size="smd" />
        <Card>
          <Input
            label={'Estimated Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={odometerValue}
            onChangeText={handleOdometerChange}
          />
          <Spacing size="md_lg" />
          <Input
            label={'Sale Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={odometerValue}
            onChangeText={handleOdometerChange}
          />
          <Spacing size="md_lg" />
          <Input
            label={'True Value Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={odometerValue}
            onChangeText={handleOdometerChange}
          />
          <Spacing size="sm" />
          <ImageUploadButton
            image={odometerImage}
            handleImagePick={handleOdometerImageSelect}
            btnLabel={'Click to Upload Value Report PDF'}
          />
          <Spacing size="md_lg" />
          <AdditionalNotes />
        </Card>
        <FormFooterButtons
          primaryButtonLabel={strings.btnSaveDraft}
          secondaryButtonLabel={strings.next}
          onPressPrimaryButton={onSaveDraftPress}
          onPressSecondaryButton={onNextPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

export default Vehicle_Pricing_Component;
