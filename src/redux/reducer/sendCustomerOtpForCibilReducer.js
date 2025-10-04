import {types} from '../actions';
import {CIBIL_SCORE} from '../actions/actionType';

const initialState = {
  loading: false,
  score: null,
  error: null,
};

const sendCustomerOtpForCibilReducer = (state = initialState, action) => {
  switch (action.type) {
    case CIBIL_SCORE.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CIBIL_SCORE.SUCCESS:
      return {
        ...state,
        loading: false,
        score: action.payload,
        error: null,
      };
    case CIBIL_SCORE.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default sendCustomerOtpForCibilReducer;
