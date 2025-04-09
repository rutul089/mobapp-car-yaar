/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, RenderInfoBox, Spacing, Text} from '.';
import images from '../assets/images';
import theme from '../theme';

const VehicleCard = ({
  brandName,
  brandNameColor,
  vehicleDetail,
  vehicleDetailColor,
  customerNoteColor,
  plateNumber,
  plateBgColor = theme.colors.lightGray1,
  plateBorderColor = theme.colors.gray,
  logo,
  cardStyle,
  onItemPress,
  statusImg = images.arrow_right,
  noMargin = false,
  footerInfo = [],
  showRightIcon = false,
  showButton = false,
  buttonLabel = '',
  onButtonPress,
  wrapperColor,
  infoWrapperColor,
  labelColor,
  infoValueColor,
  noShadow,
  lastUpdateStatus,
  hideFooter,
}) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={logo || images.placeholder_image} style={styles.logo} />
      <View style={styles.flex}>
        <Text
          size="small"
          lineHeight="small"
          color={brandNameColor ?? theme.colors.textSecondary}>
          {brandName}
        </Text>
        <Text
          hankenGroteskSemiBold={true}
          size="small"
          lineHeight="small"
          color={vehicleDetailColor ?? theme.colors.textPrimary}>
          {vehicleDetail}
        </Text>
        <View
          style={[
            styles.plateWrapper,
            {backgroundColor: plateBgColor, borderColor: plateBorderColor},
          ]}>
          <Text
            hankenGroteskBold={true}
            size={'small'}
            style={styles.plateText}>
            {plateNumber}
          </Text>
        </View>
      </View>
      {showRightIcon && <Image source={statusImg} style={styles.arrow} />}
    </View>
  );

  return (
    <Card
      cardContainerStyle={[
        styles.cardWrapper,
        cardStyle,
        {backgroundColor: wrapperColor ?? theme.colors.white},
        noMargin && {marginTop: 0},
      ]}
      onPress={onItemPress}
      noShadow={noShadow}>
      {renderHeader()}

      {!hideFooter && (
        <>
          <Spacing size="smd" />

          <RenderInfoBox
            labelColor={labelColor}
            infoValueColor={infoValueColor}
            infoWrapperColor={infoWrapperColor}
            footerInfo={footerInfo}
          />
        </>
      )}
      {lastUpdateStatus && (
        <>
          <Spacing size="smd" />
          <Text type={'caption'}>{lastUpdateStatus}</Text>
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
    marginTop: theme.sizes.spacing.md,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  arrow: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  plateWrapper: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  plateLogo: {
    width: 20,
    height: 14,
    marginRight: 6,
  },
  plateText: {
    letterSpacing: 2,
  },
});

export default VehicleCard;
