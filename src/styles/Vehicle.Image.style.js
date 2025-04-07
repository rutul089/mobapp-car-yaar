import {StyleSheet} from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {fontSize: 20, fontWeight: 'bold', marginBottom: 12},
  row: {justifyContent: 'space-between'},
  buttonRow: {
    marginVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4, // Small spacing between buttons
  },
});
