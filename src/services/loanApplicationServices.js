import axiosInstance from '../networking/axiosInstance';
import {endpoints} from './endpoints';

/**
 * Fetch paginated loan applications.
 *
 * @param {number} [page=1] - The page number to retrieve.
 * @param {number} [limit=10] - The number of items per page.
 * @param {object} [payload={}] - Optional Axios request config or query parameters.
 * @param {object} [payload.params] - Additional query parameters (e.g., filters, sorting).
 * @returns {Promise<object>} - A promise that resolves to the loan applications data.
 *
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchLoanApplications = async (
  page = 1,
  limit = 10,
  payload = {},
) => {
  try {
    const response = await axiosInstance.get(endpoints.LOAN.LIST, {
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

/**
 * Fetch details of a single loan application.
 * @param {string} applicationId - Loan application ID.
 * @param {object} config - Optional Axios config.
 * @returns {Promise<object>} - Loan application details.
 */
export const fetchLoanApplicationById = async (applicationId, config = {}) => {
  if (!applicationId) {
    throw new Error('Application ID is required');
  }

  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.BY_ID(applicationId),
      config,
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch loan application ${applicationId}:`, error);
    throw error;
  }
};

/**
 * Fetch loan application status statistics.
 * @param {object} config - Optional Axios config.
 * @returns {Promise<object>} - Loan status stats.
 */
export const fetchLoanStatusStats = async (config = {}) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.STATUS_STATS,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch loan status stats:', error);
    throw error;
  }
};

/**
 * Fetch loan applications overview.
 * @param {object} config - Optional Axios config.
 * @returns {Promise<object>} - Loan overview data.
 */
export const fetchLoanApplicationsOverview = async (config = {}) => {
  try {
    const response = await axiosInstance.get(endpoints.LOAN.OVERVIEW, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch loan overview:', error);
    throw error;
  }
};

/**
 * Create a new loan application.
 * @param {object} payload - Loan application data.
 * @param {object} config - Optional Axios config.
 * @returns {Promise<object>} - Created loan application.
 */
export const createLoanApplication = async (payload, config = {}) => {
  try {
    const response = await axiosInstance.post(
      endpoints.LOAN.LIST,
      payload,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create loan application:', error);
    throw error;
  }
};

/**
 * Assign a loan application to a credit officer.
 * @param {object} payload - Assignment details (e.g., { applicationId, creditOfficerId }).
 * @param {object} config - Optional Axios config.
 * @returns {Promise<object>} - Assignment result.
 */
export const assignLoanToCreditOfficer = async (payload, config = {}) => {
  try {
    const response = await axiosInstance.post(
      endpoints.LOAN.ASSIGN_TO_CREDIT,
      payload,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to assign loan to credit officer:', error);
    throw error;
  }
};

/**
 * Submits finance details for a given application ID.
 *
 * @param {string} applicationId - The ID of the application.
 * @param {object} financeDetails - The finance details payload to submit.
 * @param {object} [config={}] - Optional Axios request config.
 * @returns {Promise<object>} - The server response.
 * @throws {Error} If the application or financeDetails are invalid or the request fails.
 */
export const postCustomerFinanceDetails = async (
  applicationId,
  financeDetails,
  config = {},
) => {
  if (!applicationId) {
    throw new Error('Customer ID is required');
  }

  try {
    const response = await axiosInstance.post(
      endpoints.LOAN.FINANCE_DETAILS(applicationId),
      financeDetails,
      config,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches finance details for a given customer ID.
 *
 * @param {string} applicationId - The ID of the application.
 * @param {object} [config={}] - Optional Axios request configuration.
 * @returns {Promise<object>} The finance details of the customer.
 * @throws Will throw an error if the customerId is missing or the request fails.
 *
 */
export const fetchCustomerFinanceDetails = async (
  applicationId,
  config = {},
) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.FINANCE_DETAILS(applicationId),
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch finance details for customer ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Fetches finance-related documents for a specific loan application.
 *
 * This API retrieves all finance documents uploaded or generated for
 *
 * @async
 * @function fetchCustomerFinanceDocuments
 * @param {string|number} applicationId - The unique ID of the loan application.
 * @param {Object} [config={}] - Optional Axios request configuration (e.g., headers, params).
 * @returns {Promise<Object>} The response data containing finance documents.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchCustomerFinanceDocuments = async (
  applicationId,
  config = {},
) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.FINANCE_DOCUMENTS(applicationId),
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch finance details for customer ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Fetch more finance details for a specific customer.
 *
 * @param {string} customerId - The ID of the customer.
 * @param {object} [config={}] - Optional Axios config.
 * @returns {Promise<object>} Response data containing additional finance details.
 * @throws Will throw an error if the request fails or applicationId is not provided.
 */
export const fetchCustomerMoreFinanceDetails = async (
  customerId,
  config = {},
) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.CUSTOMER_MORE_FINANCE_DETAILS(customerId),
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch more finance details for customer ID ${customerId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Uploads or updates finance-related documents for a specific loan application.
 *
 * @async
 * @function postCustomerFinanceDocuments
 * @param {string|number} applicationId - The unique ID of the loan application.
 * @param {Object} financeDocuments - The finance documents payload to be posted.
 * @param {Object} [config={}] - Optional Axios configuration (headers, params, etc.).
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} Throws an error if the request fails.
 */
export const postCustomerFinanceDocuments = async (
  applicationId,
  financeDocuments,
  config = {},
) => {
  try {
    const response = await axiosInstance.post(
      endpoints.LOAN.FINANCE_DOCUMENTS(applicationId),
      financeDocuments,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch finance details for customer ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Updates lender details for a specific loan application.
 *
 * @async
 * @function postCustomerLenderDetails
 * @param {string|number} applicationId - The unique ID of the loan application.
 * @param {Object} lenderData - The lender information to be updated.
 * @param {Object} [config={}] - Optional Axios configuration settings.
 * @returns {Promise<Object>} The updated loan application data.
 * @throws {Error} Throws an error if updating lender details fails.
 */
export const postCustomerLenderDetails = async (
  applicationId,
  lenderData,
  config = {},
) => {
  try {
    const response = await axiosInstance.patch(
      endpoints.LOAN.LENDER_DETAILS(applicationId),
      lenderData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to set lender details for application ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Adds new reference details to a loan application.
 *
 * @async
 * @function postCustomerReferenceDetails
 * @param {string|number} applicationId - The ID of the loan application.
 * @param {Object} referenceData - The reference details payload.
 * @param {Object} [config={}] - Optional Axios configuration.
 * @returns {Promise<Object>} The server response containing saved reference details.
 * @throws {Error} Throws an error if adding reference details fails.
 */
export const postCustomerReferenceDetails = async (
  applicationId,
  referenceData,
  config = {},
) => {
  try {
    const response = await axiosInstance.post(
      endpoints.LOAN.ADD_REFERENCE(applicationId),
      referenceData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to add reference details for application ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Retrieves reference details for a specific loan application.
 *
 * @async
 * @function getCustomerReferenceDetails
 * @param {string|number} applicationId - The loan application's unique ID.
 * @param {Object} [config={}] - Optional Axios request configuration.
 * @returns {Promise<Object>} The response data containing reference details.
 * @throws {Error} Throws an error if fetching reference details fails.
 */
export const getCustomerReferenceDetails = async (
  applicationId,
  config = {},
) => {
  try {
    const response = await axiosInstance.get(
      endpoints.LOAN.REFERENCE_DETAILS(applicationId),
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to add reference details for application ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Edits existing reference details for a specific loan application.
 *
 * @async
 * @function editCustomerReferenceDetails
 * @param {string|number} applicationId - The unique loan application ID.
 * @param {Object} referenceData - Updated reference details payload.
 * @param {Object} [config={}] - Optional Axios configuration.
 * @returns {Promise<Object>} The updated reference details from the server.
 * @throws {Error} Throws an error if editing reference details fails.
 */
export const editCustomerReferenceDetails = async (
  applicationId,
  referenceData,
  config = {},
) => {
  try {
    const response = await axiosInstance.patch(
      endpoints.LOAN.REFERENCE_DETAILS(applicationId),
      referenceData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to add reference details for application ID ${applicationId}:`,
      error,
    );
    throw error;
  }
};

/**
 * Deletes a loan application by its ID.
 *
 * @param {string} applicationId - The ID of the loan application to delete.
 * @param {object} [config={}] - Optional Axios configuration (e.g., headers).
 * @returns {Promise<object>} The response data from the API after deletion.
 * @throws Will throw an error if the application ID is not provided or the request fails.
 *
 */
export const deleteLoanApplicationById = async (applicationId, config = {}) => {
  if (!applicationId) {
    throw new Error('Application ID is required for deletion');
  }

  try {
    const response = await axiosInstance.delete(
      endpoints.LOAN.DELETE(applicationId),
      config,
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to delete loan application ${applicationId}:`, error);
    throw error;
  }
};
