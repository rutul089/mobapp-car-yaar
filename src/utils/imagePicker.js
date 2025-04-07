// utils/imagePicker.js
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  includeBase64: false,
  quality: 0.8,
  maxWidth: 1000,
  maxHeight: 1000,
};

export const pickImage = async (fromCamera = false) => {
  return new Promise((resolve, reject) => {
    const callback = response => {
      if (response.didCancel) {
        resolve(null); // User cancelled the picker
      } else if (response.errorCode) {
        reject(new Error(response.errorMessage || 'ImagePicker Error'));
      } else {
        resolve(response.assets?.[0] || null);
      }
    };

    if (fromCamera) {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  });
};
