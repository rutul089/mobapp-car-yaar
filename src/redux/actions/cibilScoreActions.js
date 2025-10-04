import {
  fetchCibilScore,
  sendOtpForCibil,
  verifyOtpForCibil,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {CIBIL_SCORE} from './actionType';

export const sendOtpForCibilThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CIBIL_SCORE.REQUEST});
    try {
      const response = await sendOtpForCibil(payload);
      dispatch({type: CIBIL_SCORE.SUCCESS, payload: response?.data});

      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: CIBIL_SCORE.FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);

      onFailure?.(error);
    }
  };

export const verifyOtpForCibilThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CIBIL_SCORE.REQUEST});
    try {
      const response = await verifyOtpForCibil(payload);
      dispatch({type: CIBIL_SCORE.SUCCESS, payload: response?.data});

      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: CIBIL_SCORE.FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);

      onFailure?.(error);
    }
  };

export const fetchCibilScoreThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    dispatch({type: CIBIL_SCORE.REQUEST});
    try {
      const response = await fetchCibilScore(payload);
      dispatch({
        type: CIBIL_SCORE.SUCCESS,
        payload: response?.data,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: CIBIL_SCORE.FAILURE,
        error: error?.message || 'Something went wrong',
      });
      onFailure?.(error);
      showApiErrorToast(error);
    }
  };
