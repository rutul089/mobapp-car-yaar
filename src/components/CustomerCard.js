/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import {Button, Card, Spacing, Text, RenderInfoBox} from '.';

const CustomerCard = ({
  customerId,
  customerName,
  customerNote,
  customerIdColor,
  customerNameColor,
  customerNoteColor,
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
}) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={logo || images.placeholder_image} style={styles.logo} />
      <View style={styles.flex}>
        <Text
          hankenGroteskSemiBold={true}
          size="small"
          lineHeight="small"
          color={customerIdColor ?? '#F8A902'}>
          {customerId}
        </Text>
        <Text
          hankenGroteskSemiBold={true}
          size="small"
          lineHeight="small"
          color={customerNameColor ?? theme.colors.textPrimary}>
          {customerName}
        </Text>
        <Text
          size="small"
          lineHeight="small"
          color={customerNoteColor ?? theme.colors.textSecondary}>
          {customerNote}
        </Text>
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

      <Spacing size="smd" />

      <RenderInfoBox
        labelColor={labelColor}
        infoValueColor={infoValueColor}
        infoWrapperColor={infoWrapperColor}
        footerInfo={footerInfo}
      />

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
});

export default CustomerCard;
