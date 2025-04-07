import {StyleSheet} from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
  optionalLabelContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  optionalLabelStyles: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: theme.sizes.borderRadius.md,
    borderColor: '#303437',
    borderWidth: 1,
    paddingHorizontal: 15,
    // backgroundColor: colors.black2,
  },
  input: {
    flex: 1,
    width: '80%',
    paddingRight: 5,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.small,
    ...theme.typography.fontStyles.hankenGroteskSemiBold,
    //   top: Device.isAndroid() ? 0.8 : 0,
    //   textAlignVertical: 'bottom',
  },
  searchIconStyle: {
    marginLeft: 5,
  },
  leftIcnStyle: {
    marginRight: theme.sizes.spacing.sm,
    flexDirection: 'row',
  },
  errorMsg: {
    alignSelf: 'flex-start',
  },
  iconStyle: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.inputBorder,
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 8, // or any spacing you need
    alignItems: 'center',
  },
  statusIcon: {
    height: theme.sizes.icons.sm,
    width: theme.sizes.icons.sm,
    marginRight: 5,
  },
});
