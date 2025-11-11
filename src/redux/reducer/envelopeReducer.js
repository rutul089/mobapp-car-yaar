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
      console.log('!231231313', action);
      return {
        ...state,
        loading: false,
        partners: action.payload,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

      const deletedId = action.payload?.data?.id;

      return {
        ...state,
        loading: false,
        customers: state.customers.filter(
          data => data?.customerId !== deletedId,
        ),
        searchCustomer: state.searchCustomer.filter(
          data => data?.customerId !== deletedId,
        ),
        selectedCustomer:
          state.selectedCustomerId === deletedId
            ? null
            : state.selectedCustomer,
        selectedCustomerId:
          state.selectedCustomerId === deletedId
            ? null
            : state.selectedCustomerId,
      };

    default:
      return state;
  }
};

export default envelopeReducer;
