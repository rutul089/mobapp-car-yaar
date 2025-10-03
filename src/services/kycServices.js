import axiosInstance from '../networking/axiosInstance';

/**
 * Fetch CIBIL score for a customer.
 *
 * @param {Object} payload - The customer details required for CIBIL check.
 * @param {string} payload.mobile - Customer's mobile number.
 * @param {string} payload.pan - Customer's PAN card number.
 * @param {string} payload.name - Customer's full name.
 * @param {string} payload.gender - Customer's gender.
 * @param {string} payload.consent - Consent flag (Y/N).
 * @returns {Promise<Object>} - The CIBIL score response from the server.
 * @throws Will throw an error if the API request fails.
 */
// export const fetchCibilScore = async payload => {
//   try {
//     const response = await axiosInstance.post(
//       '/customers/fetchCibilScore',
//       payload,
//       {
//         baseURL: 'https://caryaar-dev-api.pedalsupclients.xyz', // override baseURL
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching CIBIL score:', error);
//     throw error;
//   }
// };

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
    const response = await axiosInstance.post('/customers/verifyPan', payload, {
      baseURL: 'https://caryaar-dev-api.pedalsupclients.xyz', // override baseURL
    });
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
    const response = await axiosInstance.get('/vehicles/details', {
      baseURL: 'https://caryaar-dev-api.pedalsupclients.xyz', // override baseURL
      params: {registerNumber},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
};
