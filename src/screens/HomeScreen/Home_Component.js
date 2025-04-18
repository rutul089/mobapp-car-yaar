/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, View} from 'react-native';

import {
  Card,
  ImageHeader,
  images,
  OptionCard,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import {vehicleType} from '../../constants/enums';
import {styles} from '../../styles/Home.style';

const Home_Component = ({
  params,
  onPurchasePress,
  onRefinancePress,
  onTopUpPress,
  onInternalBTPress,
  onExternalBTPress,
  onSelectedCarType,
  onNotificationPress,
  selectedCarType,
  handleLoanOptionPress,
  handleLeaseOptionPress,
  handleSubscribeOptionPress,
}) => {
  const renderBox = (count, countColor, label) => {
    return (
      <View style={styles.statBox}>
        <Text
          lineHeight={'h2'}
          size={'h2'}
          hankenGroteskExtraBold={true}
          color={countColor}>
          {count}
        </Text>
        <Text
          size={'small'}
          lineHeight={'small'}
          hankenGroteskMedium={true}
          color={theme.colors.textLabel}>
          {label}
        </Text>
      </View>
    );
  };

  const renderLoanType = (label, icon, style, onPress) => {
    return (
      <Card onPress={onPress} style={[{width: '32%'}, style]} noShadow={true}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={icon} style={styles.loanIcon} />
          <Image source={images.arrow_right} style={{height: 20, width: 20}} />
        </View>
        <Spacing />
        <Text hankenGroteskMedium={true} numberOfLines={1}>
          {label}
        </Text>
      </Card>
    );
  };

  return (
    <SafeAreaWrapper hideBottom>
      <View style={styles.wrapper}>
        {/* Header */}
        <ImageHeader
          onRightIconPress={onNotificationPress}
          hideSubHeader={true}
        />
        <View style={styles.header}>
          {/* User data */}
          <View style={styles.profileRow}>
            <Text
              hankenGroteskBold={true}
              color={'white'}
              style={{width: '80%'}}>
              Welcome Back Ghanshyam Sinha!
            </Text>
            <Text
              style={{width: '20%'}}
              hankenGroteskBold={true}
              textAlign={'right'}
              color={theme.colors.textLabel}
              size={theme.typography.fontSizes.small}>
              XX0012
            </Text>
          </View>
          <View style={styles.statsContainer}>
            {renderBox(3, '#F8A902', 'Loans\nPending')}
            {renderBox(3, '#6EEE87', 'Loans\nApproved')}
            {renderBox(2, '#696EFF', 'Vehicles\nOnboarded')}
          </View>
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollSection}
          showsVerticalScrollIndicator={false}>
          {/* Car Type Selector */}
          <>
            <Text size={'h4'} lineHeight={'body'} hankenGroteskSemiBold={true}>
              Find The Perfect Loan For Your Vehicle
            </Text>
            <Spacing />
            <Text
              size={'body'}
              lineHeight={'body'}
              color={theme.colors.textLabel}>
              Select Car Type
            </Text>
            <View style={styles.row}>
              <OptionCard
                value={vehicleType.used}
                label={'Used Vehicle'}
                icon={images.usedVehicle}
                onSelect={onSelectedCarType}
                isSelected={selectedCarType === vehicleType.used}
              />
              <OptionCard
                value={vehicleType.new}
                label={'New Vehicle'}
                icon={images.newVehicle}
                onSelect={onSelectedCarType}
                isSelected={selectedCarType === vehicleType.new}
              />
            </View>
          </>
          {/* Loan Type Selector */}
          <>
            <Spacing size="lg" />
            <Text
              size={'body'}
              lineHeight={'body'}
              color={theme.colors.textLabel}>
              Select Car Loan Type
            </Text>
            {selectedCarType === vehicleType.used ? (
              <>
                <View style={styles.loanTypeRow}>
                  {renderLoanType(
                    'Purchase',
                    images.icPurchase,
                    null,
                    onPurchasePress,
                  )}
                  {renderLoanType(
                    'Refinance',
                    images.icRefinance,
                    null,
                    onRefinancePress,
                  )}
                  {renderLoanType('Top Up', images.icTopUp, null, onTopUpPress)}
                </View>
                <View style={styles.row}>
                  {renderLoanType(
                    'Internal BT',
                    images.icInternalBT,
                    styles.carTypeBox,
                    onInternalBTPress,
                  )}
                  <Spacing direction="x" size="md" />
                  {renderLoanType(
                    'External BT',
                    images.icExternalBT,
                    styles.carTypeBox,
                    onExternalBTPress,
                  )}
                </View>
              </>
            ) : (
              <View style={styles.loanTypeRow}>
                {renderLoanType(
                  'Loan',
                  images.loanAmountIcon,
                  null,
                  handleLoanOptionPress,
                )}
                {renderLoanType(
                  'Lease',
                  images.carOwnershipIcon,
                  null,
                  handleLeaseOptionPress,
                )}
                {renderLoanType(
                  'Subscribe',
                  images.carHistoryIcon,
                  null,
                  handleSubscribeOptionPress,
                )}
              </View>
            )}
          </>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default Home_Component;
