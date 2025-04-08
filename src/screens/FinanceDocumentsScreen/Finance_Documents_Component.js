import React from 'react';
import {View} from 'react-native';
import {Header, SafeAreaWrapper, Text} from '../../components';

const Finance_Documents_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header
        title="Finance Details"
        subtitle="GJ 01 JR 0945"
        rightLabel="ABC123"
        showRightContent={true}
      />
    </SafeAreaWrapper>
  );
};

export default Finance_Documents_Component;
