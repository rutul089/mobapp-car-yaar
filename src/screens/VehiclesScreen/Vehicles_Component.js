import {
  CardWrapper,
  Header,
  ImageHeader,
  Loader,
  PaginationFooter,
  SafeAreaWrapper,
  SearchBar,
  theme,
  VehicleCard,
} from '@caryaar/components';
import {get} from 'lodash';
import {FlatList, StyleSheet, View} from 'react-native';
import {NoDataFound} from '../../components';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {
  formatIndianCurrency,
  formatVehicleDetails,
  formatVehicleNumber,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';
import {API_TRIGGER, currentLoanLabelMap} from '../../constants/enums';

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
}) => {
  return (
    <SafeAreaWrapper hideBottom>
      {isCreatingLoanApplication ? (
        <>
          <Header title="Select Vehicle" onBackPress={() => goBack()} />
          <View style={styles.searchWrapper}>
            <SearchBar
              showAddBtn={!isCreatingLoanApplication}
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
        />
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
              statusColor={getStatusColor(status)}
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
            footerMessage={'All Vehicles are loaded.'}
            minTotalPagesToShowMessage={1}
          />
        }
        ListEmptyComponent={
          !loading && (
            <NoDataFound
              text="No Search Result Found"
              btnLabel="Add Vehicle"
              onPress={onAddButtonPress}
              showButton
            />
          )
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
    backgroundColor: theme.colors.background,
  },
  searchWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.spacing.md,
    paddingTop: 0,
  },
});

export default Vehicles_Component;
