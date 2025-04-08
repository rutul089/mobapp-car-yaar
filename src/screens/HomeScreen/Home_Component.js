/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';
import images from '../../assets/images';
import {
  Card,
  ImageHeader,
  OptionCard,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../components';
import {styles} from '../../styles/Home.style';
import theme from '../../theme';
import {vehicleType} from '../../constants/enums';

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
      <Card onPress={onPress} style={style}>
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
        <ImageHeader onRightIconPress={onNotificationPress} />
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
        <ScrollView contentContainerStyle={styles.scrollSection}>
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
                type={vehicleType.used}
                label={'Used Vehicle'}
                icon={images.usedVehicle}
                onSelectedOption={onSelectedCarType}
                isSelected={selectedCarType === vehicleType.used}
              />
              <OptionCard
                type={vehicleType.new}
                label={'New Vehicle'}
                icon={images.newVehicle}
                onSelectedOption={onSelectedCarType}
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
              )}
              {renderLoanType(
                'External BT',
                images.icExternalBT,
                styles.carTypeBox,
              )}
            </View>
          </>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default Home_Component;
