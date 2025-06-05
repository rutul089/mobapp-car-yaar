import {
  createSalesExecutive,
  deleteSalesExecutiveById,
  fetchSalesExecutives,
} from '../../services';
import {
  getErrorMessage,
  showApiErrorToast,
  showApiSuccessToast,
  showToast,
} from '../../utils/helper';
import {FETCH_SALES_EXECUTIVE, REMOVE_SALES_EXECUTIVE} from './actionType';
import types from './types';

/**
 * Action creator to remove a sales executive by ID.
 *
 * @param {string} id - The ID of the sales executive to remove.
 * @returns {Object} The action object to be dispatched.
 * @property {string} type - The action type, which will be `REMOVE_SALES_EXECUTIVE`.
 * @property {string} payload - The ID of the sales executive to remove.
 */
export const removeSalesExecutive = id => ({
  type: types.REMOVE_SALES_EXECUTIVE,
  payload: id,
});

/**
 * Action creator to reset the state of sales executives.
 *
 * @returns {Object} The action object to be dispatched.
 * @property {string} type - The action type, which will be `RESET_SALES_EXECUTIVE`.
 */
export const resetSalesExecutive = () => ({
  type: types.RESET_SALES_EXECUTIVE,
});

/**
 * Thunk action to fetch sales executives with pagination.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of items per page.
 * @param {Function} onSuccess - Callback function to execute on successful fetch.
 * @param {Function} onFailure - Callback function to execute on failed fetch.
 * @returns {Function} A thunk that dispatches actions based on API response.
 */
export const fetchSalesExecutivesThunk = (
  page,
  limit,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_SALES_EXECUTIVE.REQUEST});

    try {
      const response = await fetchSalesExecutives(
        `page=${page}&limit=${limit}`,
      );
      dispatch({
        type: FETCH_SALES_EXECUTIVE.SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          limit: response.pagination.limit,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages,
        },
      });

      onSuccess?.(response);
    } catch (error) {
      showApiErrorToast(error);
      dispatch({
        type: FETCH_SALES_EXECUTIVE.FAILURE,
        payload: {
          message: getErrorMessage(error),
          success: false,
        },
      });

      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk action to delete a sales executive by ID.
 *
 * @param {string} partnerId - The ID of the sales executive to delete.
 * @param {Function} onSuccess - Callback function to execute on successful deletion.
 * @param {Function} onFailure - Callback function to execute on failed deletion.
 * @returns {Function} A thunk that dispatches actions based on API response.
 */
export const deleteSalesExecutiveByIdThunk = (
  partnerId,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: REMOVE_SALES_EXECUTIVE.REQUEST});
    try {
      const response = await deleteSalesExecutiveById(partnerId);
      dispatch({
        type: REMOVE_SALES_EXECUTIVE.SUCCESS,
        payload: response,
      });
      dispatch({
        type: types.REMOVE_SALES_EXECUTIVE,
        payload: partnerId,
      });
      removeSalesExecutive(partnerId);
      onSuccess?.(response);
      showApiSuccessToast(response);
    } catch (error) {
      showApiErrorToast(error);
      dispatch({
        type: REMOVE_SALES_EXECUTIVE.FAILURE,
        payload: error.message,
      });
      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk action to create a new sales executive.
 *
 * @param {Object} param - The parameters for creating a new sales executive.
 * @param {Function} onSuccess - Callback function to execute on successful creation.
 * @param {Function} onFailure - Callback function to execute on failed creation.
 * @returns {Function} A thunk that dispatches actions based on API response.
 */
export const createSalesExecutiveThunk = (param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: FETCH_SALES_EXECUTIVE.REQUEST});

    try {
      const response = await createSalesExecutive(param);

      dispatch({
        type: types.ADD_SALES_EXECUTIVE,
        payload: {
          id: response.data?.id,
          userId: response.data?.userId,
          position: param.position,
          user: {
            id: response.data?.userId,
            email: param.email,
            mobileNumber: param.mobileNumber,
            password: null,
            name: param.name,
            role: 'SALES_EXECUTIVE',
          },
          message: response.message,
          success: response.success,
        },
      });

      showToast('success', response?.message || 'Member created successfully!');

      onSuccess?.(response);
    } catch (error) {
      showApiErrorToast(error);
      dispatch({
        type: FETCH_SALES_EXECUTIVE.FAILURE,
        payload: {
          message: getErrorMessage(error),
          success: false,
        },
      });

      onFailure?.(error);
    }
  };
};

/**
 * Thunk to search sales executives based on a search query.
 *
 * @param {string} searchText - The search text to query sales executives.
 * @param {function} [onSuccess] - Optional callback function to be called with the API response on success.
 * @param {function} [onFailure] - Optional callback function to be called with the error message on failure.
 * @returns {function} Thunk function to be used by Redux Thunk middleware.
 */
export const searchSalesExecutivesThunk = (
  searchText,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    try {
      const response = await fetchSalesExecutives(
        `search=${searchText}&isActive=true`,
      );
      onSuccess?.(response);
      return response;
    } catch (error) {
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
