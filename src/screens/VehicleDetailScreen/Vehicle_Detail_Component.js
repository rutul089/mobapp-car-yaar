import {
  CardWrapper,
  DetailInfoCard,
  FormFooterButtons,
  Header,
  Loader,
  SafeAreaWrapper,
  Spacing,
  VehicleCard,
  theme,
  CommonModal,
  Text,
} from '@caryaar/components';
import {ScrollView, StyleSheet, View} from 'react-native';
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
  onRefreshDetailPress,
  ownerShipModalProp,
  hideEditButton,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title={strings.vehicleDetailTitle} onBackPress={onBackPress} />
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.containerWrapper}>
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
              buttonLabel={'Refresh Details'}
              logo={{uri: carImage}}
              onButtonPress={onRefreshDetailPress}
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
            hideSecondaryButton={hideEditButton}
            onPressSecondaryButton={onPressSecondaryButton}
          />
        </View>
      </ScrollView>
      <CommonModal
        isVisible={ownerShipModalProp?.isVisible}
        onModalHide={ownerShipModalProp?.onModalHide}
        primaryButtonLabel={'Ok'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={ownerShipModalProp?.onPressPrimaryButton}
        title="Ownership Changed"
        isCancellable={false}>
        <View style={{paddingVertical: 10}}>
          <Text textAlign="center" lineHeight={22}>
            This vehicle ownership has been updated — it may have been sold.
          </Text>
        </View>
      </CommonModal>

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
  containerWrapper: {
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
});

export default Vehicle_Detail_Component;
