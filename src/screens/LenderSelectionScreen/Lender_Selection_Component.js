import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  FinanceCard,
  Header,
  SafeAreaWrapper,
  Text,
  images,
  theme,
  Loader,
} from '@caryaar/components';

import {goBack} from '../../navigation/NavigationUtils';
import {formatIndianCurrency} from '../../utils/helper';

const Lender_Selection_Component = ({
  params,
  onItemPress = () => {},
  loading,
  loanApplicationId,
  registerNumber,
}) => {
  const financeData = [
    {
      title: 'Fortune Finance',
      logo: images.hdfcImg,

      interestRate: '8',
      tenure: '60',
      emi: '11,093',
      processingFee: '1,000',
      badge: 1,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: '60 Month'},
        {label: 'EMI', value: formatIndianCurrency('75000.12')},
        {label: 'Processing Fee', value: formatIndianCurrency(5000)},
      ],
    },
    {
      title: 'Speed Loans',
      logo: images.hdfcImg,
      interestRate: '8',
      tenure: '48',
      emi: '12,420',
      processingFee: '1,250',
      badge: 2,
      showBadge: true,
      showNewBreakDown: true,
      isEligibleForBT: true,
      footerInfo: [
        {label: 'Tenure', value: '60 Month'},
        {label: 'EMI', value: formatIndianCurrency('75000.12')},
        {label: 'Processing Fee', value: formatIndianCurrency(5000)},
      ],
    },
    {
      title: 'HDB Financial Services',
      interestRate: '8',
      tenure: '48',
      emi: '12,420',
      processingFee: '1,250',
      badge: 4,
      showBadge: true,
      logo: images.hdfcImg,
      footerInfo: [
        {label: 'Tenure', value: '60 Month'},
        {label: 'EMI', value: formatIndianCurrency('75000.12')},
        {label: 'Processing Fee', value: formatIndianCurrency(5000)},
      ],
    },
    {
      logo: images.hdfcImg,
      title: 'HDB Financial Services',
      interestRate: '8',
      tenure: '48',
      emi: '12,420',
      processingFee: '1,250',
      badge: 3,
      showBadge: true,
      showNewBreakDown: true,
      footerInfo: [
        {label: 'Tenure', value: '60 Month'},
        {label: 'EMI', value: formatIndianCurrency('75000')},
        {label: 'Processing Fee', value: formatIndianCurrency(5000)},
      ],
    },
  ];

  const renderItem = ({item}) => (
    <FinanceCard
      bankName={item.title}
      interestRate={item.interestRate}
      showRightArrow
      logo={item.logo}
      showBadge={item.badge}
      badgeLevel={item.badge}
      footerData={item.footerInfo}
      onItemPress={() => onItemPress(item)}
      showBreakdown={item.showNewBreakDown}
      breakdownExpression={'(1.2 × 10,00,000) - 6,00,000 - 10,000'}
      breakdownValue={1.2 * 1000000 - 600000 - 10000}
      onPress={() => onItemPress(item)}
      isEligibleForBT={item.isEligibleForBT}
    />
  );

  return (
    <SafeAreaWrapper>
      <Header
        title="Lender Selection"
        subtitle={registerNumber}
        onBackPress={() => goBack()}
      />
      <FlatList
        data={financeData}
        bounces={true}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text>
            Tailored Loans for{' '}
            <Text color={'#F8A902'} hankenGroteskBold>
              {loanApplicationId}
            </Text>
          </Text>
        }
      />
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Lender_Selection_Component;
