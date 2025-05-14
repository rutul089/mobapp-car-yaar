import {types} from '../actions';
import {FETCH_CUSTOMERS, CLEAR_SEARCH} from '../actions/actionType';

const initialState = {
  customers: [], // fetchAllCustomers
  selectedCustomer: null, // fetchCustomerDetailsById
  loanDetail: null, //fetchCustomerLoanAmount
  documentDetail: null, // fetchCustomerDocuments
  loading: false,
  error: null,
  selectedCustomerId: null, //customerId
  totalPage: 1,
  page: 1,
  searchCustomer: [], // For Get all Search Vehicle
  searchPage: 1,
  searchTotalPages: 1,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CUSTOMERS.SUCCESS:
      const {
        customers,
        pagination: {page, totalPages},
        isSearch,
      } = action.payload;

      if (isSearch) {
        return {
          ...state,
          loading: false,
          searchCustomer:
            page > 1 ? [...state.searchCustomer, ...customers] : customers,
          searchPage: page,
          searchTotalPages: totalPages,
        };
      } else {
        return {
          ...state,
          loading: false,
          customers: page > 1 ? [...state.customers, ...customers] : customers,
          page,
          totalPage: totalPages,
        };
      }
    // return {
    //   ...state,
    //   customers:
    //     action.payload.page === 1
    //       ? action.payload.data
    //       : [...state.customers, ...action.payload.data], // If it's not, append data
    //   // allVehicles: {
    //   //   data:
    //   //     action.payload.page === 1
    //   //       ? action.payload.data // If it's the first page, overwrite data
    //   //       : [...state.allVehicles.data, ...action.payload.data], // If it's not, append data
    //   // },
    //   totalPage: action.payload.totalPages,
    //   page: action.payload.page,
    //   loading: false,
    // };

    case FETCH_CUSTOMERS.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_SEARCH.SUCCESS:
      return {
        ...state,
        searchCustomer: [],
        searchPage: 1,
        searchTotalPages: 1,
        loading: false,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default customerReducer;
