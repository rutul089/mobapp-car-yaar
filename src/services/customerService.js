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
      `loan-applications/customerDocuments/${customerId}`,
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

/**
 * Creates a new customer by sending a POST request to the /customers endpoint.
 *
 * @param {Object} customerData - The customer data to be sent in the request body.
 * @returns {Promise<Object>} - The response data from the API.
 */
export const createCustomer = async customerData => {
  try {
    const response = await axiosInstance.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

/**
 * Verifies the customer's OTP.
 *
 * @param {Object} otpData - The OTP data for verification.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const verifyCustomerOtp = async otpData => {
  try {
    const response = await axiosInstance.post('/customers/verifyOtp', otpData);
    return response.data;
  } catch (error) {
    console.error('Error verifying customer OTP:', error);
    throw error;
  }
};

/**
 * Submits customer details.
 *
 * @param {Object} detailsData - The customer details to submit.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const submitCustomerDetails = async detailsData => {
  try {
    const response = await axiosInstance.post(
      '/customers/customerDetails',
      detailsData,
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting customer details:', error);
    throw error;
  }
};

/**
 * Submits the customer's loan amount information.
 *
 * @param {Object} loanAmountData - The loan amount data to submit.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const submitCustomerLoanAmount = async loanAmountData => {
  try {
    const response = await axiosInstance.post(
      '/customers/customerLoanAmount',
      loanAmountData,
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting customer loan amount:', error);
    throw error;
  }
};

/**
 * Adds a reference for the customer.
 *
 * @param {Object} referenceData - The reference data to add.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const addCustomerReference = async (applicationId, referenceData) => {
  try {
    const response = await axiosInstance.post(
      `loan-applications/customers/add-reference/${applicationId}`,
      referenceData,
    );
    return response.data;
  } catch (error) {
    console.error('Error adding customer reference:', error);
    throw error;
  }
};

/**
 * Submits the customer's finance details.
 *
 * @param {Object} financeDetailsData - The finance details to submit.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const submitFinanceDetails = async financeDetailsData => {
  try {
    const response = await axiosInstance.post(
      '/customers/financeDetails',
      financeDetailsData,
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting finance details:', error);
    throw error;
  }
};

/**
 * Uploads finance-related documents for the customer.
 *
 * @param {Object} documentsData - The documents data to upload.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const uploadFinanceDocuments = async documentsData => {
  try {
    const response = await axiosInstance.post(
      '/customers/financeDocuments',
      documentsData,
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading finance documents:', error);
    throw error;
  }
};

/**
 * Upload customer documents.
 *
 * @param {Object} documentsData - The customer documents to update.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const uploadCustomerDocuments = async (documentsData, customerId) => {
  try {
    const response = await axiosInstance.post(
      `/loan-applications/customerDocuments/${customerId}`,
      documentsData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating customer documents:', error);
    throw error;
  }
};

/**
 * Updates customer details.
 *
 * @param {Object} detailsData - The customer details to update.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const updateCustomerDetails = async detailsData => {
  try {
    const response = await axiosInstance.patch(
      `/customers/customerDetails/${detailsData.customerId}`,
      detailsData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating customer details:', error);
    throw error;
  }
};

/**
 * Updates customer documents.
 *
 * @param {Object} documentsData - The customer documents to update.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const updateCustomerDocuments = async (documentsData, customerId) => {
  try {
    const response = await axiosInstance.patch(
      `/customers/customerDocuments/${customerId}`,
      documentsData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating customer documents:', error);
    throw error;
  }
};

/**
 * Updates a reference for the customer.
 *
 * @param {Object} referenceData - The reference data to update.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const updateCustomerReference = async referenceData => {
  try {
    const response = await axiosInstance.patch(
      '/customers/add-reference',
      referenceData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating customer reference:', error);
    throw error;
  }
};

/**
 * Updates the customer's envelope information.
 *
 * @param {string} envelopeId - The unique identifier for the envelope.
 * @param {Object} envelopeData - The envelope data to update.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const updateCustomerEnvelope = async (envelopeId, envelopeData) => {
  try {
    const response = await axiosInstance.patch(
      `/customers/customer-envelope/${envelopeId}`,
      envelopeData,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating customer envelope with ID ${envelopeId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Deletes a customer by their unique identifier.
 *
 * @param {string} customerId - The unique ID of the customer to delete.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const deleteCustomer = async customerId => {
  try {
    const response = await axiosInstance.delete(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${customerId}:`, error);
    throw error;
  }
};
