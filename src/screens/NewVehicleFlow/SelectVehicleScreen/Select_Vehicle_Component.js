import {
  Button,
  Card,
  Header,
  images,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {goBack} from '../../../navigation/NavigationUtils';

const Select_Vehicle_Component = ({handleProceedPress}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Select Vehicle"
        rightLabel="!_213"
        onBackPress={() => goBack()}
        showRightContent={true}
      />
      <ScrollView contentContainerStyle={styles.wrapper} bounces={false}>
        <Text>Which car do you want to buy?</Text>
        <Spacing size="md" />
        <Card>
          <Input
            leftIconName={images.usedVehicle}
            label="Make"
            isAsDropdown
            isRightIconVisible
            placeholder="Select"
          />
          <Spacing size="md_lg" />
          <Input
            leftIconName={images.usedVehicle}
            label="Model"
            isAsDropdown
            isRightIconVisible
            placeholder="Select"
          />
          <Spacing size="md_lg" />
          <Input
            leftIconName={images.usedVehicle}
            label="Trim"
            isAsDropdown
            isRightIconVisible
            placeholder="Select"
          />
          <Spacing size="md_lg" />
          <Input
            leftIconName={images.usedVehicle}
            label="Colour"
            isAsDropdown
            isRightIconVisible
            placeholder="Select"
          />
        </Card>
        <Spacing size="xl" />
        <Button label={'Proceed'} onPress={handleProceedPress} />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
});
export default Select_Vehicle_Component;
