import {fetchAllLenders} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {FETCH_LENDERS} from './actionType';

export const fetchAllLendersThunk = (
  page = 1,
  limit = 10,
  principalAmount,
  payload = {},
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: FETCH_LENDERS.REQUEST});

    try {
      const response = await fetchAllLenders(
        page,
        limit,
        principalAmount,
        payload,
      );
      const lenders = response.data || [];

      dispatch({
        type: FETCH_LENDERS.SUCCESS,
        payload: {
          lenders,
          pagination: response.pagination,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: FETCH_LENDERS.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
