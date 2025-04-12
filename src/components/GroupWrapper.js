import React from 'react';
import {View} from 'react-native';
import {Card, Spacing, Text} from './';

/**
 * @param {{
 *   title: string,
 *   children: React.ReactNode,
 *   containerStyle?: object,
 *   titleStyle?: object,
 *   cardStyle?: object,
 * }} props
 */
const GroupWrapper = ({
  title,
  children,
  containerStyle,
  titleStyle,
  cardStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={[titleStyle]}>{title}</Text>
      <Spacing size="smd" />
      <Card style={cardStyle}>{children}</Card>
    </View>
  );
};

export default GroupWrapper;
