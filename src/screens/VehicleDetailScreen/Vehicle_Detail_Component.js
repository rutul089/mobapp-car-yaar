import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  Spacing,
} from '../../components';
import strings from '../../locales/strings';
import VehicleCard from './VehicleCard';
import theme from '../../theme';
import DetailInfoCard from './DetailInfoCard';

const Vehicle_Detail_Component = ({
  onBackPress,
  onSaveDraftPress,
  onNextPress,
  vehicleInfo,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <ScrollView bounces={false}>
        <View style={styles.wrapper}>
          <VehicleCard />
        </View>
        <View
          bounces={false}
          style={{
            padding: theme.sizes.padding,
            backgroundColor: theme.colors.background,
          }}>
          <DetailInfoCard data={vehicleInfo} />
          <FormFooterButtons
            primaryButtonLabel={strings.btnSaveDraft}
            secondaryButtonLabel={strings.next}
            onPressPrimaryButton={onSaveDraftPress}
            onPressSecondaryButton={onNextPress}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    paddingVertical: theme.sizes.spacing.md,
    paddingHorizontal: theme.sizes.padding,
  },
});

export default Vehicle_Detail_Component;
