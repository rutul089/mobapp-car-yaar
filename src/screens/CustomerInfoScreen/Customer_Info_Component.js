import {
  Button,
  CardWrapper,
  CustomerCard,
  DetailInfoCard,
  Header,
  images,
  Loader,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {DeleteConfirmationContent, FullLoader} from '../../components';
import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';
import {
  formatShortId,
  getGradientColors,
  getStatusColor,
} from '../../utils/helper';

const Customer_Info_Component = ({
  customerInfo,
  personalDetail,
  professionalDetails,
  bankDetails,
  onNextPress,
  handleEditDetailPress,
  loading,
  deleteModalProps,
  showDeleteCustomerModal,
  isCreatingLoanApplication,
  isLoadingDocument,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Customer Details"
        onBackPress={() => goBack()}
        // showRightContent={!isCreatingLoanApplication}
        rightIconName={images.icon_delete}
        onPressRightContent={showDeleteCustomerModal}
      />

      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.headerWrapper}>
          <CardWrapper
            leftText={customerInfo?.status}
            showLeftText
            statusTextColor={getStatusColor(customerInfo?.status)}
            gradientColors={getGradientColors(customerInfo?.status)}>
            <CustomerCard
              customerId={formatShortId(customerInfo.customerId)}
              customerName={customerInfo.customerName}
              customerNote={customerInfo.customerNote}
              footerInfo={customerInfo.footerInfo}
              logo={
                customerInfo?.isValidUri
                  ? {uri: customerInfo.profileImage}
                  : images.placeholder_image
              }
              noMargin
              noShadow
              wrapperColor={theme.colors.gray900}
              customerNameColor={theme.colors.white}
              infoWrapperColor={theme.colors.primaryBlack}
              infoValueColor={theme.colors.white}
              showButton
              buttonLabel="Edit Details"
              onButtonPress={handleEditDetailPress}
            />
          </CardWrapper>
        </View>
        <View style={{padding: theme.sizes.padding}}>
          <DetailInfoCard
            label={'Personal Details'}
            data={personalDetail}
            isSemiBold={false}
          />
          <Spacing size="lg" />
          <DetailInfoCard
            label={'Personal Details'}
            data={professionalDetails}
            isSemiBold={false}
          />
          <Spacing size="lg" />
          <DetailInfoCard
            label={'Bank Details'}
            data={bankDetails}
            isSemiBold={false}
          />
          <Spacing size="lg" />
          <Button label={strings.next} onPress={onNextPress} />
        </View>
      </ScrollView>

      <DeleteConfirmationContent
        isVisible={deleteModalProps?.isDeleteModalVisible}
        onModalHide={deleteModalProps?.omModalHide}
        onPressPrimaryButtonPress={deleteModalProps?.handleDeleteCustomerInfo}
        title={'Delete Customer'}
        message={
          'Are you sure you want to delete this Customer?\nThis action cannot be undone and all related data will be permanently removed.'
        }
        isLoading={deleteModalProps?.isLoading}
      />

      {loading ? <Loader visible={loading} /> : null}

      {isLoadingDocument ? <FullLoader visible={isLoadingDocument} /> : null}
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.padding,
    paddingTop: 12,
  },
  scrollWrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Customer_Info_Component;
