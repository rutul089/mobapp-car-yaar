import {searchBanks, verifyBankIFSC} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import types from './types';

/**
 * Thunk action to search for banks by a query.
 *
 * Dispatches actions based on the success or failure of the search for banks.
 * On success, it returns the list of banks fetched from the API.
 * On failure, it shows an error toast and dispatches failure action.
 *
 * @param {string} query - The search query string to find banks.
 * @param {Function} onSuccess - Callback function to be executed if the fetch is successful.
 * @param {Function} onFailure - Callback function to be executed if the fetch fails.
 * @returns {Function} A thunk that dispatches actions based on API response.
 */
export const searchBanksThunk =
  (query, onSuccess, onFailure) => async dispatch => {
    dispatch({type: types.FETCH_BANKS_REQUEST});
    try {
      const response = await searchBanks(query);
      dispatch({type: types.FETCH_BANKS_SUCCESS, payload: response?.data});

      onSuccess?.(response?.data);
    } catch (error) {
      dispatch({
        type: types.FETCH_BANKS_FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);

      onFailure?.(error);
    }
  };

/**
 * Thunk action to verify a bank using its name and IFSC code.
 *
 * Dispatches actions based on the success or failure of verifying the bank.
 * On success, it returns the bank data fetched from the API.
 * On failure, it shows an error toast and dispatches failure action.
 *
 * @param {string} bankName - The name of the bank to verify.
 * @param {string} ifscCode - The IFSC code of the bank to verify.
 * @param {Function} onSuccess - Callback function to be executed if the verification is successful.
 * @param {Function} onFailure - Callback function to be executed if the verification fails.
 * @returns {Function} A thunk that dispatches actions based on API response.
 */
export const verifyBankByIFSCThunk =
  (bankName, ifscCode, onSuccess, onFailure) => async dispatch => {
    dispatch({type: types.FETCH_BANK_BY_SEARCH_REQUEST});
    try {
      const response = await verifyBankIFSC(bankName, ifscCode);
      dispatch({
        type: types.FETCH_BANK_BY_SEARCH_SUCCESS,
        payload: response?.data,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.FETCH_BANK_BY_SEARCH_FAILURE,
        payload: error.message || 'Failed to verify bank IFSC',
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
