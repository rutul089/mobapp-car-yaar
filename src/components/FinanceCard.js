import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import {Card, Text} from '.';

const FinanceCard = ({
  title,
  interestRate,
  tenure,
  emi,
  processingFee,
  badge,
  logo,
  cardStyle,
  showBadge,
  onItemPress,
  statusImg = images.arrow_right,
  noMargin,
}) => {
  const badgeWrapperColor = () => {
    if (badge === 1) {
      return '#DDEDF9';
    } else if (badge === 2) {
      return '#EFEEFF';
    } else if (badge === 3) {
      return '#EDFAEB';
    } else {
      return '#FEF0E8';
    }
  };

  // Handle badge text color
  const badgeValueColor = () => {
    if (badge === 1) {
      return '#1D95F0';
    } else if (badge === 2) {
      return '#696EFF';
    } else if (badge === 3) {
      return '#5FC52E';
    } else {
      return '#F3696E';
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image source={images.placeholder_image} style={styles.logo} />
        <View style={styles.flex}>
          <Text hankenGroteskMedium={true} size={'small'} lineHeight={'small'}>
            {title}
          </Text>
          <Text
            hankenGroteskSemiBold={true}
            size={'small'}
            color={theme.colors.primary}>
            {interestRate}%
          </Text>
        </View>
        <Image source={statusImg} style={styles.arrow} />
      </View>
    );
  };

  const renderInfoBox = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.flex}>
          <Text type={'caption'}>Tenure</Text>
          <Text hankenGroteskSemiBold={true} size={'small'}>
            {tenure}
          </Text>
        </View>
        <View style={styles.flex}>
          <Text type={'caption'}>EMI</Text>
          <Text hankenGroteskSemiBold={true} size={'small'}>
            ₹{emi}
          </Text>
        </View>
        <View style={styles.flex}>
          <Text type={'caption'} lineHeight={'small'}>
            Processing Fee
          </Text>
          <Text hankenGroteskSemiBold={true} size={'small'}>
            ₹{processingFee}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Card
      cardContainerStyle={[
        styles.cardWrapper,
        cardStyle,
        noMargin && {marginTop: 0},
      ]}
      onPress={onItemPress}>
      {renderHeader()}
      {showBadge ? (
        <View style={[styles.badge, {backgroundColor: badgeWrapperColor()}]}>
          <Text
            hankenGroteskBold={true}
            size={'caption'}
            color={badgeValueColor()}>
            Lowest Interest
          </Text>
        </View>
      ) : null}
      {renderInfoBox()}
    </Card>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cardWrapper: {marginTop: 19, padding: 12},
  badge: {
    position: 'absolute',
    top: -8,
    left: -12,
    backgroundColor: '#E0ECFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  arrow: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    backgroundColor: theme.colors.background,
    borderRadius: theme.sizes.borderRadius.md,
    padding: theme.sizes.spacing.smd,
  },
});

export default FinanceCard;
