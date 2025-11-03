import {fetchEmiPlans} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {EMI_PLAN} from './actionType';

export const fetchEmiPlanThunk = (payLoad, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: EMI_PLAN.REQUEST});

    try {
      const response = await fetchEmiPlans(payLoad);

      dispatch({
        type: EMI_PLAN.SUCCESS,
        payload: response?.data,
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: EMI_PLAN.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
