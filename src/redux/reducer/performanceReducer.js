import {types} from '../actions';
import {PARTNER_PERFORMANCE} from '../actions/actionType';

const initialState = {
  loading: false,
  partnerStats: {},
};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_PERFORMANCE.REQUEST:
      return {
        ...state,
        loading: false,
      };
    case PARTNER_PERFORMANCE.SUCCESS:
      return {
        ...state,
        loading: false,
        partnerStats: action.payload.data,
      };

    case PARTNER_PERFORMANCE.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default performanceReducer;
