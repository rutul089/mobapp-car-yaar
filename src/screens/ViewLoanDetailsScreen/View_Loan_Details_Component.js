import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {
  FinanceCard,
  Header,
  CardWrapper,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import theme from '../../theme';
import DetailInfoCard from '../VehicleDetailScreen/DetailInfoCard';
import {goBack} from '../../navigation/NavigationUtils';

const View_Loan_Details_Component = ({
  params,
  loanDetails,
  customerDetail,
  vehicleDetail,
  partnerDetail,
  onTrackLoanStatusPress,
  onBackToHomePress,
  item,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Loan Application Details" onBackPress={() => goBack()} />
      <ScrollView bounces={false} contentContainerStyle={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <CardWrapper
            status="APPLIED"
            showApplicationNumber={true}
            applicationNumber="849363">
            <FinanceCard
              title={item.title}
              interestRate={item.interestRate}
              isEligible={false}
              noMargin
              isWrapper
              showRightIcon={false}
              showButton
              buttonLabel="Track Loan Application"
              badge={false}
              footerInfo={item.footerInfo}
              showBadge={false}
              logo={{uri: item.image}}
              wrapperColor={theme.colors.gray900}
              textColor={theme.colors.white}
              infoValueColor={theme.colors.white}
              infoWrapperColor={'#0E0F11'}
              onButtonPress={onTrackLoanStatusPress}
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
        </View>
      </ScrollView>
      {/* <KeyboardAwareScrollView style={styles.wrapper}>
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
      </KeyboardAwareScrollView> */}
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
