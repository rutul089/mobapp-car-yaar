import {pick, types} from '@react-native-documents/picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {documentImageType} from '../constants/enums';

/**
 * Launches a file picker based on type: camera, gallery, or document.
 *
 * @param {'camera' | 'gallery' | 'document'} type - Picker type.
 * @param {(file: object | null) => void} callback - Callback with selected file or null.
 */
export const handleFileSelection = async (type, callback) => {
  try {
    if (type === 'camera') {
      const result = await launchCamera({mediaType: 'photo', quality: 0.8});

      if (!result.didCancel && result.assets?.length > 0) {
        callback(result.assets[0]);
      } else {
        callback(null);
      }
    } else if (type === 'gallery') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (!result.didCancel && result.assets?.length > 0) {
        callback(result.assets[0]);
      } else {
        callback(null);
      }
    } else if (type === 'document') {
      const res = await pick({
        allowMultiSelection: false,
        type: [types.pdf, types.images],
      });
      callback(res[0]);
    }
  } catch (err) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      callback(null);
    } else {
      callback(null);
    }
  }
};

/**
 * Extracts file type from a file URI.
 *
 * @param {string} fileUri - URI of the file.
 * @returns {'image' | 'pdf' | 'doc' | null} - File type.
 */
export const getFileType = fileUri => {
  if (!fileUri) {
    return null;
  }

  const ext = fileUri.split('.').pop().toLowerCase();

  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    return 'image';
  }
  if (ext === 'pdf') {
    return 'pdf';
  }
  if (['doc', 'docx'].includes(ext)) {
    return 'doc';
  }

  return null;
};

/**
 * Helper to view documents or images from URI.
 *
 * @param {string} uri - The URI to the document (can be HTTP, HTTPS, or local file path).
 * @param {(uri: string) => void} [onImage] - Callback if the file is an image.
 * @param {(error: Error) => void} [onError] - Callback if an error occurs.
 * @param {() => void} [onLoading] - Callback when loading finishes.
 */
export const viewDocumentHelper = async (uri, onImage, onError, onLoading) => {
  try {
    if (
      !uri ||
      typeof uri !== 'string' ||
      !(
        uri.startsWith('http://') ||
        uri.startsWith('https://') ||
        uri.startsWith('file://') ||
        uri.startsWith(RNFS.DocumentDirectoryPath)
      )
    ) {
      throw new Error('Invalid document URI. Must be HTTP(S) or a local file.');
    }

    // Check for image
    if (uri.startsWith('http')) {
      const response = await fetch(uri, {method: 'HEAD'});
      const contentType = response.headers.get('Content-Type') || '';
      const isImage = contentType.startsWith('image/');

      if (isImage) {
        onImage?.(uri);
        return;
      }

      // Otherwise, download and open
      const extension = contentType.split('/')[1] || 'pdf';
      const localFileName = `temp_file_${Date.now()}.${extension}`;
      const localPath = `${RNFS.DocumentDirectoryPath}/${localFileName}`;

      const result = await RNFS.downloadFile({
        fromUrl: uri,
        toFile: localPath,
      }).promise;

      if (result.statusCode === 200) {
        await FileViewer.open(localPath, {showOpenWithDialog: true});
      } else {
        throw new Error('Failed to download the file.');
      }
    } else {
      // Assume it's a local file (already on device)
      await FileViewer.open(uri, {showOpenWithDialog: true});
    }
  } catch (err) {
    console.warn('Error opening file:', err);
    onError?.(err);
  } finally {
    onLoading?.();
  }
};

/**
 * Formats the document images by creating a consistent object structure
 * only for keys that are present in the response.
 *
 * @param {Object} response - API response object containing document keys and image names.
 * @param {string} baseUrl - Base URL to prepend to image file names.
 * @returns {Object} formatted - Object with formatted document image info.
 */

export const formatDocumentImages = (response = {}, baseUrl = '') => {
  const formatted = {};

  // Map the otherDocuments type to a real image key
  const otherDocumentTypeMap = {
    APPLICATION_FORM: 'applicationFormImage',
    PASSPORT_SIZE_PHOTO: 'passportImage',
    CO_APPLICANT_DOCUMENTS: 'coapplicantImage',
  };

  // First format all static image keys
  Object.values(documentImageType).forEach(key => {
    // imageKeys.forEach(key => {
    const value = response[key];
    if (value !== null && value !== undefined) {
      const imageUrl =
        typeof value === 'object' && value.url ? value.url : value;
      formatted[key] = {
        uri: `${baseUrl}${imageUrl}`,
        uploadedUrl: `${baseUrl}${imageUrl}`,
        isLocal: false,
        type: null,
        fileSize: null,
      };
    }
  });

  // Handle one of the conditional keys based on otherDocuments
  const otherDocKey = otherDocumentTypeMap[response.otherDocuments];
  if (
    otherDocKey &&
    response[otherDocKey] !== null &&
    response[otherDocKey] !== undefined
  ) {
    const value = response[otherDocKey];
    const imageUrl = typeof value === 'object' && value.url ? value.url : value;
    formatted[otherDocKey] = {
      uri: `${baseUrl}${imageUrl}`,
      uploadedUrl: `${baseUrl}${imageUrl}`,
      isLocal: false,
      type: null,
      fileSize: null,
    };
  }

  delete formatted.otherDocuments;

  return formatted;
};

/**
 * Convert formatted images to minimal response payload for submission.
 * @param {Object} formattedImages - The object with formatted image data.
 * @param {String} customerId - The customer's ID.
 * @returns {Object} - The payload to send to backend.
 */
export const generateImageUploadPayload = (formattedImages, customerId) => {
  const payload = {
    customerId,
  };

  Object.values(documentImageType).forEach(key => {
    // staticKeys.forEach(key => {
    if (formattedImages[key]?.uploadedUrl) {
      payload[key] = formattedImages[key].uploadedUrl;
    }
  });

  // Identify otherDocument type and image key
  const otherDocumentKeys = {
    applicationFormImage: 'APPLICATION_FORM',
    passportImage: 'PASSPORT_SIZE_PHOTO',
    coapplicantImage: 'CO_APPLICANT_DOCUMENTS',
  };

  // for (const [key, type] of Object.entries(otherDocumentKeys)) {
  //   if (formattedImages[key]?.uploadedUrl) {
  //     payload.otherDocuments = {
  //       url: formattedImages[key].uploadedUrl,
  //       type,
  //     };
  //     break; // Only one type allowed
  //   }
  // }

  return payload;
};
