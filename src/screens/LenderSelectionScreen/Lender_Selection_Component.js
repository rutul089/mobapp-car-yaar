import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {FinanceCard, Header, SafeAreaWrapper} from '../../components';
import theme from '../../theme';

const Lender_Selection_Component = ({params}) => {
  const dummyData = Array.from({length: 10});

  return (
    <SafeAreaWrapper>
      <Header />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#F3F4F6',
          padding: theme.sizes.padding,
        }}>
        {dummyData.map((_, index) => (
          <FinanceCard key={index} />
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default Lender_Selection_Component;
