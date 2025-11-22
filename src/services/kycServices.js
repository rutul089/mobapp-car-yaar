import axiosInstance from '../networking/axiosInstance';

/**
 * Verify customer's PAN card.
 *
 * @param {Object} payload - The details required for PAN verification.
 * @param {string} payload.customerId - The unique ID of the customer.
 * @param {string} payload.panCardNumber - The PAN card number to verify.
 * @returns {Promise<Object>} - The PAN verification response from the server.
 * @throws Will throw an error if the API request fails.
 */
export const verifyPanCard = async payload => {
  try {
    const response = await axiosInstance.post(
      '/v1/customers/verifyPan',
      payload,
      {
        baseURL: 'https://caryaar-dev-api.pedalsupclients.xyz', // override baseURL
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying PAN:', error);
    throw error;
  }
};

/**
 * Fetch vehicle details by registration number.
 *
 * @param {string} registerNumber - The registration number of the vehicle.
 * @returns {Promise<Object>} - The vehicle details response from the server.
 * @throws Will throw an error if the API request fails.
 */
export const fetchVehicleDetails = async registerNumber => {
  try {
    const response = await axiosInstance.get('/v1/vehicles/details', {
      baseURL: 'https://caryaar-dev-api.pedalsupclients.xyz', // override baseURL
      params: {registerNumber},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
};
