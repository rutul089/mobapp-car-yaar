import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../theme';
import Pressable from './Pressable';

const Card = ({
  cardContainerStyle,
  card,
  children,
  padding,
  noShadow,
  onPress,
  style,
}) => {
  let _padding = padding ?? 20;

  const iCardStyle = StyleSheet.flatten([
    styles.card,
    {padding: _padding},
    noShadow && styles.noShadow,
    cardContainerStyle,
  ]);

  return (
    <Pressable disabled={!onPress} onPress={onPress} style={style}>
      <View style={iCardStyle}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: theme.sizes.borderRadius.card,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
  },
  noShadow: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowOffset: {width: 0, height: 0},
  },
});

export default Card;
