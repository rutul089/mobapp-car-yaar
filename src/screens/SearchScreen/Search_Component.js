/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Header, Input, SafeAreaWrapper} from '../../components';
import {styles} from '../../styles/Search.style';
import theme from '../../theme';

const Search_Component = ({params, onBackPress}) => {
  return (
    <SafeAreaWrapper
      statusBarColor={theme.colors.primaryBlack}
      backgroundColor={theme.colors.background}>
      <Header title="Search Vehicle Number" onBackPress={onBackPress} />
      <View style={styles.wrapper}>
        <Input
          label={'Vehicle Register Number'}
          optionalLabelContainerStyles={{alignSelf: 'center'}}
          labelStyles={{fontSize: theme.typography.fontSizes.body}}
          inputContainerBackgroundColor={'white'}
          inputContainerBackgroundColorFocused={'white'}
          inputStyles={styles.inputStyle}
          returnKeyType="done"
          autoFocus
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default Search_Component;
