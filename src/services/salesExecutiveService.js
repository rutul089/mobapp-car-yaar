import axiosInstance from '../networking/axiosInstance';

/**
 * Fetches the list of all sales executives from the backend.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of sales executives.
 * @throws Will throw an error if the API call fails.
 */
export const fetchSalesExecutives = async query => {
  try {
    const response = await axiosInstance.get(`/sales-executives/?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a sales executive by their ID from the backend.
 *
 * @param {string} id - The ID of the sales executive to fetch.
 * @returns {Promise<Object>} A promise that resolves to the sales executive's details.
 * @throws Will throw an error if the API call fails.
 */
export const fetchSalesExecutiveById = async id => {
  try {
    const response = await axiosInstance.get(`/sales-executives/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new sales executive in the backend.
 *
 * @param {Object} salesExecutiveData - The data for the new sales executive.
 * @param {string} salesExecutiveData.name - Name of the sales executive.
 * @param {string} salesExecutiveData.mobileNumber - Mobile number of the sales executive.
 * @param {string} salesExecutiveData.email - Email of the sales executive.
 * @param {string} salesExecutiveData.position - Position of the sales executive.
 * @returns {Promise<Object>} A promise that resolves to the created sales executive's details.
 * @throws Will throw an error if the API call fails.
 */
export const createSalesExecutive = async salesExecutiveData => {
  try {
    const response = await axiosInstance.post(
      '/sales-executives',
      salesExecutiveData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a sales executive by their ID from the backend.
 *
 * @param {string} id - The ID of the sales executive to delete.
 * @returns {Promise<Object>} A promise that resolves to the delete confirmation or deleted executive's details.
 * @throws Will throw an error if the API call fails.
 */
export const deleteSalesExecutiveById = async id => {
  try {
    const response = await axiosInstance.delete(`/sales-executives/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
