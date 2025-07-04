import {
  Button,
  Card,
  CommonModal,
  Header,
  images,
  Input,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  Loader,
  PaginationFooter,
  Dropdown,
  InitialsAvatar,
} from '@caryaar/components';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {goBack} from '../../../navigation/NavigationUtils';
import { NoDataFound} from '../../../components';
import {getLabelFromEnum, salesExecutiveValue} from '../../../constants/enums';
import {formatMobileNumber} from '../../../utils/helper';

const Manage_Members_Component = ({
  handleAddNewMemberPress,
  handleDeleteMemberPress,
  isVisible,
  onCloseVerifyOTP,
  onModalHide,
  onPressPrimaryButton,
  fullName,
  mobileNumber,
  onChangeFullName,
  onChangeMobileNumber,
  onChangeEmail,
  selectedSalesExec,
  setSelectedSalesExec = () => {},
  salesExecOptions,
  salesExecutives,
  handleLoadMore,
  isLoading,
  restInputProps = {},
  onRefresh,
  refreshing,
  currentPage,
  totalPages,
  loadingMore,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleModalHide = () => {
    setShowDropdown(false);
    onModalHide?.();
  };

  const renderItem = ({item, index}) => (
    <>
      <Card cardContainerStyle={styles.cardWrapper} padding={12}>
        {item.avatar ? (
          <Image
            source={item.avatar ? {uri: item.avatar} : images.placeholder_image}
            style={styles.avatar}
            defaultSource={images.placeholder_image}
          />
        ) : (
          <InitialsAvatar
            name={item?.user?.name || 'Car Yaar'}
            fontSize="body"
            size={48}
          />
        )}
        <View style={styles.textWrapper}>
          <Text
            lineHeight={'caption'}
            size={'caption'}
            hankenGroteskBold
            color={theme.colors.primary}>
            {getLabelFromEnum(salesExecutiveValue, item?.position)}
          </Text>
          <Text lineHeight={'body'}>{item?.user?.name}</Text>
          <Text
            size={'small'}
            lineHeight={'small'}
            hankenGroteskMedium
            color={theme.colors.textSecondary}>
            {formatMobileNumber(item?.user?.mobileNumber)}
          </Text>
        </View>
        <Pressable onPress={() => handleDeleteMemberPress?.(item, index)}>
          <Image source={images.icon_delete} style={styles.deleteIcon} />
        </Pressable>
      </Card>
      <Spacing size="md" />
    </>
  );

  return (
    <SafeAreaWrapper>
      <Header title="Manage Members" onBackPress={() => goBack()} />
      <FlatList
        data={salesExecutives}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.wrapper}
        ListEmptyComponent={
          !isLoading && <NoDataFound text="No data available." />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={
          <PaginationFooter
            loadingMore={loadingMore}
            loading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            footerMessage={'You’ve reached the end!'}
          />
        }
      />
      <CommonModal
        isVisible={isVisible}
        onModalHide={handleModalHide}
        primaryButtonLabel={'Send Invite'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        modalHeight={'75%'}
        onPressPrimaryButton={onPressPrimaryButton}
        title="Add New Member">
        <View style={styles.modalContent}>
          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size={'large'} />
            </View>
          )}
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={onChangeFullName}
            onFocus={() => {
              setShowDropdown(false);
            }}
            {...(restInputProps.fullName || {})}
          />
          <Spacing size="lg" />
          <Input
            label="Mobile Number"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={onChangeMobileNumber}
            maxLength={10}
            onFocus={() => {
              setShowDropdown(false);
            }}
            {...(restInputProps.mobileNumber || {})}
          />
          <Spacing size="lg" />
          <Input
            label="Email"
            keyboardType="email-address"
            onChangeText={onChangeEmail}
            onFocus={() => {
              setShowDropdown(false);
            }}
            {...(restInputProps.email || {})}
          />
          <Spacing size="lg" />
          <Input
            label="Select Sales Executive Position"
            keyboardType="default"
            isRightIconVisible
            isAsDropdown
            onPress={() => setShowDropdown(!showDropdown)}
            value={selectedSalesExec}
            {...(restInputProps.selectedSalesExec || {})}
          />
          <Dropdown
            options={salesExecOptions}
            selectedValue={selectedSalesExec}
            onSelect={item => {
              setShowDropdown(false);
              setSelectedSalesExec?.(item);
            }}
            isVisible={showDropdown}
            multiSelect={false}
          />
          <Spacing size="lg" />
        </View>
      </CommonModal>
      {/* <View style={styles.buttonWrapper}>
        <Button label={'Add New Member'} onPress={handleAddNewMemberPress} />
      </View> */}
      {isLoading && <Loader visible={isLoading} />}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
  cardWrapper: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  deleteIcon: {
    height: 24,
    width: 24,
  },
  textWrapper: {flex: 1, marginHorizontal: 12},
  buttonWrapper: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding - 10,
    backgroundColor: theme.colors.background,
  },
});

export default Manage_Members_Component;
