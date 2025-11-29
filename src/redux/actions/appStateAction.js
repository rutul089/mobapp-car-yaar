import {SET_NETWORK_STATUS} from './actionType';
import types from './types';

export const setNetworkStatus = status => ({
  type: SET_NETWORK_STATUS.SUCCESS,
  payload: status,
});

export const setNotificationCount = count => ({
  type: types.SET_NOTIFICATION_COUNT,
  payload: count,
});

export const resetAppState = () => ({
  type: types.RESET_APP_STATE,
});
