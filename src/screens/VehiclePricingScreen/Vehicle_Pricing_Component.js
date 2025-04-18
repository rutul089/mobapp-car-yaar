/* eslint-disable react-native/no-inline-styles */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
} from '@caryaar/components';
import strings from '../../locales/strings';

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
      <Header
        title={strings.vehicleDetailTitle}
        onBackPress={onBackPress}
        showRightContent
        rightLabel={'_12312'}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flexGrow: 1,
          padding: theme.sizes.padding,
        }}>
        <GroupWrapper title="Vehicle Pricing">
          <Input
            label={'Estimated Price'}
            isLeftIconVisible
            leftIconName={images.icRupee}
            value={odometerValue}
            onChangeText={handleOdometerChange}
          />
          <Spacing size="md_lg" />
          <Input
            label={'Dealer Valuation Price'}
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
          <TextAreaInput label="Additional Notes" optionalText="(optional)" />
        </GroupWrapper>
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
