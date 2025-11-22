/* eslint-disable react-native/no-inline-styles */
import {
  CommonModal,
  FinanceCard,
  Header,
  images,
  Loader,
  PaginationFooter,
  RadioButton,
  SafeAreaWrapper,
  StatusChip,
  Text,
  theme,
  Spacing,
} from '@caryaar/components';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {NoDataFound} from '../../components';
import {API_TRIGGER, lenderFilterOptions} from '../../constants/enums';
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
  activeFilterOption,
  filterProps,
}) => {
  const [localActiveFilterOption, setLocalActiveFilterOption] = useState(
    Array.isArray(activeFilterOption) ? activeFilterOption : [],
  );

  const [isFilterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    setLocalActiveFilterOption(
      Array.isArray(activeFilterOption) ? activeFilterOption : [],
    );
  }, [activeFilterOption]);

  const handleApplyFilter = () => {
    setFilterVisible(false);
    filterProps?.handleApplyFilter?.(localActiveFilterOption);
  };

  const handleClearFilter = () => {
    setFilterVisible(false);
    setLocalActiveFilterOption([]);
    filterProps?.onClearFilterButton?.();
  };

  const toggleFilter = option => {
    setLocalActiveFilterOption(prev => {
      const arr = Array.isArray(prev) ? prev : [];
      return arr.includes(option)
        ? arr.filter(x => x !== option)
        : [...arr, option];
    });
  };

  const filterByOptions = lenderFilterOptions.filter(
    opt => opt.id === 1 || opt.id === 2,
  );

  const sortByOptions = lenderFilterOptions.filter(opt => opt.id > 2);

  const filterByValues = filterByOptions.map(opt => opt.value);

  const handleFilterBySelect = option => {
    // Radio button behavior: only one allowed
    setLocalActiveFilterOption(prev => {
      const arr = Array.isArray(prev) ? prev : [];

      // Keep only SORT BY selections
      const sortSelections = arr.filter(x => !filterByValues.includes(x));

      // Add NEW Filter By selection
      return [...sortSelections, option];
    });
  };

  const handleSortBySelect = option => {
    setLocalActiveFilterOption(prev => {
      const arr = Array.isArray(prev) ? prev : [];

      return arr.includes(option)
        ? arr.filter(x => x !== option) // remove
        : [...arr, option]; // add
    });
  };

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

  const renderActiveFilterChips = () => {
    if (!activeFilterOption?.length) {
      return null;
    }

    return (
      <View style={styles.filterWrapper}>
        <Text type="helper-text">Filter By</Text>

        {activeFilterOption.map(value => {
          const option = lenderFilterOptions.find(o => o.value === value);
          if (!option) {
            return null;
          }

          return (
            <View style={styles.chipSpacing} key={value}>
              <StatusChip
                label={option.label}
                onRemove={() =>
                  filterProps?.handleApplyFilter(
                    activeFilterOption.filter(f => f !== value),
                  )
                }
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Lender Selection"
        subtitle={registerNumber}
        onBackPress={() => goBack()}
        showRightContent={false} // Make it true for the filter
        rightIconName={images.filter}
        onPressRightContent={() => setFilterVisible(true)}
      />

      {/* FILTER CHIPS */}
      {renderActiveFilterChips()}

      {/* LENDER LIST */}
      <FlatList
        data={lenders}
        bounces={true}
        renderItem={renderItem}
        extraData={lenders}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={[
          styles.listContainer,
          activeFilterOption.length && {paddingTop: 10},
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text>
            Tailored Loans for{' '}
            <Text color={theme.colors.yellow} hankenGroteskBold>
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

      {/* FILTER MODAL */}
      <CommonModal
        isVisible={isFilterVisible}
        onModalHide={() => {
          setFilterVisible(false);
        }}
        primaryButtonLabel={'Apply'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        showSecondaryButton
        secondaryButtonText={'Clear'}
        onPressPrimaryButton={handleApplyFilter}
        onSecondaryPress={handleClearFilter}
        isTextCenter={false}
        spacePrimaryBtn={0}>
        <View style={styles.filterWrapperStyle}>
          <Text size={'h4'} hankenGroteskBold={true} textAlign={'left'}>
            Filter by
          </Text>
          <Spacing size="sm" />

          {filterByOptions.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <RadioButton
                label={option.label}
                selected={localActiveFilterOption.includes(option.value)}
                onPress={() => handleFilterBySelect(option.value)}
              />
            </View>
          ))}
          <Text size={'h4'} hankenGroteskBold={true} textAlign={'left'}>
            Sort by
          </Text>
          <Spacing size="sm" />

          {sortByOptions.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <RadioButton
                label={option.label}
                selected={localActiveFilterOption.includes(option.value)}
                onPress={() => handleSortBySelect(option.value)}
              />
            </View>
          ))}
        </View>
      </CommonModal>

      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.sizes.padding,
  },
  filterWrapperStyle: {paddingVertical: 5},
  filterWrapper: {
    paddingHorizontal: 25,
    paddingTop: theme.sizes.spacing.md,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chipSpacing: {
    marginTop: 8,
  },
  optionRow: {
    marginVertical: theme.sizes.spacing.xs,
  },
});

export default Lender_Selection_Component;
