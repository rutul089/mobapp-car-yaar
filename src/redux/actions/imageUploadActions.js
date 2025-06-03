import {
  getPresignedDownloadUrl,
  getPresignedUploadUrl,
  uploadFileToPresignedUrl,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';

export const getPresignedUploadUrlThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    try {
      const response = await getPresignedUploadUrl(payload);
      onSuccess?.(response);
    } catch (error) {
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };
export const getPresignedDownloadUrlThunk =
  (payload, onSuccess, onFailure) => async dispatch => {
    try {
      const response = await getPresignedDownloadUrl(payload);
      onSuccess?.(response);
    } catch (error) {
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };

export const uploadFileToPresignedUrlThunk =
  (presignedUrl, file, contentType, onSuccess, onFailure) => async dispatch => {
    try {
      const response = await uploadFileToPresignedUrl(
        presignedUrl,
        file,
        contentType,
      );
      onSuccess?.(response);
    } catch (error) {
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };
