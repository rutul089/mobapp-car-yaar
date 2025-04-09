import React from 'react';
import {View} from 'react-native';
import {Header, SafeAreaWrapper, Text} from '../../../components';
import {goBack} from '../../../navigation/NavigationUtils';

const Change_Password_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Change Password" onBackPress={() => goBack()} />
      <Text>123</Text>
    </SafeAreaWrapper>
  );
};

export default Change_Password_Component;
