import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  CardWrapper,
  DetailInfoCard,
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  VehicleCard,
} from '../../components';
import strings from '../../locales/strings';
import theme from '../../theme';

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
          <CardWrapper
            applicationNumber={'DRAFT'}
            status={'PRIVATE'}
            gradientColors={['#FFFFFF', '#FFFFFF']}>
            <VehicleCard
              noMargin
              wrapperColor={theme.colors.gray900}
              customerNameColor={theme.colors.white}
              infoWrapperColor={theme.colors.primaryBlack}
              infoValueColor={theme.colors.white}
              vehicleDetail={'Vitara Brezza | ZDI | 2019 | YL'}
              vehicleDetailColor={theme.colors.white}
              brandName={'Maruti Suzuki'}
              plateNumber={'GJ01 WN 5123'}
              hideFooter={true}
              lastUpdateStatus={'Last updated on 12 Dec 2024, 10:34 AM'}
              showButton
              buttonLabel={'Refresh Details'}
            />
          </CardWrapper>
          {/* <VehicleCard /> */}
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
