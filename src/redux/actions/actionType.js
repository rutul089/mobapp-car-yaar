// actionTypes.js

/**
 * Creates a set of async action types (REQUEST, SUCCESS, FAILURE) for a given base name.
 * @param {string} base - The base name for the action (e.g. 'VEHICLE')
 * @returns {{REQUEST: string, SUCCESS: string, FAILURE: string}}
 */
export const createAsyncActionTypes = base => ({
  REQUEST: `${base}_REQUEST`,
  SUCCESS: `${base}_SUCCESS`,
  FAILURE: `${base}_FAILURE`,
});

export const LOAN = createAsyncActionTypes('LOAN');
export const VEHICLE_BY_ID = createAsyncActionTypes('FETCH_VEHICLE_BY_ID');
export const RESET_SELECTED_VEHICLE = createAsyncActionTypes(
  'RESET_SELECTED_VEHICLE',
);
