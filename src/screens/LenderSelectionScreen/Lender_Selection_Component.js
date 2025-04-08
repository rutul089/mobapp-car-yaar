import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {FinanceCard, Header, SafeAreaWrapper, Text} from '../../components';
import theme from '../../theme';
import {goBack} from '../../navigation/NavigationUtils';

const Lender_Selection_Component = ({params, onItemPress = () => {}}) => {
  const financeData = [
    {
      title: 'Fortune Finance',
      interestRate: '8.96',
      tenure: '60 Months',
      emi: '11,093',
      processingFee: '1,000',
      badge: 1,
      showBadge: true,
    },
    {
      title: 'Speed Loans',
      interestRate: '9.50',
      tenure: '48 Months',
      emi: '12,420',
      processingFee: '1,250',
      badge: 2,
      showBadge: true,
    },
    {
      title: 'HDB Financial Services',
      interestRate: '9.50',
      tenure: '48 Months',
      emi: '12,420',
      processingFee: '1,250',
      badge: 4,
      showBadge: true,
    },
    {
      title: 'HDB Financial Services',
      interestRate: '9.50',
      tenure: '48 Months',
      emi: '12,420',
      processingFee: '1,250',
      badge: 3,
      showBadge: true,
    },
  ];

  const renderItem = ({item}) => (
    <FinanceCard {...item} onItemPress={() => onItemPress(item)} />
  );

  return (
    <SafeAreaWrapper>
      <Header
        title="Lender Selection"
        subtitle="GJ 01 JR 0945"
        onBackPress={() => goBack()}
      />
      <FlatList
        data={financeData}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text>Tailored Loans for #ABC123</Text>}
      />
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Lender_Selection_Component;
