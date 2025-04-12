import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import {Card, RenderInfoBox, Spacing, Text} from './';

const BankCard = ({logoUri, bankName, interestRate, footerInfo}) => {
  return (
    <Card>
      <Image
        source={logoUri || images.hdfcImg}
        style={styles.bankLogo}
        resizeMode="cover"
      />
      <Spacing size="smd" />
      <View style={styles.bankInfo}>
        <Text hankenGroteskMedium lineHeight="body">
          {bankName}
        </Text>
        <Text
          hankenGroteskSemiBold
          size="small"
          lineHeight="small"
          color={theme.colors.primary}>
          {interestRate}
        </Text>
      </View>
      {footerInfo && (
        <>
          <Spacing size="smd" />
          <RenderInfoBox footerInfo={footerInfo} />
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  bankLogo: {
    height: 80,
    width: '100%',
    borderRadius: theme.sizes.borderRadius.card,
  },
  bankInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default React.memo(BankCard);
