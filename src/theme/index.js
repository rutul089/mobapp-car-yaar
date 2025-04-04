import {Platform} from 'react-native';
import typography from './typography';
import sizes from './sizes';

const isIos = () => {
  return Platform.OS === 'ios';
};

const theme = {
  sizes,
  typography,
  isIos,
};

export {theme};
export default theme;
