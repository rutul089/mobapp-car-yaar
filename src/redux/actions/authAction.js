import ScreenNames from '../../constants/ScreenNames';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import {clearLoginStatus} from '../../utils/storage';
import {resetAppState} from './appStateAction';
import types from './types';

export const setLoginStatus = isLoggedIn => ({
  type: types.SET_LOGIN_STATUS,
  payload: isLoggedIn,
});

export const logoutUser = () => {
  return async dispatch => {
    try {
      await clearLoginStatus();
      dispatch(resetAppState());
      setLoginStatus(false);
      navigateAndSimpleReset(ScreenNames.Login);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
};
