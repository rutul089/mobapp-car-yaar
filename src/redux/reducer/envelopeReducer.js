import {types} from '../actions';
import {PARTNER_ENVELOPE_VALUE} from '../actions/actionType';

const initialState = {
  partners: [], // fetchAllCustomers
  loading: false,
  totalPage: 1,
  page: 1,
};

const envelopeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_ENVELOPE_VALUE.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTNER_ENVELOPE_VALUE.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case PARTNER_ENVELOPE_VALUE.SUCCESS:
      return {
        ...state,
        loading: false,
        partners: action.payload,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default envelopeReducer;
