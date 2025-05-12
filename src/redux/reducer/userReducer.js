import {types} from '../actions';

const initialState = {
  userDetails: null,
  userProfile: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case types.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case types.UPDATE_USER_DETAIL_FIELD:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.key]: action.payload.value,
        },
      };
    case types.FETCH_USER_REQUEST:
      return {...state, loading: true, error: null};

    case types.FETCH_USER_SUCCESS:
      return {...state, loading: false, userProfile: action.payload?.data};
    case types.UPDATE_USER_SUCCESS:
      return {...state, loading: false, userProfile: action.payload?.data};

    case types.FETCH_USER_FAILURE:
      return {...state, loading: false, error: action.payload};
    case types.USER_LOADING:
      return {...state, loading: true};
    case types.USER_SUCCESS:
    case types.USER_FAILURE:
    case types.UPDATE_USER_FAILURE:
      return {...state, loading: false};

    case types.CLEAR_USER_DETAILS:
    case types.RESET_APP_STATE:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
