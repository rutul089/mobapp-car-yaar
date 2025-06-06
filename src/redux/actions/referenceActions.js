import {
  editCustomerReferenceDetails,
  getCustomerReferenceDetails,
  postCustomerReferenceDetails,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {ADD_REFERENCE} from './actionType';

export const postCustomerReferenceDetailsThunk =
  (applicationId, referenceData, onSuccess, onFailure) => async dispatch => {
    dispatch({type: ADD_REFERENCE.REQUEST});
    try {
      const response = await postCustomerReferenceDetails(
        applicationId,
        referenceData,
      );
      dispatch({type: ADD_REFERENCE.SUCCESS, payload: response?.data});

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: ADD_REFERENCE.FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);

      onFailure?.(error);
    }
  };

export const getCustomerReferenceDetailsThunk =
  (applicationId, onSuccess, onFailure) => async dispatch => {
    dispatch({type: ADD_REFERENCE.REQUEST});
    try {
      const response = await getCustomerReferenceDetails(applicationId);
      dispatch({type: ADD_REFERENCE.SUCCESS, payload: response?.data});

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: ADD_REFERENCE.FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);
      onFailure?.(error);
    }
  };

export const editCustomerReferenceDetailsThunk =
  (applicationId, referenceData, onSuccess, onFailure) => async dispatch => {
    dispatch({type: ADD_REFERENCE.REQUEST});
    try {
      const response = await editCustomerReferenceDetails(
        applicationId,
        referenceData,
      );
      dispatch({type: ADD_REFERENCE.SUCCESS, payload: response?.data});

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: ADD_REFERENCE.FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);

      onFailure?.(error);
    }
  };
