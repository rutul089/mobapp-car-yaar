import axiosInstance from '../networking/axiosInstance';

/**
 * Fetches all customers from the backend.
 *
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=10] - The number of results per page.
 * @param {Object} [payload={}] - Optional Axios config (e.g., additional headers or params).
 * @returns {Promise<Object>} A promise that resolves with the customer data.
 * @throws Will throw an error if the API call fails.
 */
export const fetchAllCustomers = async (page = 1, limit = 10, payload = {}) => {
  try {
    const response = await axiosInstance.get('/customers/all', {
      ...payload,
      params: {
        page,
        limit,
        ...(payload.params || {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    throw error;
  }
};

// await fetchAllCustomers(2, 10, { params: { search: 'John Doe' } });

/**
 * Fetches detailed information for a specific customer by ID.
 *
 * @param {string} customerId - The UUID of the customer to retrieve details for.
 * @param {Object} [config={}] - Optional Axios config (e.g., headers).
 * @returns {Promise<Object>} A promise that resolves with the customer details.
 * @throws Will throw an error if the API call fails.
 */
export const fetchCustomerDetailsById = async (customerId, config = {}) => {
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  try {
    const response = await axiosInstance.get(
      `/customers/customerDetails/${customerId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch details for customer ID ${customerId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Fetches loan amount details for a specific customer.
 *
 * @param {string} customerId - The UUID of the customer.
 * @param {Object} [config={}] - Optional Axios config (e.g., headers).
 * @returns {Promise<Object>} A promise that resolves with the loan amount details.
 * @throws Will throw an error if the API call fails.
 */
export const fetchCustomerLoanAmount = async (customerId, config = {}) => {
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  try {
    const response = await axiosInstance.get(
      `/customers/customerLoanAmount/${customerId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch loan amount for customer ID ${customerId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Fetches document details for a specific customer.
 *
 * @param {string} customerId - The UUID of the customer.
 * @param {Object} [config={}] - Optional Axios config (e.g., headers).
 * @returns {Promise<Object>} A promise that resolves with the customer documents.
 * @throws Will throw an error if the API call fails.
 */
export const fetchCustomerDocuments = async (customerId, config = {}) => {
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  try {
    const response = await axiosInstance.get(
      `/customers/customerDocuments/${customerId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch documents for customer ID ${customerId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Fetches base customer details by ID.
 *
 * @param {string} customerId - The UUID of the customer.
 * @param {Object} [config={}] - Optional Axios config (e.g., headers).
 * @returns {Promise<Object>} A promise that resolves with the customer information.
 * @throws Will throw an error if the API call fails.
 */
export const fetchCustomerById = async (customerId, config = {}) => {
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  try {
    const response = await axiosInstance.get(
      `/customers/${customerId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch customer data for ID ${customerId}:`, error);
    throw error;
  }
};
