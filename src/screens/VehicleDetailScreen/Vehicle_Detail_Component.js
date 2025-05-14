import {
  CardWrapper,
  DetailInfoCard,
  FormFooterButtons,
  Header,
  SafeAreaWrapper,
  VehicleCard,
  theme,
  Loader,
} from '@caryaar/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import strings from '../../locales/strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
}) => {
  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <KeyboardAwareScrollView bounces={false}>
        <View style={styles.wrapper}>
          <CardWrapper
            showLeftText
            leftText={status}
            statusTextColor={'black'}
            // statusColor={getStatusColor(status)}
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
              buttonLabel={'Refresh Details'}
              logo={{uri: ''}}
            />
          </CardWrapper>
        </View>
        <View
          bounces={false}
          style={{
            padding: theme.sizes.padding,
            backgroundColor: theme.colors.background,
          }}>
          <DetailInfoCard data={vehicleInfo} onChange={onInfoChange} />
          <FormFooterButtons
            primaryButtonLabel={strings.next}
            onPressPrimaryButton={onNextPress}
            hideSecondaryButton
          />
        </View>
      </KeyboardAwareScrollView>
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
