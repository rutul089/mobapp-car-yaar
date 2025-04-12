/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, RenderInfoBox, Spacing, Text} from '.';
import images from '../assets/images';
import theme from '../theme';

const FinanceCard = ({
  bankName,
  interestRate,
  tenure,
  emi,
  processingFee,
  badgeLevel,
  logo = images.placeholder_image,
  cardStyle,
  showBadge = false,
  onPress,
  rightIcon = images.arrow_right,
  hideTopMargin = false,
  isEligibleForBT = false,
  footerData = [],
  showRightArrow = false,
  showCTAButton = false, //Call To Action Button
  ctaLabel = '',
  onCTAPress,
  wrapperColor = theme.colors.white,
  infoWrapperColor,
  textColor,
  labelColor,
  infoValueColor,
  showError = false,
  errorMessage,
  showBreakdown = false,
  breakdownExpression,
  breakdownValue,
}) => {
  const getBadgeColors = level => {
    switch (level) {
      case 1:
        return {bg: '#DDEDF9', text: '#1D95F0'};
      case 2:
        return {bg: '#EFEEFF', text: '#696EFF'};
      case 3:
        return {bg: '#EDFAEB', text: '#5FC52E'};
      default:
        return {bg: '#FEF0E8', text: '#F3696E'};
    }
  };

  const {bg: badgeBg, text: badgeText} = getBadgeColors(badgeLevel);

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.flex}>
        <Text
          hankenGroteskMedium
          size="small"
          lineHeight="small"
          color={textColor}>
          {bankName}
        </Text>
        <View style={styles.interestRow}>
          <Text hankenGroteskSemiBold size="small" color={theme.colors.primary}>
            {interestRate}%
          </Text>
          {isEligibleForBT && (
            <View style={styles.eligibleTag}>
              <Image
                source={images.checkCircle}
                resizeMode="contain"
                style={styles.eligibleIcon}
              />
              <Text
                type="caption"
                hankenGroteskSemiBold
                color={theme.colors.primaryBlack}>
                Eligible for BT
              </Text>
            </View>
          )}
        </View>
      </View>
      {showRightArrow && <Image source={rightIcon} style={styles.arrow} />}
    </View>
  );

  const renderErrorMessage = () => (
    <View style={styles.errorWrapper}>
      <Image source={images.infoStatus} style={styles.errorIcon} />
      <Text size="small" hankenGroteskSemiBold color={theme.colors.error}>
        {errorMessage}
      </Text>
    </View>
  );

  return (
    <Card
      cardContainerStyle={[
        styles.cardWrapper,
        cardStyle,
        {backgroundColor: wrapperColor},
        hideTopMargin && {marginTop: 0},
      ]}
      onPress={onPress}>
      {showError && renderErrorMessage()}

      {renderHeader()}

      {showBadge && (
        <View style={[styles.badge, {backgroundColor: badgeBg}]}>
          <Text hankenGroteskBold size="caption" color={badgeText}>
            Lowest Interest
          </Text>
        </View>
      )}

      <Spacing size="smd" />

      {footerData && (
        <RenderInfoBox
          labelColor={labelColor}
          infoValueColor={infoValueColor}
          infoWrapperColor={infoWrapperColor}
          footerInfo={footerData}
        />
      )}

      {showBreakdown && (
        <>
          <Spacing size="smd" />
          <View style={styles.breakdownBox}>
            <Text type="caption" lineHeight={16}>
              {breakdownExpression} ={' '}
              <Text hankenGroteskBold color="#5FC52E" lineHeight={20}>
                {breakdownValue}
              </Text>
            </Text>
          </View>
        </>
      )}

      {showCTAButton && (
        <>
          <Spacing size="smd" />
          <Button
            variant="link"
            size="small"
            onPress={onCTAPress}
            label={ctaLabel}
          />
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cardWrapper: {
    marginTop: 19,
    padding: 12,
  },
  badge: {
    position: 'absolute',
    top: -8,
    left: -12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  arrow: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eligibleTag: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    backgroundColor: '#5FC52E',
    borderRadius: 90,
    paddingHorizontal: 5,
  },
  eligibleIcon: {
    height: 20,
    width: 15,
    marginRight: 5,
  },
  errorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  errorIcon: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  breakdownBox: {
    flex: 1,
    borderRadius: 12,
    minHeight: 45,
    backgroundColor: '#6EEE8740',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

export default FinanceCard;
