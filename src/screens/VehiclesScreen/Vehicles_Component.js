import {
  CardWrapper,
  ImageHeader,
  SafeAreaWrapper,
  Spacing,
  theme,
  VehicleCard,
} from '@caryaar/components';
import {FlatList, StyleSheet} from 'react-native';
import {
  formatIndianNumber,
  formatVehicleDetails,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {Loader, PaginationFooter} from '../../components';
import {get} from 'lodash';

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
}) => {
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle={'Vehicles'}
        searchPlaceHolder={'Search by vehicle number...'}
        onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
      />
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
              onPress={() => onWrapperClick && onWrapperClick(item)}
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
                    value: formatIndianNumber(UsedVehicle?.salePrice),
                    style: {flex: 1.5, marginRight: 5},
                  },
                  {
                    label: 'Hypothecation Status',
                    value: safeGet(UsedVehicle, 'hypothecationStatus') + '',
                    style: {flex: 2},
                  },
                ]}
                logo={{uri: item.logo}}
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
});

export default Vehicles_Component;
