import React from 'react';
import {View} from 'react-native';
import {Header, SafeAreaWrapper, Text} from '../../../components';

const Profile_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header title={'Profile'} />
      <Text>123</Text>
    </SafeAreaWrapper>
  );
};

export default Profile_Component;
