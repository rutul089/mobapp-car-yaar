import {StyleSheet} from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    borderRadius: theme.sizes.borderRadius.jumbo,
  },
  bell: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    backgroundColor: theme.colors.gray900,
    borderRadius: theme.sizes.borderRadius.jumbo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  statBox: {
    width: '31%',
    backgroundColor: theme.colors.gray900,
    borderRadius: theme.sizes.borderRadius.xl,
    padding: theme.sizes.spacing.smd,
  },
  header: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.spacing.md,
  },
  scrollSection: {
    padding: theme.sizes.padding,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  carTypeBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: theme.sizes.spacing.md,
    borderRadius: theme.sizes.borderRadius.xxl,
    marginRight: 8,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
  },
  carTypeBoxSelected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  carTypeIcon: {
    width: theme.sizes.icons.lg,
    height: theme.sizes.icons.lg,
    marginBottom: 8,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#007BFF',
    width: theme.sizes.icons.smd,
    height: theme.sizes.icons.smd,
    borderRadius: theme.sizes.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCheck: {height: theme.sizes.icons.md, width: theme.sizes.icons.md},
  loanTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  loanTypeItem: {
    width: '31%',
    backgroundColor: '#fff',
    padding: theme.sizes.spacing.md,
    borderRadius: theme.sizes.borderRadius.lg,
  },
  loanIcon: {
    width: theme.sizes.icons.iconXXLarge,
    height: theme.sizes.icons.iconXXLarge,
    marginRight: 10,
  },
});
