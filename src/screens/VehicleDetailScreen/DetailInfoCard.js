import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Spacing, Text} from '../../components';

const DetailInfoCard = ({data, label, isSemiBold}) => {
  return (
    <>
      {label && (
        <>
          <Text>{label}</Text>
          <Spacing size="smd" />
        </>
      )}

      <Card cardContainerStyle={styles.container}>
        {data.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Text type={'helper-text'} size={'caption'}>
              {item.label}
            </Text>
            <Text
              hankenGroteskMedium={!isSemiBold}
              hankenGroteskSemiBold={isSemiBold}
              size={'small'}
              lineHeight={'small'}>
              {item.value}
            </Text>
          </View>
        ))}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '47%',
    marginVertical: 8,
  },
});

export default DetailInfoCard;
