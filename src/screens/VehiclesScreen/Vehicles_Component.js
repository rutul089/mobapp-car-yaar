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
import {navigate} from '../../navigation/NavigationUtils';
import {
  formatIndianCurrency,
  formatVehicleDetails,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';

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
  fullScreen,
}) => {
  return (
    <SafeAreaWrapper hideBottom>
      {fullScreen ? (
        <>
          <Header title="Select Vehicle" />
          <View style={styles.searchWrapper}>
            <SearchBar
              showAddBtn
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
          profileImage={'https://randomuser.me/api/portraits/men/75.jpg'}
          showAddBtn
          onAddButtonPress={onAddButtonPress}
          hideHeader
          hideSubHeaderTop={false}
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
                plateNumber={safeGet(UsedVehicle, 'registerNumber')}
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
                    value: safeGet(UsedVehicle, 'hypothecationStatus') + '',
                    style: {flex: 2},
                  },
                ]}
                logo={{uri: ''}}
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
            loadingMore={apiTrigger === 'loadMore'}
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
