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
