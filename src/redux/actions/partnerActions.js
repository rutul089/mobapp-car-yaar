import {fetchPartnerEmployeeById} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {PARTNER_ENVELOPE_VALUE} from './actionType';

export const fetchPartnerEmployeeByIdThunk = (
  employeeId,
  params,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: PARTNER_ENVELOPE_VALUE.REQUEST});

    try {
      const response = await fetchPartnerEmployeeById(employeeId);
      const partners = response.data?.employees || [];

      dispatch({
        type: PARTNER_ENVELOPE_VALUE.SUCCESS,
        payload: partners,
      });
      onSuccess?.(response);
      return response;
    } catch (error) {
      dispatch({
        type: PARTNER_ENVELOPE_VALUE.FAILURE,
        error: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error);
    }
  };
};
