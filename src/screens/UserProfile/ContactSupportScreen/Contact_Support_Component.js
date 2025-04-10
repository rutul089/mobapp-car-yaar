import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Card, Header, SafeAreaWrapper, Text} from '../../../components';
import {goBack} from '../../../navigation/NavigationUtils';
import theme from '../../../theme';

const Contact_Support_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header title={'Contact Support'} onBackPress={() => goBack()} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Card>
          <Text color={theme.colors.textSecondary}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
    flexGrow: 1,
  },
});

export default Contact_Support_Component;
