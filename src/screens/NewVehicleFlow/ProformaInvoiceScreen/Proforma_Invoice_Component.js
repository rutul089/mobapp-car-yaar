import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  Card,
  CurrencySlider,
  Header,
  images,
  ImageUploadButton,
  Input,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import {goBack} from '../../../navigation/NavigationUtils';
import {formatIndianNumber} from '../../../utils/helper';

const Proforma_Invoice_Component = ({
  button1Press,
  button2Press,
  exShowroomPrice,
  tcs,
  roadSafetyCes,
  insurance,
  discount,
  onRoadPrice,
  registrationCharges,
  fastag,
  handleOnProceed,
}) => {
  const [amount, setAmount] = React.useState(500000);
  const [tenure, setTenure] = React.useState(24);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isScrollEnable, setScrollEnable] = React.useState(true);

  const invoiceDetail = () => {
    return (
      <>
        <Text>Invoice Details</Text>
        <Spacing size="smd" />
        <Card>
          <Input
            label="Ex-Showroom Price"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="TCS"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Road Tax"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="Registration Charges"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.icRupee}
                label="FASTag"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <Spacing size="md" />
          <Input
            label="Road Safety CES"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Insurance"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Discount"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="On Road Price"
            leftIconName={images.icRupee}
            keyboardType={'decimal-pad'}
            isLeftIconVisible
          />
        </Card>
      </>
    );
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Proforma Invoice"
        onBackPress={() => goBack()}
        rightLabel="_@11231"
        showRightContent={true}
      />
      <KeyboardAwareScrollView
        scrollEnabled={isScrollEnable}
        contentContainerStyle={styles.wrapper}>
        {invoiceDetail()}
        <>
          <Spacing size="lg" />
          <Text>Loan Details</Text>
          <Spacing size="smd" />
          <Card>
            <CurrencySlider
              value={amount}
              onValueChange={v => {
                setAmount(v);
              }}
              label={'Loan Amount'}
              labelEnd={'₹72,90,000'}
              labelStart={'₹0'}
              step={10000}
              onSlidingStart={() => setScrollEnable(false)}
              onSlidingComplete={() => setScrollEnable(true)}
            />
            <Spacing size="smd" />
            <Input
              isLeftIconVisible={true}
              leftIconName={images.icRupee}
              onChangeText={v => {
                const numericValue = v.replace(/\D/g, '');
                setAmount(numericValue);
              }}
              value={isEditing ? amount + '' : `${formatIndianNumber(amount)}`}
              keyboardType="number-pad"
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
            />
            <Spacing size="md" />
            <CurrencySlider
              value={tenure}
              onValueChange={v => {
                setTenure(v);
                console.log(v);
              }}
              label={'Tenure'}
              min={0}
              max={72}
              minLabel={'12 Months'}
              maxLabel={'72 Months'}
              step={1}
              onSlidingStart={() => setScrollEnable(false)}
              onSlidingComplete={() => setScrollEnable(true)}
            />
            <Spacing size="smd" />
            <Input
              isLeftIconVisible={true}
              leftIconName={images.icRupee}
              onChangeText={v => {
                const numericValue = v.replace(/\D/g, '');
                setTenure(numericValue);
              }}
              value={isEditing ? tenure + '' : `${tenure} Months`}
              keyboardType="number-pad"
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              // rightLabel="Months"
            />
            <Spacing size="md" />
            <ImageUploadButton
              label={'Quote (Optional)'}
              btnLabel={'Click to Upload Quote Image/PDF'}
            />
          </Card>
        </>
        <Spacing size="xl" />
        <Button label={'Proceed'} onPress={handleOnProceed} />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

export default Proforma_Invoice_Component;

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  halfWidth: {
    width: '47%',
  },
});
