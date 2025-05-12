import {types} from '../actions';

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default authReducer;
