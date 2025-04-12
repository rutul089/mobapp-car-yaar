import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import images from '../../assets/images';
import {
  Button,
  FinanceCard,
  Header,
  SafeAreaWrapper,
  Spacing,
} from '../../components';
import CustomizeLoanCard from '../../components/CustomizeLoanCard';
import {goBack} from '../../navigation/NavigationUtils';
import theme from '../../theme';
import {formatIndianNumber} from '../../utils/helper';

const Loan_Offer_Detail_Component = ({
  params,
  onProceedPress,
  onLoanOfferPress,
  loanDetail,
}) => {
  console.log({loanDetail123: loanDetail});
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Loan Offer Details"
        subtitle="GJ 01 JR 0945"
        onBackPress={() => goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <FinanceCard
          // statusImg={images.successCheck}
          bankName={loanDetail.title}
          interestRate={loanDetail.interestRate}
          noMargin
          showRightArrow
          // rightIcon={images.successCheck}
          showBreakdown
          footerData={[
            {label: 'Tenure', value: '60 Month'},
            {label: 'EMI', value: formatIndianNumber('75000.12')},
            {label: 'Processing Fee', value: formatIndianNumber(5000)},
          ]}
          breakdownExpression={'(1.2 x 10,00,000) - 6,00,000 - 10,000 ='}
          breakdownValue={'5,90,000'}
          logo={images.hdfcImg}
        />
        <Spacing size="md" />
        <CustomizeLoanCard
          bannerLabel={'Customize Loan Offer'}
          description={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
          onPress={onLoanOfferPress}
        />
        <Spacing size="xl" />
        <Button label={'Proceed'} onPress={onProceedPress} />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Loan_Offer_Detail_Component;
