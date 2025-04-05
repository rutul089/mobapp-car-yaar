import {StyleSheet} from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    marginVertical: 2,
    fontSize: theme.typography.fontSizes.body,
  },
  bodyText: {
    fontFamily: theme.typography.fonts.hankenGroteskRegular,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeights.normal,
    fontSize: theme.typography.fontSizes.body,
  },
  helperText: {
    fontFamily: theme.typography.fonts.hankenGroteskRegular,
    color: theme.colors.textLabel,
    fontWeight: theme.typography.fontWeights.normal,
    fontSize: theme.typography.fontSizes.small,
  },
  largeHeader: {
    fontFamily: theme.typography.fonts.hankenGroteskExtraBold,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeights.extraBold,
    fontSize: theme.typography.fontSizes.h1,
  },
});
