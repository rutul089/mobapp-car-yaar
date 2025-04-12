/* eslint-disable react-native/no-inline-styles */
import React, {memo, useMemo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import theme from '../theme';
import Text from './Text';

/**
 * @typedef {Object} InfoItem
 * @property {string} label - The label for the info.
 * @property {string | number} value - The value for the info.
 * @property {StyleProp<ViewStyle>=} style - Optional custom style for the info box.
 */

/**
 * @param {{
 *   footerInfo: InfoItem[],
 *   infoWrapperColor?: string,
 *   labelColor?: string,
 *   infoValueColor?: string,
 *   itemsPerRow?: number,
 *   containerStyle?: StyleProp<ViewStyle>,
 * }} props
 */
const RenderInfoBox = ({
  footerInfo = [],
  infoWrapperColor,
  labelColor,
  infoValueColor,
  itemsPerRow = 3,
  containerStyle,
}) => {
  const rows = useMemo(() => {
    const chunked = [];
    for (let i = 0; i < footerInfo.length; i += itemsPerRow) {
      chunked.push(footerInfo.slice(i, i + itemsPerRow));
    }
    return chunked;
  }, [footerInfo, itemsPerRow]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.footer,
        {backgroundColor: infoWrapperColor ?? theme.colors.background},
        containerStyle,
      ])}>
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[
            styles.row,
            rowIndex !== rows.length - 1 && {marginBottom: 10},
          ]}>
          {row.map((item, index) => (
            <View
              key={`item-${index}`}
              style={StyleSheet.flatten([styles.flexInfoBox, item?.style])}>
              <Text type="caption" color={labelColor}>
                {item.label}
              </Text>
              <Text hankenGroteskSemiBold size="small" color={infoValueColor}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderRadius: theme.sizes.borderRadius.md,
    padding: theme.sizes.spacing.smd,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexInfoBox: {
    flex: 1,
  },
});

export default memo(RenderInfoBox);
