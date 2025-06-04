import axiosInstance from '../networking/axiosInstance';

/**
 * Fetch dashboard stats for a specific partner by ID.
 * @param {string} partnerId - The ID of the partner.
 * @returns {Promise<Object>} - Dashboard statistics data.
 */
export const fetchPartnerStats = async () => {
  try {
    const response = await axiosInstance.get('/partners/dashboard-stats/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch partner dashboard stats:', error);
    throw error;
  }
};

/**
 * Fetch partner employee details by employee ID, with optional query parameters.
 * @param {string} employeeId - The ID of the partner employee.
 * @param {Object} [params] - Optional query parameters to include in the request.
 * @returns {Promise<Object>} - Partner employee details data.
 */
export const fetchPartnerEmployeeById = async (employeeId, params = null) => {
  try {
    const config = params ? {params} : {};
    const response = await axiosInstance.get(
      `/partners/partner-employees/${employeeId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch partner employee details:', error);
    throw error;
  }
};
