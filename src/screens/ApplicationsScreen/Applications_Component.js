import {
  CardWrapper,
  FinanceCard,
  ImageHeader,
  Loader,
  PaginationFooter,
  SafeAreaWrapper,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {NoDataFound} from '../../components';
import {API_TRIGGER, getApplicationStatusLabel} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  formatIndianCurrency,
  getApplicationGradientColors,
} from '../../utils/helper';

const Applications_Component = ({
  params,
  dataToShow,
  onItemPress,
  handleTrackApplication,
  loading,
  handleLoadMore,
  onRefresh,
  refreshing,
  apiTrigger,
  totalPages,
  currentPage,
  onSearchText,
  searchText,
  clearSearch,
  setSearch,
  profileImage,
}) => {
  const renderItem = ({item}) => (
    <CardWrapper
      disableMargin={false}
      showLeftText
      isLeftTextBold
      isStatusBold
      status={getApplicationStatusLabel(item?.status)?.toUpperCase()}
      gradientColors={getApplicationGradientColors(item?.status)}
      leftText={item?.loanApplicationId}>
      <FinanceCard
        bankName={item?.lenderName}
        interestRate={item?.interesetRate}
        hideTopMargin
        showRightArrow
        ctaLabel="Track Loan Application"
        onCTAPress={() =>
          handleTrackApplication && handleTrackApplication(item)
        }
        footerData={[
          {label: 'EMI', value: formatIndianCurrency(item?.emi) || '-'},
          {
            label: 'Tenure',
            value: item?.tenure ? `${item.tenure} Months` : '-',
          },
          {
            label: 'Loan Amount',
            value: formatIndianCurrency(item?.loanAmount) || '-',
          },
        ]}
        showBadge={false}
        // logo={{uri: item.image}}
        showCTAButton
        onPress={() => onItemPress && onItemPress(item)}
      />
    </CardWrapper>
  );
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle={'Loan Application'}
        searchPlaceHolder={'Search by application id'}
        onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
        profileImage={profileImage}
        onChangeText={onSearchText}
        value={searchText}
        onCancelIconPress={clearSearch}
        onSubmitEditing={setSearch}
        hideHeader
        hideSubHeaderTop={false}
        onRightIconPress={() => navigate(ScreenNames.Notification)}
      />
      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.wrapper}
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
            footerMessage={'All Applications are loaded.'}
            minTotalPagesToShowMessage={1}
          />
        }
      />
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
  },
});

export default Applications_Component;
