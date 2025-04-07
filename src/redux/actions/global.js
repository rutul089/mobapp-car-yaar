import types from './types';

export const loadingSet = () => ({type: types.API_LOADING_START});

export const loadingUnset = () => ({type: types.API_LOADING_STOP});

export const noInternetConnected = isConnected => ({
  type: types.IS_INTERNET_CONNECTED,
  payload: isConnected,
});

export const userDetail = userData => ({
  type: types.USER_DETAIL,
  payload: userData,
});

export const userProfile = userData => ({
  type: types.USER_PROFILE,
  payload: userData,
});
