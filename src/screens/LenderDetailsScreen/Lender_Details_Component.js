/* eslint-disable react-native/no-inline-styles */
import {
  BankCard,
  Button,
  Card,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';

import images from '../../assets/images';
import {formatIndianNumber} from '../../utils/helper';

const Lender_Details_Component = ({onHoldProceedPress}) => {
  const result = 1.2 * 1000000 - 600000 - 10000; // 590000
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header
        title="Lender Details"
        onBackPress={() => goBack()}
        subtitle="GJ 01 JR 0945"
      />
      <ScrollView contentContainerStyle={styles.wrapper} bounces={false}>
        <Text>
          You are eligible for{' '}
          <Text hankenGroteskBold={true} color={'rgba(248, 169, 2, 1)'}>
            ABC123
          </Text>
        </Text>
        <Spacing size="smd" />
        <BankCard
          logoUri="https://cdn.logojoy.com/wp-content/uploads/2018/05/30160248/8_big15-768x591.png"
          bankName="HDFC Bank"
          interestRate="8.96%"
          footerInfo={[
            {label: 'Tenure', value: '60 Month'},
            {label: 'EMI', value: formatIndianNumber('75000.12')},
            {label: 'Processing Fee', value: formatIndianNumber(5000)},
          ]}
        />
        <Spacing size="lg" />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Cash in hand</Text>
          <Image
            source={images.info}
            style={{height: 13, width: 13, marginLeft: 5}}
          />
        </View>
        <Spacing size="smd" />
        <Card>
          <Text size={'small'} textAlign={'center'}>
            (1.2 x 10,00,000) - 6,00,000 - 10,000
          </Text>
          <Spacing size="smd" />
          <View
            style={{
              flex: 1,
              borderRadius: 12,
              height: 56,
              backgroundColor: '#6EEE8740',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text hankenGroteskExtraBold={true} size={'h2'} color={'#5FC52E'}>
              {formatIndianNumber(result, false)}
            </Text>
          </View>
        </Card>
        <Spacing size="xl" />
        <Button label={'Proceed'} onPress={onHoldProceedPress} />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
});

export default Lender_Details_Component;
