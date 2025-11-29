import axiosInstance from '../networking/axiosInstance';
import {endpoints} from './endpoints';

/**
 * Retrieves the count of unread notifications for the authenticated user.
 *
 * @returns {Promise<Object>} The response data containing the notification count.
 * @throws Will throw an error if the API call fails.
 */
export const getNotificationCounts = async () => {
  try {
    const response = await axiosInstance.get(endpoints.NOTIFICATIONS.COUNTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification counts:', error);
    throw error;
  }
};

/**
 * Retrieves the list of notifications for the authenticated user.
 *
 * @returns {Promise<Object>} The response data containing the list of notifications.
 * @throws Will throw an error if the API call fails.
 */
export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get(endpoints.NOTIFICATIONS.LIST);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Marks all notifications as read for the authenticated user.
 *
 * @returns {Promise<Object>} The response data confirming the operation.
 * @throws Will throw an error if the API call fails.
 */
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axiosInstance.patch(
      endpoints.NOTIFICATIONS.READ_ALL,
    );
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

/**
 * Marks a specific notification as read.
 *
 * @param {string|number} notificationId - The ID of the notification to mark as read.
 * @returns {Promise<Object>} The response data confirming the operation.
 * @throws Will throw an error if the API call fails.
 */
export const markNotificationAsRead = async notificationId => {
  try {
    const response = await axiosInstance.patch(
      endpoints.NOTIFICATIONS.READ_ONE(notificationId),
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error marking notification ${notificationId} as read:`,
      error,
    );
    throw error;
  }
};
