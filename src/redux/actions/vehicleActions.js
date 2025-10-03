import {
  checkVehicleExists,
  fetchVehicleById,
  fetchVehicles,
  getVehicleByRegisterNumber,
  searchVehiclesByKeyword,
  updateVehicleById,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {
  VEHICLE_BY_ID,
  RESET_SELECTED_VEHICLE,
  UPDATE,
  VEHICLE_EXISTS,
  VEHICLE_DETAILS,
} from './actionType';

import types from './types';

export const fetchVehiclesThunk =
  (page = 1, limit = 5, payload = {}, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: types.FETCH_VEHICLES_REQUEST});

    try {
      const response = await fetchVehicles(page, limit, payload);
      dispatch({
        type: types.FETCH_VEHICLES_SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.FETCH_VEHICLES_FAILURE,
        payload: error.message || 'Something went wrong',
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };

export const searchVehiclesByKeywordThunk = (
  search,
  page = 1,
  limit = 10,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.SEARCH_VEHICLES_REQUEST});
    try {
      const response = await searchVehiclesByKeyword(search, page, limit);

      dispatch({type: types.STOP_LOADING});

      dispatch({
        type: types.SEARCH_VEHICLES_SUCCESS,
        payload: {
          data: response.data,
          message: response.message,
          success: response.success,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.SEARCH_VEHICLES_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const clearVehicleSearch = () => ({
  type: types.CLEAR_VEHICLE_SEARCH,
});

export const fetchVehicleFromIdThunk = (id, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: VEHICLE_BY_ID.REQUEST});

    try {
      const response = await fetchVehicleById(id);
      dispatch({
        type: VEHICLE_BY_ID.SUCCESS,
        payload: response.data,
      });
      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: VEHICLE_BY_ID.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const updateVehicleByIdThunk = (id, payload, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: UPDATE.REQUEST});

    try {
      const response = await updateVehicleById(id, payload);
      const {data, success} = response;

      dispatch({
        type: UPDATE.SUCCESS,
        payload: data,
      });

      if (success && data?.vehicleId) {
        await dispatch(fetchVehicleFromIdThunk(data.vehicleId));
      }

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: UPDATE.FAILURE,
        payload: error.message,
      });

      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const checkVehicleExistsThunk = (
  registerNumber,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: VEHICLE_EXISTS.REQUEST});

    try {
      const response = await checkVehicleExists(registerNumber);
      dispatch({
        type: VEHICLE_EXISTS.SUCCESS,
        payload: response.data,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: VEHICLE_EXISTS.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const getVehicleByRegisterNumberThunk = (
  registerNumber,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: VEHICLE_DETAILS.REQUEST});

    try {
      const response = await getVehicleByRegisterNumber(registerNumber);
      console.log('responseresponse', JSON.stringify(response));
      dispatch({
        type: VEHICLE_DETAILS.SUCCESS,
        payload: response.data,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: VEHICLE_DETAILS.FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const resetSelectedVehicle = () => ({
  type: RESET_SELECTED_VEHICLE.SUCCESS,
});
