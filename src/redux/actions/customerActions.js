import {
  fetchAllCustomers,
  fetchCustomerDetailsById,
  fetchCustomerDocuments,
  fetchCustomerFinanceDetails,
  fetchCustomerFinanceDocuments,
  fetchCustomerMoreFinanceDetails,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {
  CLEAR_SEARCH,
  CLEAR_SELECTED_CUSTOMER,
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER_DETAIL,
  FETCH_CUSTOMER_DOCUMENT,
  CUSTOMER_FINANCE_DETAILS,
  CUSTOMER_FINANCE_DOCUMENT,
  CUSTOMER_MORE_FINANCE,
} from './actionType';

/**
 * Thunk to fetch all customers with optional pagination and filters.
 *
 * @param {number} page
 * @param {number} limit
 * @param {Object} payload
 */
export const fetchAllCustomersThunk = (
  page = 1,
  limit = 10,
  payload = {},
  onSuccess,
  onFailure,
) => {
  return async (dispatch, getState) => {
    dispatch({type: FETCH_CUSTOMERS.REQUEST});

    try {
      const response = await fetchAllCustomers(page, limit, payload);

      const isSearch = payload?.params?.search;
      const customers = response.data || [];

      dispatch({
        type: FETCH_CUSTOMERS.SUCCESS,
        payload: {
          customers,
          pagination: response.pagination,
          isSearch,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_CUSTOMERS.FAILURE,
        error: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const fetchCustomerDetailsThunk =
  (customerId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: FETCH_CUSTOMER_DETAIL.REQUEST});
    try {
      const response = await fetchCustomerDetailsById(customerId, config);
      dispatch({type: FETCH_CUSTOMER_DETAIL.SUCCESS, payload: response?.data});
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_CUSTOMER_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const fetchCustomerDocumentsThunk =
  (customerId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: FETCH_CUSTOMER_DOCUMENT.REQUEST});
    try {
      const response = await fetchCustomerDocuments(customerId, config);
      dispatch({
        type: FETCH_CUSTOMER_DOCUMENT.SUCCESS,
        payload: response?.data?.[0],
      });
      onSuccess?.(response?.data?.[0]);
    } catch (error) {
      dispatch({
        type: FETCH_CUSTOMER_DOCUMENT.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const fetchCustomerFinanceDetailsThunk =
  (customerId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: CUSTOMER_FINANCE_DETAILS.REQUEST});
    try {
      const response = await fetchCustomerFinanceDetails(customerId, config);
      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.SUCCESS,
        payload: response?.data,
      });
      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const fetchCustomerFinanceDocumentsThunk =
  (customerId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: CUSTOMER_FINANCE_DOCUMENT.REQUEST});
    try {
      const response = await fetchCustomerFinanceDocuments(customerId, config);

      dispatch({
        type: CUSTOMER_FINANCE_DOCUMENT.SUCCESS,
        payload: response?.data,
      });
      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: CUSTOMER_FINANCE_DOCUMENT.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const fetchCustomerMoreFinanceDetailThunk =
  (customerId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: CUSTOMER_MORE_FINANCE.REQUEST});
    try {
      const response = await fetchCustomerMoreFinanceDetails(
        customerId,
        config,
      );
      dispatch({
        type: CUSTOMER_MORE_FINANCE.SUCCESS,
        payload: response?.data,
      });
      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: CUSTOMER_MORE_FINANCE.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

// export const fetchAllCustomersThunk =
//   (page = 1, limit = 5, payload = {}, onSuccess, onFailure) =>
//   async dispatch => {
//     dispatch({type: FETCH_CUSTOMERS.REQUEST});

//     try {
//       const response = await fetchAllCustomers(page, limit, payload);
//       dispatch({
//         type: FETCH_CUSTOMERS.SUCCESS,
//         payload: {
//           data: response.data,
//           page: response.pagination.page,
//           totalPages: response.pagination.totalPages,
//         },
//       });
//       onSuccess?.(response);
//     } catch (error) {
//       dispatch({
//         type: FETCH_CUSTOMERS.FAILURE,
//         payload: error.message || 'Something went wrong',
//       });
//       showApiErrorToast(error);
//       onFailure?.(error.message);
//     }
//   };

export const resetSelectedCustomer = () => ({
  type: CLEAR_SELECTED_CUSTOMER.SUCCESS,
});

export const clearCustomerSearch = () => ({
  type: CLEAR_SEARCH.SUCCESS,
});
