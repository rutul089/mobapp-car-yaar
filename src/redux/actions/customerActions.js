import {fetchAllCustomers, fetchCustomerDetailsById} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {
  CLEAR_SEARCH,
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER_DETAIL,
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

export const clearCustomerSearch = () => ({
  type: CLEAR_SEARCH.SUCCESS,
});

export const fetchCustomerDetailsThunk =
  (customerId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    console.log({customerId});
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
