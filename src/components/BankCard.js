import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, RenderInfoBox, Text} from './';
import images from '../assets/images';
import theme from '../theme';
import Spacing from './Spacing';

const BankCard = ({
  logoUri,
  bankName,
  interestRate,
  tenure,
  emi,
  processingFee,
  footerInfo,
}) => {
  return (
    <Card>
      <Image
        source={images.hdfcImg}
        style={styles.bankLogo}
        resizeMode="cover"
      />
      <Spacing size="smd" />
      <View style={styles.bankInfo}>
        <Text hankenGroteskMedium={true} lineHeight={'body'}>
          {bankName}
        </Text>
        <Text
          hankenGroteskSemiBold={true}
          size={'small'}
          lineHeight={'small'}
          color={theme.colors.primary}>
          {interestRate}
        </Text>
      </View>
      <Spacing size="smd" />
      <RenderInfoBox footerInfo={footerInfo} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 8,
  },
  bankHeader: {
    backgroundColor: '#00449E',
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  bankLogo: {
    height: 80,
    flex: 1,
    width: '100%',
    borderRadius: theme.sizes.borderRadius.card,
  },
  bankInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

// export default React.memo(BankCard);
export default BankCard;
