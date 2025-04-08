import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, SafeAreaWrapper, Spacing, Text} from '../../components';
import theme from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import DetailInfoCard from '../VehicleDetailScreen/DetailInfoCard';

const Thank_You_Component = ({
  params,
  loanDetails,
  customerDetail,
  vehicleDetail,
  partnerDetail,
  onTrackLoanStatusPress,
  onBackToHomePress,
}) => {
  return (
    <SafeAreaWrapper
      barStyle="dark-content"
      backgroundColor={theme.colors.background}
      statusBarColor={theme.colors.background}>
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <View style={{alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={images.verifiedIcon}
            style={styles.verifiedIcon}
          />
          <Text size={'h2'} hankenGroteskBold={true}>
            {'Thank You for Trusting Us!'}
          </Text>
          <Spacing size="sm" />
          <Text type={'helper-text'}>
            {'Loan applied at - 12 Feb 2025, 10:45 AM'}
          </Text>
          <Spacing size="sm" />
          <Text type={'helper-text'}>
            Application number -{' '}
            <Text
              size={'small'}
              color={theme.colors.primaryBlack}
              hankenGroteskSemiBold={true}>
              #849363
            </Text>
          </Text>
        </View>
        <Spacing size="md_lg" />
        <View style={{backgroundColor: '#00000014', height: 1}} />
        <Spacing size="md" />
        <DetailInfoCard
          label={'Loan Details'}
          data={loanDetails}
          isSemiBold={false}
        />
        <Spacing size="md" />
        <DetailInfoCard
          label={'Customer Details'}
          data={customerDetail}
          isSemiBold={false}
        />
        <Spacing size="md" />
        <DetailInfoCard
          label={'Vehicle Details'}
          data={vehicleDetail}
          isSemiBold={false}
        />
        <Spacing size="md" />
        <DetailInfoCard
          label={'CaarYaar Partner Details'}
          data={partnerDetail}
          isSemiBold={false}
        />
        <Spacing size="xl" />
        <Button
          label={'Track Your Loan Status'}
          onPress={onTrackLoanStatusPress}
        />
        <Spacing size="md" />
        <Button
          variant="link"
          label={'Back To Home'}
          onPress={onBackToHomePress}
        />
        <Spacing size="md" />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  verifiedIcon: {
    height: 95,
    width: 95,
    marginBottom: 20,
  },
});

export default Thank_You_Component;
