import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import images from '../../assets/images';
import {
  Button,
  Card,
  RadioButton,
  SafeAreaWrapper,
  Spacing,
  Text,
  DetailInfoCard,
} from '../../components';
import theme from '../../theme';

const Customer_Envelop_Component = ({
  vehicleDetails,
  loanDetails,
  onViewLenderPress,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      {/* Header */}
      <View style={styles.headerStyle}>
        <Image
          resizeMode="contain"
          source={images.verifiedIcon}
          style={styles.imageStyle}
        />
        <View style={styles.textWrapper}>
          <Text hankenGroteskBold={true} color={'#F8A902'}>
            #_ABC123
          </Text>
          <Text hankenGroteskBold={true} size={'h3'} color={'white'}>
            Yay! Your Customer Envelope Is Now Ready!
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.wrapper} bounces={false}>
        <View style={{padding: 0}}>
          <DetailInfoCard
            label={'Vehicle Details'}
            isSemiBold
            data={vehicleDetails}
          />
          <Spacing size="lg" />
          <DetailInfoCard
            label={'Loan Details'}
            isSemiBold
            data={loanDetails}
          />
          <Spacing size="lg" />
          <Card>
            <Text type={'label'} size={'caption'}>
              Select your CarYaar Sale Partner
            </Text>
            <Spacing size="smd" />
            <RadioButton label={'0123 - Partner Name'} selected={true} />
            <RadioButton label={'0123 - Partner Name'} />
            <RadioButton label={'0123 - Partner Name'} marginBottom={0} />
          </Card>
          <Spacing size="xl" />
          <Button label={'View Lenders'} onPress={onViewLenderPress} />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
  headerStyle: {
    backgroundColor: theme.colors.primaryBlack,
    borderWidth: 1,
    padding: theme.sizes.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    marginHorizontal: 16,
    width: '75%',
  },
  imageStyle: {height: 60, width: 60},
});

export default Customer_Envelop_Component;
