import axiosInstance from '../networking/axiosInstance';

/**
 * Retrieves the user's profile information.
 *
 * @returns {Promise<Object>} The user's profile data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Updates the user's profile information.
 *
 * @param {Object} profileData - The data to update the user's profile.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const updateUserProfile = async profileData => {
  try {
    const response = await axiosInstance.put(
      '/user/update-profile',
      profileData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Changes the user's password.
 *
 * @param {Object} passwordData - The current and new password information.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the API call fails.
 */
export const changeUserPassword = async passwordData => {
  try {
    const response = await axiosInstance.put(
      '/user/change-password',
      passwordData,
    );
    return response.data;
  } catch (error) {
    console.error('Error changing user password:', error);
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
