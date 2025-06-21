import {types} from '../actions';
import {
  CLEAR_SEARCH,
  CLEAR_SELECTED_CUSTOMER,
  CREATE_CUSTOMER_BASIC_DETAIL,
  CUSTOMER_MORE_FINANCE,
  FETCH_CUSTOMER_DETAIL,
  FETCH_CUSTOMER_DOCUMENT,
  FETCH_CUSTOMERS,
  KYC_ACTION,
} from '../actions/actionType';

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
  moreOnFinance: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS.REQUEST:
    case FETCH_CUSTOMER_DETAIL.REQUEST:
    case FETCH_CUSTOMER_DOCUMENT.REQUEST:
    case CREATE_CUSTOMER_BASIC_DETAIL.REQUEST:
    case CUSTOMER_MORE_FINANCE.REQUEST:
    case KYC_ACTION.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CUSTOMER_BASIC_DETAIL.FAILURE:
    case CUSTOMER_MORE_FINANCE.FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS:
      return {
        ...state,
        loading: false,
        // selectedCustomer: {details: action.payload?.data},
        selectedCustomer: {
          ...state.selectedCustomer,
          details: action.payload?.data,
        },
        selectedCustomerId: action.payload?.customerId,
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

    case FETCH_CUSTOMER_DETAIL.SUCCESS:
      return {
        ...state,
        loading: false,
        selectedCustomer: action?.payload,
        selectedCustomerId: action?.payload?.id,
      };

    case FETCH_CUSTOMER_DOCUMENT.SUCCESS:
      return {
        ...state,
        loading: false,
        documentDetail: action?.payload,
      };

    case FETCH_CUSTOMERS.FAILURE:
    case FETCH_CUSTOMER_DETAIL.FAILURE:
    case FETCH_CUSTOMER_DOCUMENT.FAILURE:
    case KYC_ACTION.FAILURE:
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

    case CLEAR_SELECTED_CUSTOMER.SUCCESS:
      return {
        ...state,
        selectedCustomer: null,
        selectedCustomerId: null,
        documentDetail: null,
        loanDetail: null,
        financeDocuments: null,
        moreOnFinance: null,
      };

    case CUSTOMER_MORE_FINANCE.SUCCESS:
      return {
        ...state,
        loading: false,
        moreOnFinance: action.payload,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    case KYC_ACTION.SUCCESS:
      return {...state, loading: false};

    default:
      return state;
  }
};

export default customerReducer;
