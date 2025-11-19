import {
  FinanceCard,
  Header,
  Loader,
  PaginationFooter,
  SafeAreaWrapper,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {NoDataFound} from '../../components';
import {API_TRIGGER} from '../../constants/enums';
import {goBack} from '../../navigation/NavigationUtils';
import {formatIndianCurrency} from '../../utils/helper';

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
  const renderItem = ({item}) => (
    <FinanceCard
      bankName={item?.lenderName}
      interestRate={item?.interestRate || 8}
      showRightArrow
      logo={{uri: item?.lenderLogo}}
      showBadge={item?.badge}
      badgeLevel={item?.badge}
      footerData={[
        {label: 'Tenure', value: `${item?.tenure} Month`},
        {label: 'EMI', value: formatIndianCurrency(item?.emi)},
        {
          label: 'Processing Fee',
          value: formatIndianCurrency(item?.processingFee),
        },
      ]}
      onItemPress={() => onItemPress(item)}
      showBreakdown={false}
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
