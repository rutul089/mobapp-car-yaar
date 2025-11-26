import axiosInstance from '../networking/axiosInstance';
import {endpoints} from './endpoints';

/**
 * Uploads Aadhaar or PAN images for OCR processing.
 *
 * Depending on the `type`, this function dynamically decides whether to call
 * the Aadhaar OCR API (`/uploadAadhaarForOcr`) or the PAN OCR API (`/uploadPanForOcr`).
 * Supports multipart form uploads.
 *
 * @async
 * @function uploadAadhaarForOcr
 * @param {FormData} formData - The multipart form data containing the image file.
 * @param {string} type - The document type identifier (e.g., "aadharFrontPhoto", "aadharBackphoto", "panPhoto").
 * @returns {Promise<Object>} The OCR response data from the server.
 * @throws {Error} Throws an error if the request fails unexpectedly.
 */
export const uploadAadhaarForOcr = async (formData, type) => {
  const endpoint =
    type === 'aadharFrontPhoto' || type === 'aadharBackphoto'
      ? endpoints.OCR.AADHAAR
      : endpoints.OCR.PAN;
  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const {status, data} = error.response;
      console.error('📦 OCR Upload API Error Response:', data);

      // Extract a user-friendly message from the backend (if provided)
      const errorMessage =
        data?.message ||
        data?.error ||
        `Upload failed with status code ${status}`;

      return error.response;
    }

    console.error('❌ Unexpected Error:', error.message);
    throw new Error('Something went wrong during upload.');
  }
};
