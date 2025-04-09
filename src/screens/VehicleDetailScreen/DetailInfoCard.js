/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Pressable, Spacing, Text} from '../../components';
import theme from '../../theme';
import {isLastRow} from '../../utils/helper';

const DetailInfoCard = ({data = [], label, isSemiBold, children}) => {
  return (
    <>
      {!!label && (
        <>
          <Text>{label}</Text>
          <Spacing size="smd" />
        </>
      )}

      <Card padding={16}>
        {children}
        <View style={styles.container}>
          {data.map((item, index) => {
            return (
              <View
                style={[
                  styles.itemContainer,
                  {width: item?.full ? '100%' : '47%'},
                  isLastRow(index, data, item) && {
                    marginBottom: 0,
                  },
                ]}
                key={index}>
                <Text type="helper-text" size="caption">
                  {item.label}
                </Text>

                <Pressable onPress={item?.onPress} disabled={!item?.isButton}>
                  <Text
                    hankenGroteskMedium={!isSemiBold && !item?.isButton}
                    hankenGroteskSemiBold={isSemiBold}
                    hankenGroteskBold={item?.isButton}
                    color={
                      item?.isButton
                        ? theme.colors.primary
                        : theme.colors.textPrimary
                    }
                    size="small"
                    lineHeight="small">
                    {item.value}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
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
    marginBottom: 12,
  },
});

export default DetailInfoCard;
