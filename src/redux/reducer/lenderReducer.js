import {types} from '../actions';
import {FETCH_LENDERS} from '../actions/actionType';

const initialState = {
  lenders: [],
  loading: false,
  error: null,
  totalPage: 1,
  page: 1,
};

const lenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LENDERS.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_LENDERS.SUCCESS:
      const {
        lenders,
        pagination: {page, totalPages},
      } = action.payload;
      return {
        ...state,
        loading: false,
        lenders: page > 1 ? [...state.lenders, ...lenders] : lenders,
        page,
        totalPage: totalPages,
      };

    case FETCH_LENDERS.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.RESET_APP_STATE:
      return initialState;
    default:
      return state;
  }
};

export default lenderReducer;
