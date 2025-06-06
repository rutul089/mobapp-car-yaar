import axiosInstance from '../networking/axiosInstance';

/**
 * Initiate a new loan application.
 *
 * @param {Object} applicationData - The loan application data to initiate.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const initiateLoanApplication = async applicationData => {
  try {
    const response = await axiosInstance.post(
      '/loan-applications/initiate',
      applicationData,
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating loan application:', error);
    throw error;
  }
};

/**
 * Fetch customer loan amount details by customer ID.
 *
 * @param {string} customerId - The ID of the customer.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const fetchCustomerLoanAmount = async (applicationId, config = {}) => {
  if (!applicationId) {
    throw new Error('Customer ID is required');
  }
  try {
    const response = await axiosInstance.get(
      `/loan-applications/customerLoanAmount/${applicationId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching customer loan amount:', error);
    throw error;
  }
};

/**
 * Send OTP for CIBIL verification.
 *
 * @param {Object} payload - The payload to send (e.g., mobile number, customerId, etc.).
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const sendOtpForCibil = async payload => {
  try {
    const response = await axiosInstance.post(
      '/customers/sendOtpForCibil',
      payload,
    );
    return response.data;
  } catch (error) {
    console.error('Error sending OTP for CIBIL:', error);
    throw error;
  }
};

/**
 * Verify OTP for CIBIL verification.
 *
 * @param {Object} payload - The OTP verification payload (e.g., otp, customerId, etc.).
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const verifyOtpForCibil = async payload => {
  try {
    const response = await axiosInstance.post(
      '/customers/verifyOtpForCibil',
      payload,
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP for CIBIL:', error);
    throw error;
  }
};

/**
 * Updates the customer's loan amount information.
 *
 * @param {Object} loanAmountData - The loan amount data to update.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const addCustomerLoanAmount = async (loanAmountData, applicationId) => {
  try {
    const response = await axiosInstance.patch(
      `loan-applications/customerLoanAmount/${applicationId}`,
      loanAmountData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating customer loan amount:', error);
    throw error;
  }
};

/**
 * Set the partner and sales executive for a loan application.
 *
 * @param {Object} payload - Data containing partner and sales executive IDs.
 * @param {string} applicationId - The ID of the loan application.
 * @returns {Promise<Object>} - The updated loan application data from the server.
 * @throws Will throw an error if the API request fails.
 */
export const setPartnerAndSalesExecutive = async (applicationId, payload) => {
  try {
    const response = await axiosInstance.patch(
      `loan-applications/set-partner-and-sales-executive/${applicationId}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error('Error setting partner and sales executive:', error);
    throw error;
  }
};
