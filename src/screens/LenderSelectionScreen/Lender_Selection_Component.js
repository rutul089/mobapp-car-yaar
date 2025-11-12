import {
  FinanceCard,
  Header,
  Loader,
  SafeAreaWrapper,
  Text,
  images,
  theme,
  PaginationFooter,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {goBack} from '../../navigation/NavigationUtils';
import {formatIndianCurrency} from '../../utils/helper';
import {NoDataFound} from '../../components';
import {API_TRIGGER} from '../../constants/enums';

const Lender_Selection_Component = ({
  params,
  onItemPress = () => {},
  loading,
  loanApplicationId,
  registerNumber,
  tenure,
  interestRate,
  processingFee,
  lenders,
  handleLoadMore,
  onRefresh,
  refreshing,
  apiTrigger,
  currentPage,
  totalPages,
}) => {
  const financeData = [
    {
      title: 'Fortune Finance',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/HDFC_Bank_Logo.svg',
      interestRate: interestRate,
      tenure: tenure,
      emi: '11,093',
      processingFee: '5000',
      badge: 1,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('75000.12')},
        {label: 'Processing Fee', value: formatIndianCurrency(5000)},
      ],
    },
    {
      title: 'Speed Loans',
      logo: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Axis_Bank_logo.svg',
      interestRate: interestRate,
      tenure: tenure,
      emi: '12,420',
      processingFee: '4500',
      badge: 2,
      showBadge: true,
      showNewBreakDown: true,
      isEligibleForBT: false,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('75500.55')},
        {label: 'Processing Fee', value: formatIndianCurrency(4500)},
      ],
    },
    {
      title: 'HDB Financial Services',
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/9b/HDB_Financial_Services_logo.png',
      interestRate: interestRate,
      tenure: tenure,
      emi: '12,420',
      processingFee: '2500',
      badge: 3,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('78000.10')},
        {label: 'Processing Fee', value: formatIndianCurrency(2500)},
      ],
    },
    {
      title: 'Muthoot Finance',
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Muthoot_Finance_logo.png',
      interestRate: interestRate,
      tenure: tenure,
      emi: '10,875',
      processingFee: '3000',
      badge: 4,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('71000.25')},
        {label: 'Processing Fee', value: formatIndianCurrency(3000)},
      ],
    },
    {
      title: 'Hero FinCorp',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Hero_FinCorp_logo.png',
      interestRate: interestRate,
      tenure: tenure,
      emi: '11,765',
      processingFee: '1000',
      badge: 5,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('73500.30')},
        {label: 'Processing Fee', value: formatIndianCurrency(1000)},
      ],
    },
    {
      title: 'Tata Capital',
      logo: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tata_Capital_logo.svg',
      interestRate: interestRate,
      tenure: tenure,
      emi: '12,032',
      processingFee: '6000',
      badge: 6,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('76890.42')},
        {label: 'Processing Fee', value: formatIndianCurrency(6000)},
      ],
    },
    {
      title: 'ICICI Bank Loans',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/4b/ICICI_Bank_Logo.svg',
      interestRate: interestRate,
      tenure: tenure,
      emi: '11,230',
      processingFee: '2000',
      badge: 7,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('74000.00')},
        {label: 'Processing Fee', value: formatIndianCurrency(2000)},
      ],
    },
    {
      title: 'Bajaj Finance',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/59/Bajaj_Finserv_Logo.svg',
      interestRate: interestRate,
      tenure: tenure,
      emi: '10,995',
      processingFee: '1500',
      badge: 8,
      showBadge: true,
      showNewBreakDown: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('72500.77')},
        {label: 'Processing Fee', value: formatIndianCurrency(1500)},
      ],
    },
    {
      title: 'Shriram Finance',
      logo: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Shriram_Finance_logo.png',
      interestRate: interestRate,
      tenure: tenure,
      emi: '11,675',
      processingFee: '3000',
      badge: 9,
      showBadge: true,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('74800.15')},
        {label: 'Processing Fee', value: formatIndianCurrency(3000)},
      ],
    },
    {
      title: 'IndusInd Loans',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/IndusInd_Bank_Logo.svg',
      interestRate: interestRate,
      tenure: tenure,
      emi: '12,005',
      processingFee: '4000',
      badge: 10,
      showBadge: true,
      showNewBreakDown: true,
      isEligibleForBT: false,
      footerInfo: [
        {label: 'Tenure', value: `${tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency('76200.90')},
        {label: 'Processing Fee', value: formatIndianCurrency(4000)},
      ],
    },
  ];

  const renderItem = ({item}) => (
    <FinanceCard
      bankName={item.lenderName}
      interestRate={item.interestRate || 8}
      showRightArrow
      logo={images.hdfcImg}
      showBadge={item.badge}
      badgeLevel={item.badge}
      footerData={[
        {label: 'Tenure', value: `${item?.tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency(item?.emi)},
        {
          label: 'Processing Fee',
          value: formatIndianCurrency(item?.processingFee),
        },
      ]}
      onItemPress={() => onItemPress(item)}
      showBreakdown={true}
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
        data={lenders}
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
        ListEmptyComponent={!loading && <NoDataFound />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={
          <PaginationFooter
            loadingMore={apiTrigger === API_TRIGGER.LOAD_MORE}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            footerMessage={'You’ve reached the end!'}
            minTotalPagesToShowMessage={1}
          />
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
