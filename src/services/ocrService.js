import axiosInstance from '../networking/axiosInstance';

export const uploadAadhaarForOcr = async (formData, type) => {
  const endpoint =
    type === 'aadharFrontPhoto' || type === 'aadharBackphoto'
      ? '/customers/uploadAadhaarForOcr'
      : '/customers/uploadPanForOcr';
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
