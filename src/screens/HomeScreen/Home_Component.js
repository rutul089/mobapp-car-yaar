/* eslint-disable react-native/no-inline-styles */
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
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {loanType, vehicleType} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {styles} from '../../styles/Home.style';
import {formatShortId} from '../../utils/helper';

const Home_Component = ({
  onSelectedCarType,
  onNotificationPress,
  selectedCarType,
  handleLoanOptionPress,
  handleLeaseOptionPress,
  handleSubscribeOptionPress,
  handleLoanTypeSelection,
  profileImage,
  userName,
  userRole,
  partnerStats,
  partnerID,
}) => {
  /**
   * Render a small stat card (e.g., Loans Pending/Approved)
   */
  const renderStatBox = (count, countColor, label) => (
    <View style={styles.statBox}>
      <Text lineHeight="h2" size="h2" hankenGroteskExtraBold color={countColor}>
        {count}
      </Text>
      <Text
        size="small"
        lineHeight="small"
        hankenGroteskMedium
        color={theme.colors.textLabel}>
        {label}
      </Text>
    </View>
  );

  /**
   * Render a loan type card with an icon and arrow
   */
  const renderLoanTypeCard = (label, icon, style, onPress) => (
    <Card onPress={onPress} style={[{width: '32%'}, style]} noShadow>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={icon} style={styles.loanIcon} />
        <Image source={images.arrow_right} style={{height: 20, width: 20}} />
      </View>
      <Spacing />
      <Text hankenGroteskMedium numberOfLines={1}>
        {label}
      </Text>
    </Card>
  );

  return (
    <SafeAreaWrapper hideBottom>
      <View style={styles.wrapper}>
        {/* ---------- Header Section ---------- */}
        <ImageHeader
          onRightIconPress={onNotificationPress}
          hideSubHeader
          onLeftIconPress={() => navigate(ScreenNames.UserProfile)}
          profileImage={profileImage}
        />

        {/* ---------- Welcome & Stats ---------- */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Text hankenGroteskSemiBold color="white" style={{width: '75%'}}>
              {`Welcome Back ${userName}!`}
            </Text>
            <Text
              style={{width: '20%'}}
              hankenGroteskBold
              textAlign="right"
              color={theme.colors.textLabel}
              size={theme.typography.fontSizes.small}>
              {formatShortId(partnerID, 4)}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            {renderStatBox(
              partnerStats?.loansPending ?? '-',
              '#F8A902',
              'Loans\nPending',
            )}
            {renderStatBox(
              partnerStats?.loansApproved ?? '-',
              '#6EEE87',
              'Loans\nApproved',
            )}
            {renderStatBox(
              partnerStats?.vehiclesOnboarded ?? '-',
              '#696EFF',
              'Vehicles\nOnboarded',
            )}
          </View>
          <Spacing />
        </View>

        {/* ---------- Scrollable Content ---------- */}
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollSection}
          showsVerticalScrollIndicator={false}>
          {/* ---------- Vehicle Type Selection ---------- */}
          <Text size="h4" lineHeight="body" hankenGroteskBold>
            Find The Perfect Loan For Your Vehicle
          </Text>
          <Spacing />
          <Text size="body" lineHeight="body" color={theme.colors.textLabel}>
            Select Car Type
          </Text>
          <View style={styles.row}>
            <OptionCard
              value={vehicleType.used}
              label="Used Vehicle"
              icon={images.usedVehicle}
              onSelect={onSelectedCarType}
              isSelected={selectedCarType === vehicleType.used}
            />
            <OptionCard
              value={vehicleType.new}
              label="New Vehicle"
              icon={images.newVehicle}
              onSelect={onSelectedCarType}
              isSelected={selectedCarType === vehicleType.new}
            />
          </View>

          {/* ---------- Loan Type Selection ---------- */}
          <Spacing size="lg" />
          <Text size="body" lineHeight="body" color={theme.colors.textLabel}>
            Select Car Loan Type
          </Text>

          {selectedCarType === vehicleType.used ? (
            <>
              <View style={styles.loanTypeRow}>
                {renderLoanTypeCard('Purchase', images.icPurchase, null, () =>
                  handleLoanTypeSelection?.(loanType.purchase),
                )}
                {renderLoanTypeCard('Refinance', images.icRefinance, null, () =>
                  handleLoanTypeSelection?.(loanType.refinance),
                )}
                {renderLoanTypeCard('Top Up', images.icTopUp, null, () =>
                  handleLoanTypeSelection?.(loanType.topUp),
                )}
              </View>
              <View style={styles.row}>
                {renderLoanTypeCard(
                  'Internal BT',
                  images.icInternalBT,
                  styles.carTypeBox,
                  () => handleLoanTypeSelection?.(loanType.internalBT),
                )}
                <Spacing direction="x" size="md" />
                {renderLoanTypeCard(
                  'External BT',
                  images.icExternalBT,
                  styles.carTypeBox,
                  () => handleLoanTypeSelection?.(loanType.externalBT),
                )}
              </View>
            </>
          ) : (
            <View style={styles.loanTypeRow}>
              {renderLoanTypeCard(
                'Loan',
                images.loanAmountIcon,
                null,
                handleLoanOptionPress,
              )}
              {renderLoanTypeCard(
                'Lease',
                images.carOwnershipIcon,
                null,
                handleLeaseOptionPress,
              )}
              {renderLoanTypeCard(
                'Subscribe',
                images.carHistoryIcon,
                null,
                handleSubscribeOptionPress,
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default Home_Component;
