import {compose} from 'redux';
import {
  createCustomer,
  deleteCustomer,
  fetchAllCustomers,
  fetchCustomerDetailsById,
  fetchCustomerDocuments,
  initiateAadharDigilocker,
  submitCustomerDetails,
  updateCustomerDetails,
  updateCustomerDocuments,
  uploadCustomerDocuments,
  verifyAadhar,
  verifyCustomerOtp,
  verifyPan,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {
  CLEAR_SEARCH,
  CLEAR_SELECTED_CUSTOMER,
  CREATE_CUSTOMER_BASIC_DETAIL,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER_DETAIL,
  FETCH_CUSTOMER_DOCUMENT,
  KYC_ACTION,
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
      dispatch({
        type: FETCH_CUSTOMER_DETAIL.SUCCESS,
        payload: response?.data?.data,
      });
      onSuccess?.(response?.data);
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
        payload: response?.data,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_CUSTOMER_DOCUMENT.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const createCustomerBasicDetailThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CREATE_CUSTOMER_BASIC_DETAIL.REQUEST});
    try {
      const response = await createCustomer(payload);
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
        payload: {
          data: response?.data,
          customerId: response?.data?.id,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const verifyCustomerOtpThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CREATE_CUSTOMER_BASIC_DETAIL.REQUEST});
    try {
      const response = await verifyCustomerOtp(payload);
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
        payload: {
          data: response?.data,
          customerId: response?.data?.id,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      // showApiErrorToast(error);
    }
  };

export const submitCustomerDetailsThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CREATE_CUSTOMER_BASIC_DETAIL.REQUEST});
    try {
      const response = await submitCustomerDetails(payload);
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
        payload: {
          data: response?.data,
          customerId: response?.data?.customerId,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      // showApiErrorToast(error);
    }
  };

export const uploadCustomerDocumentsThunk =
  (payload, customerId, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CREATE_CUSTOMER_BASIC_DETAIL.REQUEST});
    try {
      const response = await uploadCustomerDocuments(payload, customerId);
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
        payload: {
          data: response?.data,
          customerId: response?.data?.customerId,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      // showApiErrorToast(error);
    }
  };

export const updateCustomerDetailsThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CREATE_CUSTOMER_BASIC_DETAIL.REQUEST});
    try {
      const response = await updateCustomerDetails(payload);
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
        payload: {
          data: response?.data,
          customerId: response?.data?.customerId,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      // showApiErrorToast(error);
    }
  };

export const updateCustomerDocumentsThunk =
  (payload, customerId, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CREATE_CUSTOMER_BASIC_DETAIL.REQUEST});
    try {
      const response = await updateCustomerDocuments(payload, customerId);
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
        payload: {
          data: response?.data,
          customerId: response?.data?.customerId,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CREATE_CUSTOMER_BASIC_DETAIL.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      // showApiErrorToast(error);
    }
  };

export const resetSelectedCustomer = () => ({
  type: CLEAR_SELECTED_CUSTOMER.SUCCESS,
});

export const clearCustomerSearch = () => ({
  type: CLEAR_SEARCH.SUCCESS,
});

export const addCustomerBasicDetail = (customer, customerID) => ({
  type: CREATE_CUSTOMER_BASIC_DETAIL.SUCCESS,
  payload: {
    data: customer,
    customerId: customerID,
  },
});

export const verifyAadharThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: KYC_ACTION.REQUEST});
    try {
      const response = await verifyAadhar(payload);
      // dispatch({
      //   type: KYC_ACTION.SUCCESS,
      // });
      dispatch(fetchCustomerDetailsThunk(payload?.customerId));
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: KYC_ACTION.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      showApiErrorToast(error);
    }
  };

export const verifyPanThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: KYC_ACTION.REQUEST});
    try {
      const response = await verifyPan(payload);
      dispatch({
        type: KYC_ACTION.SUCCESS,
      });
      dispatch(fetchCustomerDetailsThunk(payload?.customerId));
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: KYC_ACTION.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      console.log('error--->', JSON.stringify(error));
      showApiErrorToast(error);
    }
  };

export const initiateAadharDigilockerThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: KYC_ACTION.REQUEST});
    try {
      const response = await initiateAadharDigilocker(payload);
      dispatch({
        type: KYC_ACTION.SUCCESS,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: KYC_ACTION.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      showApiErrorToast(error);
    }
  };

export const deleteCustomerThunk = customerId => async dispatch => {
  dispatch({type: DELETE_CUSTOMER.REQUEST});
  try {
    const response = await deleteCustomer(customerId);
    dispatch({
      type: DELETE_CUSTOMER.SUCCESS,
      payload: {
        data: response?.data,
      },
    });
    return response;
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER.FAILURE,
      error: error?.message || 'Something went wrong',
    });
    throw error;
  }
};

// deleteCustomer
