import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text';

const RenderInfoBox = ({
  infoWrapperColor,
  footerInfo = [],
  labelColor,
  infoValueColor,
}) => {
  // Group items into rows of 3
  const rows = [];
  for (let i = 0; i < footerInfo.length; i += 3) {
    rows.push(footerInfo.slice(i, i + 3));
  }

  return (
    <View
      style={[
        styles.footer,
        {backgroundColor: infoWrapperColor ?? theme.colors.background},
      ]}>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            rowIndex !== rows.length - 1 && {marginBottom: 10},
          ]}>
          {row.map((item, index) => (
            <View key={index} style={[styles.flexInfoBox, item?.style]}>
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
    backgroundColor: theme.colors.background,
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

export default RenderInfoBox;

// const RenderInfoBox = ({
//   infoWrapperColor,
//   footerInfo = [],
//   labelColor,
//   infoValueColor,
// }) => {
//   const isGrid = footerInfo.length > 3;

//   return (
//     <View
//       style={[
//         styles.footer,
//         {backgroundColor: infoWrapperColor ?? theme.colors.background},
//       ]}>
//       {footerInfo.map((item, index) => {
//         const isFirstRow = isGrid && index < 3;

//         return (
//           <View
//             style={[
//               styles.flexInfoBox,
//               isGrid && isFirstRow && {marginBottom: 10},
//             ]}
//             key={index}>
//             <Text type="caption" color={labelColor}>
//               {item.label}
//             </Text>
//             <Text hankenGroteskSemiBold size="small" color={infoValueColor}>
//               {item.value}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     // flexDirection: 'row',
//     // flexWrap: 'wrap',
//     // justifyContent: 'space-between',
//     marginTop: 12,
//     backgroundColor: theme.colors.background,
//     borderRadius: theme.sizes.borderRadius.md,
//     padding: theme.sizes.spacing.smd,
//   },
//   flexInfoBox: {
//     // flexGrow: 1,
//     // flexShrink: 1,
//     // flexBasis: 'auto',
//     width: '33%',
//     // marginBottom: 12,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
// });

// export default RenderInfoBox;
