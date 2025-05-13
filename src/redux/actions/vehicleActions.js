import {
  fetchVehicleById,
  fetchVehicles,
  searchVehiclesByKeyword,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import {VEHICLE_BY_ID, RESET_SELECTED_VEHICLE} from './actionType';

import types from './types';

export const fetchVehiclesThunk =
  (page = 1, limit = 5, onSuccess, onFailure) =>
  async dispatch => {
    dispatch({type: types.FETCH_VEHICLES_REQUEST});

    try {
      const response = await fetchVehicles(page, limit);
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

export const resetSelectedVehicle = () => ({
  type: RESET_SELECTED_VEHICLE.SUCCESS,
});
