import {
  Button,
  DetailInfoCard,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';

const MoreOn_Financial_Component = ({
  cibilList,
  officeVerificationList,
  homeVerificationList,
  onClosePress,
}) => (
  <SafeAreaWrapper backgroundColor={theme.colors.background}>
    <Header
      title="More On Financials"
      rightLabel="@1231313"
      showRightContent={true}
      onBackPress={() => goBack()}
    />
    <ScrollView contentContainerStyle={styles.wrapper}>
      <DetailInfoCard label={'CIBIL Score'} data={cibilList} isSemiBold={false}>
        <View style={styles.cibilWrapper}>
          <Text
            textAlign={'center'}
            color={theme.colors.primary}
            size={'h2'}
            hankenGroteskExtraBold={true}>
            812
          </Text>
          <Text type={'caption'} style={styles.textNote} textAlign={'center'}>
            Last updated on 12 Dec 2024, 10:34 AM
          </Text>
        </View>
      </DetailInfoCard>
      <Spacing size="lg" />
      <DetailInfoCard
        label={'Home Verification'}
        data={homeVerificationList}
        isSemiBold={false}
      />
      <Spacing size="lg" />
      <DetailInfoCard
        label={'Office Verification'}
        data={officeVerificationList}
        isSemiBold={false}
      />
      <Spacing size="xl" />
      <Button label={'Close'} onPress={onClosePress} />
    </ScrollView>
  </SafeAreaWrapper>
);

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
  cibilWrapper: {
    minHeight: 80,
    borderRadius: 8,
    backgroundColor: '#1D95F020',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  textNote: {width: '80%', marginTop: 5},
});

export default MoreOn_Financial_Component;
