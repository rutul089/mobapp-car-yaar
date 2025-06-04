import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {getPresignedUploadUrl, uploadFileWithFormData} from '../services';

/**
 * Uploads a photo using multipart/form-data.
 * @param {Object} asset - The selected file asset.
 * @param {string} fileName - Name of the file.
 * @param {string} mimeType - MIME type of the file.
 * @returns {Promise<string>} - Resolves with uploaded file URL.
 */
export const uploadApplicantPhoto = (asset, fileName, mimeType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        type: mimeType,
        name: fileName,
      });

      const response = await uploadFileWithFormData(formData);
      const url = response?.data?.fileUrl;

      if (!url) {
        throw new Error('Upload failed: No file URL returned');
      }

      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Uploads a file using a pre-signed URL.
 * @param {Object} asset - The selected file asset.
 * @param {string} fileName - Name of the file.
 * @param {string} mimeType - MIME type of the file.
 * @param {string} selectionType - Prefix for file key on S3.
 * @returns {Promise<string>} - Resolves with uploaded file key.
 */
export const uploadDocumentViaPresignedUrl = (
  asset,
  fileName,
  mimeType,
  selectionType,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const uploadUrlResponse = await getPresignedUploadUrl({
        objectKey: fileName,
        prefix: selectionType,
      });

      const presignedUrl = uploadUrlResponse?.data?.url;
      const presignedKey = uploadUrlResponse?.data?.key;

      if (!presignedUrl) {
        throw new Error('Presigned URL not received');
      }

      const fileBase64 = await RNFS.readFile(asset.uri, 'base64');
      const fileBuffer = Buffer.from(fileBase64, 'base64');

      await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': mimeType,
          'Content-Length': fileBuffer.length.toString(),
        },
        body: fileBuffer,
      });

      resolve(presignedKey);
    } catch (error) {
      reject(error);
    }
  });
};
