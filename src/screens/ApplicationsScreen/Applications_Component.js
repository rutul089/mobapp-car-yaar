import {
  CardWrapper,
  FinanceCard,
  ImageHeader,
  Loader,
  PaginationFooter,
  SafeAreaWrapper,
  theme,
  CommonModal,
  RadioButton,
  Spacing,
  Text,
  StatusChip,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {NoDataFound} from '../../components';
import {
  API_TRIGGER,
  applicationStatus,
  applicationStatusOptions,
  applicationStatusValue,
  getApplicationStatusLabel,
  getLabelFromEnum,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  formatIndianCurrency,
  getApplicationGradientColors,
  getApplicationStatusColor,
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
  filterApplicationProps,
  activeFilterOption,
  handleFilterApplications,
  stopLoading,
}) => {
  const [localActiveFilterOption, setLocalActiveFilterOption] =
    React.useState(activeFilterOption);

  React.useEffect(() => {
    setLocalActiveFilterOption(activeFilterOption);
  }, [activeFilterOption]);

  const handleApplyFilter = () => {
    filterApplicationProps?.onPressPrimaryButton?.(localActiveFilterOption);
  };

  const handleClearFilter = () => {
    setLocalActiveFilterOption('');
    filterApplicationProps?.onClearFilterButton?.();
  };

  const renderItem = ({item}) => (
    <CardWrapper
      disableMargin={false}
      showLeftText
      isLeftTextBold
      isStatusBold
      status={getApplicationStatusLabel(item?.status)?.toUpperCase()}
      gradientColors={getApplicationGradientColors(item?.status)}
      statusTextColor={getApplicationStatusColor(item?.status)}
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
        onFilterPress={handleFilterApplications}
      />
      {activeFilterOption && (
        <View style={styles.filterWrapper}>
          <Text type="helper-text">FilterView</Text>
          <StatusChip
            label={getLabelFromEnum(applicationStatusValue, activeFilterOption)}
            onRemove={handleClearFilter}
          />
        </View>
      )}
      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.wrapper}
        ListEmptyComponent={(!loading || stopLoading) && <NoDataFound />}
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
      <CommonModal
        isVisible={filterApplicationProps?.isVisible}
        onModalHide={() => {
          filterApplicationProps?.handleCloseFilter?.();
        }}
        primaryButtonLabel={'Apply'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        showSecondaryButton
        secondaryButtonText={'Clear'}
        onPressPrimaryButton={handleApplyFilter}
        onSecondaryPress={handleClearFilter}
        isTextCenter={false}
        title="Filter by">
        <View style={{paddingVertical: 10, marginBottom: -20}}>
          {applicationStatusOptions.map((option, index) => (
            <React.Fragment key={`${option.label}-${index}`}>
              <RadioButton
                label={option.label}
                selected={localActiveFilterOption === option.value}
                onPress={() => setLocalActiveFilterOption(option.value)}
              />
              <Spacing />
            </React.Fragment>
          ))}
        </View>
      </CommonModal>
      {loading && <Loader visible={loading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
  filterWrapper: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Applications_Component;
