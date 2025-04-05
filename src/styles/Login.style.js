import {StyleSheet} from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: 45,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    // paddingVertical: 12,
    fontSize: 18,
    marginBottom: 16,
    height: 48,
    backgroundColor: '#f9f9f9',
    fontFamily: theme.typography.fonts.hankenGroteskBold,
    fontWeight: theme.typography.fontWeights.bold,
  },
  button: {
    borderRadius: 12,
    height: 45,
  },
  gradient: {
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  labelIcon: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
