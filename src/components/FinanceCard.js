/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import {Button, Card, Spacing, Text, RenderInfoBox} from '.';

const FinanceCard = ({
  title,
  interestRate,
  tenure,
  emi,
  processingFee,
  badge,
  logo,
  cardStyle,
  showBadge = false,
  onItemPress,
  statusImg = images.arrow_right,
  noMargin = false,
  isEligible = false,
  footerInfo = [],
  showRightIcon = false,
  showButton = false,
  buttonLabel = '',
  onButtonPress,
  wrapperColor,
  infoWrapperColor,
  textColor,
  labelColor,
  infoValueColor,
  showError,
  errorStats,
  showNewBreakDown,
}) => {
  const getBadgeWrapperColor = () => {
    switch (badge) {
      case 1:
        return '#DDEDF9';
      case 2:
        return '#EFEEFF';
      case 3:
        return '#EDFAEB';
      default:
        return '#FEF0E8';
    }
  };

  const getBadgeTextColor = () => {
    switch (badge) {
      case 1:
        return '#1D95F0';
      case 2:
        return '#696EFF';
      case 3:
        return '#5FC52E';
      default:
        return '#F3696E';
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={logo || images.placeholder_image} style={styles.logo} />
      <View style={styles.flex}>
        <Text
          hankenGroteskMedium
          size="small"
          lineHeight="small"
          color={textColor}>
          {title}
        </Text>
        <View style={styles.interestRow}>
          <Text hankenGroteskSemiBold size="small" color={theme.colors.primary}>
            {interestRate}%
          </Text>
          {isEligible && (
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
      {showRightIcon && <Image source={statusImg} style={styles.arrow} />}
    </View>
  );

  const renderErrorStatus = () => {
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
        <Image
          source={images.infoStatus}
          style={{height: 20, width: 20, marginRight: 8}}
        />
        <Text
          size={'small'}
          hankenGroteskSemiBold={true}
          color={theme.colors.error}>
          {errorStats}
        </Text>
      </View>
    );
  };

  return (
    <Card
      cardContainerStyle={[
        styles.cardWrapper,
        cardStyle,
        {backgroundColor: wrapperColor ?? theme.colors.white},
        noMargin && {marginTop: 0},
      ]}
      onPress={onItemPress}>
      {showError && renderErrorStatus()}

      {renderHeader()}

      {showBadge && (
        <View style={[styles.badge, {backgroundColor: getBadgeWrapperColor()}]}>
          <Text hankenGroteskBold size="caption" color={getBadgeTextColor()}>
            Lowest Interest
          </Text>
        </View>
      )}

      <Spacing size="smd" />

      <RenderInfoBox
        labelColor={labelColor}
        infoValueColor={infoValueColor}
        infoWrapperColor={infoWrapperColor}
        footerInfo={footerInfo}
      />

      {showNewBreakDown && (
        <>
          <Spacing size="smd" />

          <View
            style={{
              flex: 1,
              borderRadius: 12,
              minHeight: 45,
              backgroundColor: '#6EEE8740',
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}>
            <Text type="caption">
              (1.2 × 10,00,000) - 6,00,000 - 10,000 ={' '}
              <Text hankenGroteskBold={true} color={'#5FC52E'}>
                5,90,000
              </Text>
            </Text>
          </View>
        </>
      )}

      {showButton && (
        <>
          <Spacing size="smd" />
          <Button
            variant="link"
            size="small"
            onPress={onButtonPress}
            label={buttonLabel}
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
    // marginTop: 4,
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
});

export default FinanceCard;
