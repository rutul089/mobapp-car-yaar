import {
  CardWrapper,
  DetailInfoCard,
  FormFooterButtons,
  Header,
  Loader,
  SafeAreaWrapper,
  VehicleCard,
  theme,
  Spacing,
} from '@caryaar/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings from '../../locales/strings';
import {getGradientColors, getStatusColor} from '../../utils/helper';

const Vehicle_Detail_Component = ({
  onBackPress,
  onSaveDraftPress,
  onNextPress,
  vehicleInfo,
  loading,
  onInfoChange,
  registerNumber,
  make,
  vehicleDetail,
  lastUpdatedOn,
  status,
  isCreatingLoanApplication,
  onPressSecondaryButton,
  carImage,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flexGrow: 1,
        }}>
        <View style={styles.wrapper}>
          <CardWrapper
            showLeftText
            leftText={status}
            statusTextColor={getStatusColor(status)}
            gradientColors={getGradientColors(status)}>
            <VehicleCard
              noMargin
              wrapperColor={theme.colors.gray900}
              customerNameColor={theme.colors.white}
              infoWrapperColor={theme.colors.primaryBlack}
              infoValueColor={theme.colors.white}
              vehicleDetail={vehicleDetail}
              vehicleDetailColor={theme.colors.white}
              brandName={make}
              plateNumber={registerNumber}
              hideFooter={true}
              lastUpdateStatus={`Last updated on ${lastUpdatedOn}`}
              showButton
              buttonLabel={'Refresh Details'} // TODO : On refresh button press call the same api vahan api
              logo={{uri: carImage}}
            />
          </CardWrapper>
        </View>
        <View
          style={{
            padding: theme.sizes.padding,
            backgroundColor: theme.colors.background,
          }}>
          <DetailInfoCard data={vehicleInfo} onChange={onInfoChange} />
          <Spacing size="lg" />
          <FormFooterButtons
            primaryButtonLabel={strings.next}
            secondaryButtonLabel={'Edit'}
            onPressPrimaryButton={onNextPress}
            hideSecondaryButton={!isCreatingLoanApplication}
            onPressSecondaryButton={onPressSecondaryButton}
          />
        </View>
      </ScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.primaryBlack,
    paddingVertical: theme.sizes.spacing.md,
    paddingHorizontal: theme.sizes.padding,
  },
});

export default Vehicle_Detail_Component;
