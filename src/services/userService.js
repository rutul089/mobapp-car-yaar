import axiosInstance from '../networking/axiosInstance';

/**
 * Logs in a user based on type (e.g., admin, partner, customer).
 *
 * @async
 * @function loginWithType
 * @param {string} type - The type of user logging in (e.g., "admin", "partner")
 * @param {Object} payload - Login credentials (e.g., { email, password })
 * @returns {Promise<Object>} The logged-in user data from the backend
 * @throws Will throw an error if the login request fails
 */
export const loginWithType = async (type, payload) => {
  try {
    const response = await axiosInstance.post(
      `/user/login?type=${encodeURIComponent(type)}`,
      payload,
      {
        skipAuth: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Login failed:', JSON.stringify(error));
    throw error;
  }
};

/**
 * Updates the logged-in user's profile.
 *
 * @async
 * @function updateUserProfile
 * @param {Object} payload - User profile data to update
 * @returns {Promise<Object>} The updated user profile from the backend
 * @throws Will throw an error if the update fails
 */
export const updateUserProfile = async payload => {
  try {
    const response = await axiosInstance.put('/user/update-profile', payload);
    return response.data;
  } catch (error) {
    console.error('Update profile failed:', error);
    throw error;
  }
};

/**
 * Changes the user's password.
 *
 * @async
 * @function changeUserPassword
 * @param {Object} payload - Password change details (e.g., { currentPassword, newPassword })
 * @returns {Promise<Object>} Server response after successful password change
 * @throws Will throw an error if the password change fails
 */
export const changeUserPassword = async payload => {
  try {
    const response = await axiosInstance.post('/user/change-password', payload);
    return response.data;
  } catch (error) {
    console.error('Change password failed:', error);
    throw error;
  }
};

/**
 * Fetches the current user's profile data from the server.
 *
 * @param {Object} payload - Optional Axios config (e.g., headers, params).
 * @returns {Promise<Object>} - A promise that resolves to the user's profile data.
 * @throws Will throw an error if the request fails.
 */
export const getUserProfile = async payload => {
  try {
    const response = await axiosInstance.get('/user/profile', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

/**
 * Completes the user's registration process.
 *
 * @param {Object} registrationData - The data required to complete registration.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const completeUserRegistration = async registrationData => {
  try {
    const response = await axiosInstance.patch(
      '/user/complete-registration',
      registrationData,
    );
    return response.data;
  } catch (error) {
    console.error('Error completing user registration:', error);
    throw error;
  }
};
