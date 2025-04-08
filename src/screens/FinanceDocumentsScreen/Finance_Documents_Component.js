import React from 'react';
import {View} from 'react-native';
import {Header, SafeAreaWrapper, Text} from '../../components';
import {goBack} from '../../navigation/NavigationUtils';

const Finance_Documents_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header
        title="Finance Details"
        subtitle="GJ 01 JR 0945"
        rightLabel="ABC123"
        showRightContent={true}
        onBackPress={() => goBack()}
      />
    </SafeAreaWrapper>
  );
};

export default Finance_Documents_Component;
