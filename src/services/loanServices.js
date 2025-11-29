import axiosInstance from '../networking/axiosInstance';
import {endpoints} from './endpoints';

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
      endpoints.LOAN.INITIATE,
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
    throw new Error('Application ID is required');
  }
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.CUSTOMER_LOAN_AMOUNT(applicationId),
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
      endpoints.CUSTOMER.SEND_OTP_CIBIL,
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
      endpoints.CUSTOMER.VERIFY_OTP_CIBIL,
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
      endpoints.LOAN.CUSTOMER_LOAN_AMOUNT(applicationId),
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
      endpoints.LOAN.SET_PARTNER_SALES(applicationId),
      payload,
    );
    return response.data;
  } catch (error) {
    console.error('Error setting partner and sales executive:', error);
    throw error;
  }
};

export const fetchLoanTrackingDetailsByAppId = async applicationId => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.TRACKING(applicationId),
    );
    return response.data;
  } catch (error) {
    console.error('Error setting partner and sales executive:', error);
    throw error;
  }
};

/**
 * Submit a loan application.
 *
 * @param {string} applicationId - The ID of the loan application.
 * @returns {Promise<Object>} - The response data from the server after submission.
 * @throws Will throw an error if the API request fails.
 */
export const submitLoanApplication = async applicationId => {
  try {
    const response = await axiosInstance.post(
      endpoints.LOAN.SUBMIT(applicationId),
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
};

/**
 * Fetches EMI plans based on the provided payload.
 *
 * @async
 * @function fetchEmiPlans
 * @param {Object} payload - The request body containing loan details required for EMI calculation.
 * @returns {Promise<Object>} The response data containing available EMI plans.
 * @throws {Error} If the API request fails.
 */
export const fetchEmiPlans = async payload => {
  try {
    const response = await axiosInstance.post(endpoints.LOAN.EMI_PLAN, payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching EMI plans:', error);
    throw error;
  }
};

/**
 * Fetches required loan documents filtered by loan category, customer type, and document type.
 *
 * with an additional query parameter `document_required`.
 *
 * @async
 * @function fetchLoanDocumentsByCategory
 * @param {string} category - The loan category (e.g., "car-loan", "personal-loan").
 * @param {string} customerType - The customer type or occupation label.
 * @param {string} documentRequired - The specific document type required (e.g., "Aadhaar", "PAN").
 * @returns {Promise<Object>} The response data containing matching document requirements.
 * @throws {Error} If the API request fails.
 */
export const fetchLoanDocumentsByCategory = async (
  category,
  customerType,
  documentRequired,
) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN_DOCUMENTS.BY_CATEGORY(category, customerType),
      {
        params: {document_required: documentRequired},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching loan documents by category:', error);
    throw error;
  }
};

/**
 * Fetch all lenders from the API.
 *
 * @param {Object} [config={}] - Optional Axios config (e.g., headers, params).
 * @returns {Promise<Object>} The response data containing the list of lenders.
 * @throws Will throw an error if the API call fails.
 */
export const fetchAllLenders = async (
  page = 1,
  limit = 10,
  principalAmount,
  payload = {},
) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LENDER.LIST(principalAmount),
      {
        ...payload,
        params: {
          page,
          limit,
          ...(payload.params || {}),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching lenders:', error?.response?.data || error);
    throw error;
  }
};
