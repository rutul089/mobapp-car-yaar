/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Header,
  ImageUploadButton,
  SafeAreaWrapper,
  Text,
  Input,
  Spacing,
  Button,
  AdditionalNotes,
  Card,
} from '../../components';
import strings from '../../locales/strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import theme from '../../theme';
import {View, StyleSheet} from 'react-native';
import images from '../../assets/images';

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
        <View style={styles.buttonRow}>
          <Button
            label={strings.btnSaveDraft}
            variant="link"
            buttonWrapper={styles.button}
            onPress={onSaveDraftPress}
          />
          <Button
            label={strings.next}
            style={styles.button}
            buttonWrapper={styles.button}
            onPress={onNextPress}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    paddingBottom: theme.sizes.spacing.md,
    paddingHorizontal: theme.sizes.padding,
  },
  buttonRow: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4, // Small spacing between buttons
  },
});

export default Vehicle_Pricing_Component;
