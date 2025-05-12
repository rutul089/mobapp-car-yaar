import {types} from '../actions';

const initialState = {
  loading: false,
  isInternetConnected: true,
  notificationCount: 0,
};

const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_LOADING:
      return {...state, loading: true};

    case types.STOP_LOADING:
      return {...state, loading: false};

    case types.SET_NETWORK_STATUS:
      return {
        ...state,
        isInternetConnected: action.payload,
        loading: action.payload === false ? false : state.loading,
      };

    case types.SET_NOTIFICATION_COUNT:
      return {...state, notificationCount: action.payload};

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default appStateReducer;
