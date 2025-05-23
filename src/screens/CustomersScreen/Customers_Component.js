import {
  CardWrapper,
  CustomerCard,
  ImageHeader,
  SafeAreaWrapper,
  Spacing,
  theme,
  Loader,
  PaginationFooter,
  images,
  Header,
  SearchBar,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {
  capitalizeFirstLetter,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {NoDataFound} from '../../components';
import {API_TRIGGER} from '../../constants/enums';

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
}) => {
  return (
    <SafeAreaWrapper hideBottom>
      {isCreatingLoanApplication ? (
        <>
          <Header title="Select Customer" onBackPress={() => goBack()} />
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
          subTittle={'Customers'}
          searchPlaceHolder={'Search by customer name or ID...'}
          onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
          onRightIconPress={() => navigate(ScreenNames.Notification)}
          profileImage={'https://randomuser.me/api/portraits/men/75.jpg'}
          onChangeText={onSearchText}
          value={searchText}
          onCancelIconPress={clearSearch}
          onSubmitEditing={setSearch}
          hideHeader
          hideSubHeaderTop={false}
          showAddBtn
          onAddButtonPress={onAddButtonPress}
        />
      )}

      <FlatList
        data={customerList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.wrapper}
        renderItem={({item}) => {
          let customerNote = `${capitalizeFirstLetter(
            item.customerCategory,
          )} - ${capitalizeFirstLetter(item.customerType)}`;

          return (
            <CardWrapper
              onPress={() => onWrapperClick && onWrapperClick(item)}
              leftText={item?.applicationNumber}
              showLeftText
              showTrailingIcon
              statusTextColor={getStatusColor(item.applicationNumber)}
              gradientColors={getGradientColors(item.applicationNumber)}
              disableMargin={false}>
              <CustomerCard
                customerId={item.customerId}
                customerName={item?.customerDetails?.applicantName}
                customerNote={customerNote}
                footerInfo={[
                  {
                    label: 'PAN Card',
                    value: item?.customerDetails?.panCardNumber || '-',
                  },
                  {
                    label: 'Aadhar Card',
                    value: item?.customerDetails?.aadharNumber || '-',
                  },
                ]}
                logo={
                  item.profileImage
                    ? {uri: item.profileImage}
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
            footerMessage={'All Customer are loaded.'}
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

  searchWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.spacing.md,
    paddingTop: 0,
  },
});

export default Customers_Component;
