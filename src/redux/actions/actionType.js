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
export const UPDATE = createAsyncActionTypes('UPDATE');
export const VEHICLE_EXISTS = createAsyncActionTypes('vehicle-exists');
export const VEHICLE_DETAILS = createAsyncActionTypes('vehicle-details');
export const FETCH_CUSTOMERS = createAsyncActionTypes('FETCH_CUSTOMERS');
export const FETCH_CUSTOMER_LOAN = createAsyncActionTypes(
  'FETCH_CUSTOMER_LOAN',
);
export const FETCH_CUSTOMER_DOCUMENTS = createAsyncActionTypes(
  'FETCH_CUSTOMER_DOCUMENTS',
);
export const FETCH_CUSTOMER_BY_ID = createAsyncActionTypes(
  'FETCH_CUSTOMER_BY_ID',
);
export const CLEAR_SEARCH = createAsyncActionTypes('CLEAR_SEARCH');
export const FETCH_CUSTOMER_DETAIL = createAsyncActionTypes(
  'FETCH_CUSTOMER_DETAIL',
);
export const FETCH_CUSTOMER_DOCUMENT = createAsyncActionTypes(
  'FETCH_CUSTOMER_DOCUMENT',
);

export const CLEAR_SELECTED_CUSTOMER = createAsyncActionTypes(
  'CLEAR_SELECTED_CUSTOMER',
);

export const CUSTOMER_FINANCE_DETAILS = createAsyncActionTypes(
  'CUSTOMER_FINANCE_DETAILS',
);

export const CUSTOMER_FINANCE_DOCUMENT = createAsyncActionTypes(
  'CUSTOMER_FINANCE_DOCUMENT',
);

export const CUSTOMER_MORE_FINANCE = createAsyncActionTypes(
  'CUSTOMER_MORE_FINANCE',
);
