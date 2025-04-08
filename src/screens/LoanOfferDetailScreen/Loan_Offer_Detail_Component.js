import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  FinanceCard,
  Header,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import theme from '../../theme';
import images from '../../assets/images';
import CustomizeLoanCard from '../../components/CustomizeLoanCard';

const Loan_Offer_Detail_Component = ({params, onProceedPress}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Loan Offer Details" subtitle="GJ 01 JR 0945" />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <FinanceCard
          statusImg={images.successCheck}
          title={'HDFC Bank'}
          interestRate={'8.96'}
          tenure={'60 Months'}
          emi={'11,093'}
          processingFee={'1,000'}
          noMargin
        />
        <Spacing size="md" />
        <CustomizeLoanCard
          bannerLabel={'Customize Loan Offer'}
          description={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
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
