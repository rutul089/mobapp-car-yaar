import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const steps = [
  {
    title: 'Vehicle onboarding',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Customer onboarding',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Lender selection',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Credit - Document verification & approval',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Lender submission',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Lender approval',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'DO released',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Ops verifies the DO',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Loan disbursement',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Collection of RC & other docs by PDA',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'RTO charge calculation',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Customer agrees to the RTO charges',
    date: '12 Jan 2025, 3:30 PM',
    completed: true,
  },
  {
    title: 'Ops ledgers all the invoices',
    completed: false,
  },
  {
    title: 'Finance team transfers the amount',
    completed: false,
  },
  {
    title: 'RC transfer is complete',
    completed: false,
  },
  {
    title: 'Ops verifies the RC transfer & approves',
    completed: false,
  },
  {
    title: 'Held back amount is now released',
    completed: false,
  },
  {
    title: 'Finance marks the ticket as closed',
    completed: false,
    isFinal: true,
  },
];

const StepItem = ({item, isLast}) => {
  return (
    <View style={styles.stepRow}>
      <View style={styles.iconContainer}>
        <View style={[styles.dot, item.completed && styles.dotCompleted]}>
          {item.completed && (
            <View style={{height: 20, width: 20, backgroundColor: 'red'}} />
          )}
        </View>
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, item.completed && styles.titleCompleted]}>
          {item.title}
        </Text>
        {item.date && <Text style={styles.date}>{item.date}</Text>}
      </View>
    </View>
  );
};

const LoanTrackingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Tracking ID <Text style={{color: '#F8A902'}}>#LA0001</Text>
      </Text>
      <FlatList
        data={steps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <StepItem item={item} isLast={index === steps.length - 1} />
        )}
        contentContainerStyle={{paddingBottom: 32}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    width: 30,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCompleted: {
    backgroundColor: '#3498db',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  titleCompleted: {
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default LoanTrackingScreen;
