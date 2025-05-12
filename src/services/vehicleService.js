import axiosInstance from '../networking/axiosInstance';
/**
 * Fetches a list of vehicles with pagination.
 *
 * @param {number} page - The page number to fetch (default is 1).
 * @param {number} limit - The number of vehicles per page (default is 10).
 * @returns {Promise<Object>} The response data containing the vehicles and pagination details.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchVehicles = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get('/vehicles/', {
      params: {page, limit},
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
    throw error;
  }
};

/**
 * Updates the vehicle data for a specific vehicle using its ID.
 *
 * @param {string} id - The unique identifier of the vehicle (e.g., `4bb2b077-3828-4fb0-94e8-328c7a321641`).
 * @param {Object} data - The data to update the vehicle with (e.g., vehicle details like images, price, etc.).
 * @returns {Promise<Object>} The response data after the vehicle update.
 * @throws {Error} Throws an error if the update request fails.
 */
export const updateVehicleById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/vehicles/used/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update vehicle data:', error);
    throw error;
  }
};

/**
 * Fetches the vehicle data for a specific vehicle using its ID.
 *
 * @param {string} id - The unique identifier of the vehicle (e.g., `c9033d4b-b077-440b-8e00-9ae37a99e9fd`).
 * @returns {Promise<Object>} The vehicle data retrieved from the API.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export const getVehicleById = async id => {
  try {
    const response = await axiosInstance.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vehicle data:', error);
    throw error;
  }
};

/**
 * Fetches the vehicle data based on the registration number.
 *
 * @param {string} registerNumber - The registration number of the vehicle (e.g., `KA01MX4574`).
 * @returns {Promise<Object>} The vehicle data retrieved from the API.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export const getVehicleByRegisterNumber = async registerNumber => {
  try {
    const response = await axiosInstance.get('/vehicles/details', {
      params: {registerNumber},
    });
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch vehicle data by registration number:',
      error,
    );
    throw error;
  }
};

/**
 * Adds a new vehicle to the system through onboarding.
 *
 * @param {Object} vehicleData - The vehicle data to be added for the new vehicle.
 * @returns {Promise<Object>} The response data containing the newly added vehicle details.
 * @throws {Error} Throws an error if the POST request fails.
 */
export const onboardNewVehicle = async vehicleData => {
  try {
    const response = await axiosInstance.post('/vehicles/new', vehicleData);
    return response.data;
  } catch (error) {
    console.error('Failed to onboard new vehicle:', error);
    throw error;
  }
};

/**
 * Checks if a vehicle exists in the system based on the provided registration number.
 *
 * @param {string} registerNumber - The registration number of the vehicle (e.g., `GJ01MH5578`).
 * @returns {Promise<Object>} The response data indicating whether the vehicle exists or not.
 * @throws {Error} Throws an error if the GET request fails.
 */
export const checkVehicleExists = async registerNumber => {
  try {
    const response = await axiosInstance.get('/vehicles/check-vehicle-exists', {
      params: {registerNumber},
    });
    return response.data;
  } catch (error) {
    console.error('Failed to check if vehicle exists:', error);
    throw error;
  }
};

/**
 * Onboards a used vehicle to the system.
 *
 * @param {Object} vehicleData - The data of the used vehicle to onboard.
 * @returns {Promise<Object>} The response data after the vehicle has been onboarded successfully.
 * @throws {Error} Throws an error if the POST request fails.
 */
export const onboardUsedVehicle = async vehicleData => {
  try {
    const response = await axiosInstance.post(
      '/vehicles/used/onboard',
      vehicleData,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to onboard used vehicle:', error);
    throw error;
  }
};
