import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spacing, Text} from '../../components';
import theme from '../../theme';

const DetailInfoCard = ({data, label}) => {
  return (
    <>
      {label && (
        <>
          <Text>{label}</Text>
          <Spacing size="smd" />
        </>
      )}

      <View style={styles.container}>
        {data.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Text type={'helper-text'} size={'caption'}>
              {item.label}
            </Text>
            <Text
              hankenGroteskMedium={true}
              size={'small'}
              lineHeight={'small'}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: theme.sizes.borderRadius.card,
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '47%',
    marginVertical: 8,
  },
});

export default DetailInfoCard;
