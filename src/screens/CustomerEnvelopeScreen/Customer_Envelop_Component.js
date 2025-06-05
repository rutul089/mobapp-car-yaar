import {Image, StyleSheet, View} from 'react-native';

import {
  AutocompleteInput,
  Button,
  Card,
  DetailInfoCard,
  images,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useInputRefs} from '../../utils/useInputRefs';

const Customer_Envelop_Component = ({
  vehicleDetails,
  loanDetails,
  onViewLenderPress,
  loanApplicationId,
  onPartnerChange,
  searchPartnerFromAPI,
  onSelectPartner,
  onSalesExecutiveChange,
  searchSalesExecutiveFromAPI,
  onSelectSalesExecutive,
  restInputProps = {},
}) => {
  const {refs, focusNext, scrollToInput} = useInputRefs([
    'partner',
    'salesExecutive',
  ]);
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
          {loanApplicationId && (
            <Text hankenGroteskBold={true} color={'#F8A902'}>
              {loanApplicationId}
            </Text>
          )}
          <Text hankenGroteskBold={true} size={'h3'} color={'white'}>
            Yay! Your Customer Envelope Is Now Ready!
          </Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        bounces={false}>
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
            <AutocompleteInput
              ref={refs.partner}
              restProps={{
                label: 'CarYaar Partner *',
                isLeftIconVisible: true,
                leftIconName: images.user,
                returnKeyType: 'next',
                onSubmitEditing: () => focusNext('salesExecutive'),
                onFocus: () => scrollToInput('partner'),
              }}
              onChangeText={onPartnerChange}
              fetchSuggestions={searchPartnerFromAPI}
              onSelectSuggestion={onSelectPartner}
              value={restInputProps?.carYarPartner?.value || ''}
              suggestionTextKey={'name'}
              {...(restInputProps?.carYarPartner || {})}
            />
            <Spacing size="md" />
            <AutocompleteInput
              ref={refs.salesExecutive}
              restProps={{
                label: 'CarYaar Sales Exec *',
                isLeftIconVisible: true,
                leftIconName: images.user,
                returnKeyType: 'next',
              }}
              onChangeText={onSalesExecutiveChange}
              fetchSuggestions={searchSalesExecutiveFromAPI}
              onSelectSuggestion={onSelectSalesExecutive}
              value={restInputProps?.salesExecutive?.value || ''}
              suggestionTextKey={'user.name'}
              {...(restInputProps?.salesExecutive || {})}
            />
          </Card>
          <Spacing size="xl" />
          <Button label={'View Lenders'} onPress={onViewLenderPress} />
        </View>
      </KeyboardAwareScrollView>
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
