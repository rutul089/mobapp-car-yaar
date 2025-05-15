import {fetchLoanApplications} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {
  FETCH_LOAN_APPLICATIONS,
  CLEAR_SEARCH_APPLICATION,
  RESET_LOAN_APPLICATION,
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

export const clearSearchApplication = () => ({
  type: CLEAR_SEARCH_APPLICATION.SUCCESS,
});

export const resetLoanApplication = () => ({
  type: RESET_LOAN_APPLICATION.SUCCESS,
});
