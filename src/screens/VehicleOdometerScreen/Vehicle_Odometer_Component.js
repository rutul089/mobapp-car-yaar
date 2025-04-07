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
  Card,
} from '../../components';
import strings from '../../locales/strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import theme from '../../theme';
import {View, StyleSheet} from 'react-native';
import images from '../../assets/images';
import DropdownModal from '../../components/DropdownModal';

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
        <Text>{strings.vehicleOdometerReading}</Text>
        <Spacing size="smd" />
        <Card>
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
            value={selectedItem}
            // onPress={selectedVehicleCondition}
            onPress={() => setShowModal(true)}
          />
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

export default Vehicle_Odometer_Component;
