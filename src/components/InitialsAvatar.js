import {Text} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const InitialsAvatar = ({name, size = 42, fontSize = 'small'}) => {
  const getInitials = value =>
    value
      ?.trim()
      ?.split(/\s+/)
      ?.slice(0, 2)
      ?.map(word => word[0])
      ?.join('')
      ?.toUpperCase() || '';
  return (
    <View
      style={[
        styles.avatar,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      <Text size={fontSize} color={'#1D95F0'} hankenGroteskBold>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#1D95F020',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitialsAvatar;
