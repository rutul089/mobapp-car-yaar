import {
  addCustomerLoanAmount,
  deleteLoanApplicationById,
  fetchCustomerFinanceDetails,
  fetchCustomerFinanceDocuments,
  fetchCustomerMoreFinanceDetails,
  fetchLoanApplicationById,
  fetchLoanApplications,
  postCustomerFinanceDetails,
  postCustomerFinanceDocuments,
  postCustomerLenderDetails,
} from '../../services';
import {
  initiateLoanApplication,
  setPartnerAndSalesExecutive,
  submitLoanApplication,
} from '../../services/loanServices';
import {showApiErrorToast} from '../../utils/helper';
import {
  CLEAR_SEARCH_APPLICATION,
  CUSTOMER_FINANCE_DETAILS,
  CUSTOMER_FINANCE_DOCUMENT,
  CUSTOMER_MORE_FINANCE,
  FETCH_LOAN_APP_BY_ID,
  FETCH_LOAN_APPLICATIONS,
  RESET_LOAN_APPLICATION,
  DELETE_LOAN_APPLICATION,
  SUBMIT_LOAN_APPLICATION,
} from './actionType';
import types from './types';

export const selectedLoanType = value => ({
  type: types.SELECTED_LOAN_TYPE,
  payload: value,
});

export const fetchLoanApplicationsThunk = (
  page = 1,
  limit = 10,
  payload = {},
  onSuccess,
  onFailure,
) => {
  return async (dispatch, getState) => {
    dispatch({type: FETCH_LOAN_APPLICATIONS.REQUEST});

    try {
      const response = await fetchLoanApplications(page, limit, payload);

      const isSearch = payload?.params?.search;
      const applications = response.data || [];

      dispatch({
        type: FETCH_LOAN_APPLICATIONS.SUCCESS,
        payload: {
          applications,
          pagination: response.pagination,
          isSearch,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_LOAN_APPLICATIONS.FAILURE,
        error: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk to fetch a specific loan application by its ID.
 *
 * @param {string} id - The unique identifier of the loan application.
 * @param {Function} [onSuccess] - Optional callback to execute on success. Receives full response.
 * @param {Function} [onFailure] - Optional callback to execute on failure. Receives error message.
 * @returns {Function} Redux thunk function.
 */
export const fetchLoanApplicationFromIdThunk = (
  applicationId,
  config = {},
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_LOAN_APP_BY_ID.REQUEST});

    try {
      const response = await fetchLoanApplicationById(applicationId, config);
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.SUCCESS,
        payload: response.data?.[0],
      });
      onSuccess?.(response.data?.[0]);
    } catch (error) {
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const initiateLoanApplicationThunk = (
  applicationData,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_LOAN_APP_BY_ID.REQUEST});

    try {
      const response = await initiateLoanApplication(applicationData);

      dispatch(fetchLoanApplicationFromIdThunk(response.data?.id));
      // dispatch({
      //   type: FETCH_LOAN_APP_BY_ID.SUCCESS,
      //   payload: response.data,
      // });

      dispatch({
        type: types.APPEND_NEW_LOAN_APPLICATION,
        payload: response.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const addCustomerLoanAmountThunk = (
  applicationData,
  applicationId,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_LOAN_APP_BY_ID.REQUEST});

    try {
      const response = await addCustomerLoanAmount(
        applicationData,
        applicationId,
      );
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.SUCCESS,
        payload: response.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const postCustomerFinanceDetailsThunk = (
  applicationId,
  financeDetails,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: CUSTOMER_FINANCE_DETAILS.REQUEST});

    try {
      const response = await postCustomerFinanceDetails(
        applicationId,
        financeDetails,
      );

      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.SUCCESS,
        payload: response.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const postCustomerFinanceDocumentsThunk = (
  applicationId,
  documents = {},
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_LOAN_APP_BY_ID.REQUEST});

    try {
      const response = await postCustomerFinanceDocuments(
        applicationId,
        documents,
      );
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.FAILURE,
      });
      // dispatch({
      //   type: FETCH_LOAN_APP_BY_ID.SUCCESS,
      //   payload: response.data,
      // });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const postCustomerLenderDetailsThunk = (
  applicationId,
  lenderData = {},
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_LOAN_APP_BY_ID.REQUEST});

    try {
      const response = await postCustomerLenderDetails(
        applicationId,
        lenderData,
      );

      await dispatch(fetchLoanApplicationFromIdThunk(applicationId));

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_LOAN_APP_BY_ID.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const fetchCustomerFinanceDetailsThunk =
  (applicationId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: CUSTOMER_FINANCE_DETAILS.REQUEST});
    try {
      const response = await fetchCustomerFinanceDetails(applicationId, config);
      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.SUCCESS,
        payload: response?.data,
      });
      onSuccess?.(response?.data);
      return response?.data;
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
  (applicationId, config = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: CUSTOMER_FINANCE_DOCUMENT.REQUEST});
    try {
      const response = await fetchCustomerFinanceDocuments(
        applicationId,
        config,
      );

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

export const setPartnerAndSalesExecutiveThunk = (
  applicationId,
  financeDetails,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: CUSTOMER_FINANCE_DETAILS.REQUEST});
    // dispatch({type: FETCH_LOAN_APP_BY_ID.REQUEST});

    try {
      const response = await setPartnerAndSalesExecutive(
        applicationId,
        financeDetails,
      );

      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.SUCCESS,
        payload: response.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CUSTOMER_FINANCE_DETAILS.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const setIsCreatingLoanApplication = isCreating => ({
  type: types.SET_IS_CREATING_LOAN_APPLICATION,
  payload: isCreating,
});

export const clearSearchApplication = () => ({
  type: CLEAR_SEARCH_APPLICATION.SUCCESS,
});

export const resetLoanApplication = () => ({
  type: RESET_LOAN_APPLICATION.SUCCESS,
});

export const deleteLoanApplicationByIdThunk = (
  applicationId,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: DELETE_LOAN_APPLICATION.REQUEST});

    try {
      const response = await deleteLoanApplicationById(applicationId);

      dispatch({
        type: DELETE_LOAN_APPLICATION.SUCCESS,
        payload: response.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: DELETE_LOAN_APPLICATION.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const submitLoanApplicationThunk = (
  applicationId,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: SUBMIT_LOAN_APPLICATION.REQUEST});

    try {
      const response = await submitLoanApplication(applicationId);

      dispatch({
        type: SUBMIT_LOAN_APPLICATION.SUCCESS,
        payload: response.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: SUBMIT_LOAN_APPLICATION.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
