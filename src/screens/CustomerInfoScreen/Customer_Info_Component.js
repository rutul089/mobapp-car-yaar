import {
  Button,
  CardWrapper,
  CustomerCard,
  DetailInfoCard,
  Header,
  SafeAreaWrapper,
  Spacing,
  theme,
  Loader,
  images,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import strings from '../../locales/strings';
import {goBack} from '../../navigation/NavigationUtils';

const Customer_Info_Component = ({
  customerInfo,
  personalDetail,
  professionalDetails,
  bankDetails,
  onNextPress,
  handleEditDetailPress,
  loading,
  isCreatingLoanApplication,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Customer Details" onBackPress={() => goBack()} />
      <ScrollView contentContainerStyle={styles.scrollWrapper} bounces={false}>
        <View style={styles.headerWrapper}>
          <CardWrapper
            leftText={customerInfo?.applicationNumber}
            showLeftText
            statusTextColor={'#1D95F0'}
            gradientColors={[
              'rgba(29, 149, 240, 0.24)',
              'rgba(61, 173, 255, 0.24)',
            ]}>
            <CustomerCard
              customerId={customerInfo.customerId}
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

          <Spacing size="xl" />
          <Button label={strings.next} onPress={onNextPress} />
        </View>
      </ScrollView>
      {loading && <Loader visible={loading} />}
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
