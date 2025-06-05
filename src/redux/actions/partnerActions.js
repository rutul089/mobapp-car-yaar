import {fetchPartnerEmployeeById} from '../../services';
import {showApiErrorToast} from '../../utils/helper';

export const fetchPartnerEmployeeByIdThunk = (
  employeeId,
  params,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    try {
      const response = await fetchPartnerEmployeeById(employeeId, params);
      onSuccess?.(response);
      return response;
    } catch (error) {
      showApiErrorToast(error);
      onFailure?.(error);
    }
  };
};
