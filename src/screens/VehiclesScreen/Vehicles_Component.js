/* eslint-disable react-native/no-inline-styles */
import {
  CardWrapper,
  CommonModal,
  Header,
  ImageHeader,
  Loader,
  PaginationFooter,
  RadioButton,
  SafeAreaWrapper,
  SearchBar,
  Spacing,
  Text,
  theme,
  VehicleCard,
  StatusChip,
} from '@caryaar/components';
import {get} from 'lodash';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {NoDataFound} from '../../components';
import {
  API_TRIGGER,
  currentLoanLabelMap,
  vehicleFilterOption,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {
  formatIndianCurrency,
  formatVehicleDetails,
  formatVehicleNumber,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';
import strings from '../../locales/strings';

const Vehicles_Component = ({
  vehicleData,
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
  handleFilterVehicles,
  filterVehicleProps,
  activeFilterOption,
  stopLoading,
  showUnavailableVehicleModalProp,
  fullScreen,
}) => {
  const [localActiveFilterOption, setLocalActiveFilterOption] =
    React.useState(activeFilterOption);

  useEffect(() => {
    setLocalActiveFilterOption(activeFilterOption);
  }, [activeFilterOption]);

  const handleApplyFilter = () => {
    filterVehicleProps?.onPressPrimaryButton?.(localActiveFilterOption);
  };

  const handleClearFilter = () => {
    setLocalActiveFilterOption('');
    filterVehicleProps?.onClearFilterButton?.();
  };

  return (
    <SafeAreaWrapper hideBottom={!isCreatingLoanApplication}>
      {isCreatingLoanApplication ? (
        <>
          <Header title="Select Vehicle" onBackPress={() => goBack()} />
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
          subTittle={'Vehicles'}
          searchPlaceHolder={'Search by vehicle number...'}
          onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
          onChangeText={onSearchText}
          value={searchText}
          onCancelIconPress={clearSearch}
          onSubmitEditing={setSearch}
          profileImage={profileImage}
          showAddBtn
          onAddButtonPress={onAddButtonPress}
          hideHeader
          hideSubHeaderTop={false}
          onRightIconPress={() => navigate(ScreenNames.Notification)}
          onFilterPress={handleFilterVehicles}
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
            } Vehicles`}
            onRemove={handleClearFilter}
          />
        </View>
      )}
      <FlatList
        data={vehicleData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.wrapper}
        renderItem={({item}) => {
          const {isDraft, UsedVehicle} = item;
          const status = isDraft ? 'DRAFT' : 'SAVED';
          const safeGet = (obj, path) => {
            return get(obj, path, '-');
          };

          const _registerNumber = safeGet(UsedVehicle, 'registerNumber') ?? '-';

          return (
            <CardWrapper
              onPress={() => onWrapperClick?.(item)}
              leftText={status}
              showTrailingIcon
              statusTextColor={getStatusColor(status)}
              gradientColors={getGradientColors(status)}
              disableMargin={false}>
              <VehicleCard
                brandName={safeGet(item, 'make')}
                vehicleDetail={formatVehicleDetails(item)}
                plateNumber={formatVehicleNumber(_registerNumber)}
                footerInfo={[
                  {
                    label: 'Mfg Year',
                    value: safeGet(UsedVehicle, 'manufactureYear'),
                    style: {flex: 1, marginRight: 5},
                  },
                  {
                    label: 'Seller Price',
                    value: formatIndianCurrency(UsedVehicle?.salePrice),
                    style: {flex: 1.5, marginRight: 5},
                  },
                  {
                    label: 'Hypothecation Status',
                    value:
                      currentLoanLabelMap[
                        safeGet(UsedVehicle, 'hypothecationStatus')
                      ] || '-',
                    style: {flex: 2},
                  },
                ]}
                logo={{uri: UsedVehicle?.images?.[0]?.frontView?.[0]}}
                noMargin
                noShadow
                onItemPress={() => onWrapperClick?.(item)} // TO Solve touch event ossie
              />
            </CardWrapper>
          );
        }}
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
        ListEmptyComponent={
          (!loading || stopLoading) && (
            <NoDataFound
              text="No Search Result Found"
              btnLabel="Add Vehicle"
              onPress={onAddButtonPress}
              showButton={false}
            />
          )
        }
      />

      <CommonModal
        isVisible={filterVehicleProps?.isVisible}
        onModalHide={() => {
          filterVehicleProps?.handleCloseFilter?.();
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
        <View style={{paddingVertical: 10, marginBottom: -12}}>
          <RadioButton
            label={'Saved Vehicles'}
            selected={localActiveFilterOption === vehicleFilterOption.SAVED}
            onPress={() =>
              setLocalActiveFilterOption(vehicleFilterOption.SAVED)
            }
          />
          <Spacing />
          <RadioButton
            label={'Draft Vehicles'}
            selected={localActiveFilterOption === vehicleFilterOption.DRAFT}
            onPress={() =>
              setLocalActiveFilterOption(vehicleFilterOption.DRAFT)
            }
          />
        </View>
      </CommonModal>

      <CommonModal
        isVisible={showUnavailableVehicleModalProp?.isVisible}
        onModalHide={showUnavailableVehicleModalProp?.onModalHide}
        primaryButtonLabel={strings.showUnavailableVehicleModal.button}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={
          showUnavailableVehicleModalProp?.onPressPrimaryButton
        }
        title={strings.showUnavailableVehicleModal.tittle}
        isCancellable={true}>
        <View style={{paddingVertical: 8}}>
          <Text textAlign="center" lineHeight={22}>
            {strings.showUnavailableVehicleModal.description}
          </Text>
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

export default Vehicles_Component;

// Code in case of multiple filter choice
{
  /* <View
style={{
  paddingHorizontal: 25,
  paddingTop: 15,
  paddingBottom: 5,
  backgroundColor: theme.colors.background,
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
}}>
<Text type="helper-text">FilterView</Text>
<View
  style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    gap: 8,
  }}>
  {statuses.map((status, index) => (
    <View key={index} style={styles.chip}>
      <Text type="helper-text" hankenGroteskBold color={'black'}>
        {status}
      </Text>
      <Image source={images.icFilterClose} style={styles.closeIcon} />
    </View>
  ))}
</View>
</View> */
}
