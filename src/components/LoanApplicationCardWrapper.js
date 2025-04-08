import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '.';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';

const LoanApplicationCardWrapper = ({
  status,
  applicationNumber,
  showApplicationNumber = true,
  children,
}) => {
  return (
    <LinearGradient
      colors={['#E8E8E8', '#E8E8E8']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{borderRadius: theme.sizes.borderRadius.card}}>
      <View style={{padding: 5}}>
        <View style={styles.headerRow}>
          <Text type={'caption'} hankenGroteskSemiBold lineHeight={'body'}>
            {`#${applicationNumber}`}
          </Text>
          <Text hankenGroteskSemiBold={true}>{status}</Text>
        </View>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});

export default LoanApplicationCardWrapper;
