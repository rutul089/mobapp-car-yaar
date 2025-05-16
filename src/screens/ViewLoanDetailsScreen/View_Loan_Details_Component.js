import {
  CardWrapper,
  DetailInfoCard,
  FinanceCard,
  Header,
  SafeAreaWrapper,
  Spacing,
  theme,
  Button,
  Loader,
} from '@caryaar/components';
import {ScrollView, StyleSheet, View} from 'react-native';

import {goBack} from '../../navigation/NavigationUtils';
import {
  getApplicationGradientColors,
  getGradientColors,
  getGradientColorsLoan,
} from '../../utils/helper';
import {
  applicationStatus,
  getApplicationStatusLabel,
} from '../../constants/enums';

const View_Loan_Details_Component = ({
  customerDetail,
  vehicleDetail,
  onTrackLoanStatusPress,
  onBackToHomePress,
  loanDetail = {},
  handleUploadDocument,
  loading,
  loanOverviewCard = {},
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Loan Application Details"
        onBackPress={() => goBack()}
        hideBorder
      />
      <ScrollView bounces={false} contentContainerStyle={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <CardWrapper
            showLeftText
            isLeftTextBold
            isStatusBold
            status={getApplicationStatusLabel(
              loanOverviewCard?.status,
            )?.toUpperCase()}
            gradientColors={getApplicationGradientColors(
              loanOverviewCard?.status,
            )}
            leftText={loanOverviewCard?.loanApplicationId}>
            <FinanceCard
              bankName={loanOverviewCard?.lenderName}
              interestRate={loanOverviewCard?.interesetRate}
              hideTopMargin
              showCTAButton
              ctaLabel="Track Loan Application"
              footerData={loanOverviewCard.footerInfo}
              // logo={{uri: loanDetail.image}}
              wrapperColor={theme.colors.gray900}
              textColor={theme.colors.white}
              infoValueColor={theme.colors.white}
              infoWrapperColor={'#0E0F11'}
              onCTAPress={onTrackLoanStatusPress}
              showError={
                loanOverviewCard?.status === applicationStatus.REJECTED
              } // 4 is type of hold
              errorMessage={loanOverviewCard?.rejectionReason}
            />
          </CardWrapper>
        </View>
        <View style={{paddingHorizontal: theme.sizes.padding}}>
          <Spacing size="md" />
          <DetailInfoCard
            label={'Customer Details'}
            data={customerDetail}
            isSemiBold={false}
          />
          <Spacing size="md" />
          <DetailInfoCard
            label={'Vehicle Details'}
            data={vehicleDetail}
            isSemiBold={false}
          />
          {loanDetail.type === 4 && (
            <>
              <Spacing size="lg" />
              <Button
                label={'Upload Documents'}
                onPress={handleUploadDocument}
              />
              <Spacing size="lg" />
            </>
          )}
        </View>
      </ScrollView>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: theme.sizes.padding,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  verifiedIcon: {
    height: 95,
    width: 95,
    marginBottom: 20,
  },
  headerWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.padding,
    paddingTop: 12,
  },
});

export default View_Loan_Details_Component;
