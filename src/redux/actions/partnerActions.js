import {fetchPartnerEmployeeById} from '../../services';
import {showApiErrorToast} from '../../utils/helper';

export const fetchPartnerEmployeeByIdThunk = (param, onSuccess, onFailure) => {
  return async dispatch => {
    try {
      const response = await fetchPartnerEmployeeById(param);
      onSuccess?.(response?.data);
      return response?.data;
    } catch (error) {
      showApiErrorToast(error);
      onFailure?.(error);
    }
  };
};
