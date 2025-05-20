import {types} from '../actions';
import {
  FETCH_CUSTOMERS,
  CLEAR_SEARCH,
  FETCH_CUSTOMER_DETAIL,
  FETCH_CUSTOMER_DOCUMENT,
  CLEAR_SELECTED_CUSTOMER,
  CUSTOMER_FINANCE_DETAILS,
  CUSTOMER_FINANCE_DOCUMENT,
  CUSTOMER_MORE_FINANCE,
  CREATE_CUSTOMER_BASIC_DETAIL,
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
  financeDetails: null,
  financeDocuments: null,
  moreOnFinance: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS.REQUEST:
    case FETCH_CUSTOMER_DETAIL.REQUEST:
    case FETCH_CUSTOMER_DOCUMENT.REQUEST:
    case CUSTOMER_FINANCE_DETAILS.REQUEST:
    case CUSTOMER_FINANCE_DOCUMENT.REQUEST:
    case CUSTOMER_MORE_FINANCE.REQUEST:
    case CREATE_CUSTOMER_BASIC_DETAIL.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CUSTOMER_BASIC_DETAIL.FAILURE:
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

    case CUSTOMER_FINANCE_DETAILS.SUCCESS:
      return {
        ...state,
        loading: false,
        financeDetails: action.payload,
      };

    case CUSTOMER_FINANCE_DOCUMENT.SUCCESS:
      return {
        ...state,
        loading: false,
        financeDocuments: action.payload,
      };

    case CUSTOMER_MORE_FINANCE.SUCCESS:
      return {
        ...state,
        loading: false,
        moreOnFinance: action.payload,
      };

    case FETCH_CUSTOMERS.FAILURE:
    case FETCH_CUSTOMER_DETAIL.FAILURE:
    case FETCH_CUSTOMER_DOCUMENT.FAILURE:
    case CUSTOMER_FINANCE_DETAILS.FAILURE:
    case CUSTOMER_FINANCE_DOCUMENT.FAILURE:
    case CUSTOMER_MORE_FINANCE.FAILURE:
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
        financeDetails: null,
        financeDocuments: null,
        moreOnFinance: null,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default customerReducer;
