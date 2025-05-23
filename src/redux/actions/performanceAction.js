import {fetchPartnerStats} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {PARTNER_PERFORMANCE} from './actionType';

/**
 * Thunk action to fetch partner performance statistics.
 *
 * Dispatches request, success, and failure actions.
 * Optionally calls provided onSuccess or onFailure callbacks.
 *
 * @function fetchPartnerStatsThunk
 * @param {function} [onSuccess] - Callback for success response.
 * @param {function} [onFailure] - Callback for error response.
 * @returns {Function} Thunk function for Redux dispatch.
 */
export const fetchPartnerStatsThunk = (partnerId, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: PARTNER_PERFORMANCE.REQUEST});

    try {
      const response = await fetchPartnerStats(partnerId);
      dispatch({
        type: PARTNER_PERFORMANCE.SUCCESS,
        payload: {
          data: response.data,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: PARTNER_PERFORMANCE.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
