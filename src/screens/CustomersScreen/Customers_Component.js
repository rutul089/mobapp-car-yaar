import {
  CardWrapper,
  CustomerCard,
  Header,
  ImageHeader,
  Loader,
  PaginationFooter,
  SafeAreaWrapper,
  SearchBar,
  images,
  theme,
  CommonModal,
  RadioButton,
  Spacing,
  Text,
  StatusChip,
} from '@caryaar/components';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {NoDataFound} from '../../components';
import {API_TRIGGER, vehicleFilterOption} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {
  capitalizeFirstLetter,
  formatShortId,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';

const Customers_Component = ({
  customerList,
  onWrapperClick,
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
  onAddButtonPress,
  isCreatingLoanApplication,
  profileImage,
  filterProps,
  activeFilterOption,
  handleFilterClick,
}) => {
  const [localActiveFilterOption, setLocalActiveFilterOption] =
    React.useState(activeFilterOption);

  useEffect(() => {
    setLocalActiveFilterOption(activeFilterOption);
  }, [activeFilterOption]);

  const handleApplyFilter = () => {
    filterProps?.onPressPrimaryButton?.(localActiveFilterOption);
  };

  const handleClearFilter = () => {
    setLocalActiveFilterOption('');
    filterProps?.onClearFilterButton?.();
  };

  return (
    <SafeAreaWrapper hideBottom>
      {isCreatingLoanApplication ? (
        <>
          <Header title="Select Customer" onBackPress={() => goBack()} />
          <View style={styles.searchWrapper}>
            <SearchBar
              showAddBtn={isCreatingLoanApplication}
              onChangeText={onSearchText}
              value={searchText}
              onCancelIconPress={clearSearch}
              onSubmitEditing={setSearch}
              onAddButtonPress={onAddButtonPress}
            />
          </View>
        </>
      ) : (
        <ImageHeader
          subTittle={'Customers'}
          searchPlaceHolder={'Search Customer...'}
          onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
          onRightIconPress={() => navigate(ScreenNames.Notification)}
          profileImage={profileImage}
          onChangeText={onSearchText}
          value={searchText}
          onCancelIconPress={clearSearch}
          onSubmitEditing={setSearch}
          hideHeader
          hideSubHeaderTop={false}
          showAddBtn
          onAddButtonPress={onAddButtonPress}
          onFilterPress={handleFilterClick}
        />
      )}

      {activeFilterOption && (
        <View style={styles.filterWrapper}>
          <Text type="helper-text">FilterView</Text>
          <StatusChip
            label={`${
              activeFilterOption === vehicleFilterOption.DRAFT
                ? 'Draft'
                : 'Saved'
            } Customer`}
            onRemove={handleClearFilter}
          />
        </View>
      )}

      <FlatList
        data={customerList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.wrapper}
        renderItem={({item}) => {
          let isDeleted = item?.customer?.isDeleted;
          let customerDetails = item?.customer?.customerDetails;
          let customerNote = `${capitalizeFirstLetter(
            item?.customer?.customerCategory,
          )} - ${capitalizeFirstLetter(item?.customer?.customerType)}`;
          let status = item?.customer?.isComplete ? 'SAVED' : 'DRAFT';
          let isValidCustomer = item?.customer?.isComplete;
          // if (isDeleted) {
          //   return;
          // }

          // if (isCreatingLoanApplication && !isValidCustomer) {
          //   return;
          // }
          return (
            <CardWrapper
              onPress={() => onWrapperClick?.(item)}
              leftText={status}
              showLeftText
              showTrailingIcon
              statusTextColor={getStatusColor(status)}
              gradientColors={getGradientColors(status)}
              disableMargin={false}>
              <CustomerCard
                customerId={formatShortId(item.customer?.customerNumber)}
                customerName={customerDetails?.applicantName}
                customerNote={customerNote}
                footerInfo={[
                  {
                    label: 'PAN Card',
                    value: customerDetails?.panCardNumber || '-',
                  },
                  {
                    label: 'Aadhar Card',
                    value: customerDetails?.aadharNumber || '-',
                  },
                ]}
                logo={
                  customerDetails?.applicantPhoto
                    ? {uri: customerDetails?.applicantPhoto}
                    : images.placeholder_image
                }
                noMargin
                noShadow
              />
            </CardWrapper>
          );
        }}
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

      <CommonModal
        isVisible={filterProps?.isVisible}
        onModalHide={() => {
          filterProps?.handleCloseFilter?.();
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
        <View style={styles.filterWrapperStyle}>
          <RadioButton
            label={'Saved'}
            selected={localActiveFilterOption === vehicleFilterOption.SAVED}
            onPress={() =>
              setLocalActiveFilterOption(vehicleFilterOption.SAVED)
            }
          />
          <Spacing />
          <RadioButton
            label={'Draft'}
            selected={localActiveFilterOption === vehicleFilterOption.DRAFT}
            onPress={() =>
              setLocalActiveFilterOption(vehicleFilterOption.DRAFT)
            }
          />
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

  searchWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.spacing.md,
    paddingTop: 0,
  },
  filterWrapperStyle: {paddingVertical: 10, marginBottom: -12},
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

export default Customers_Component;
