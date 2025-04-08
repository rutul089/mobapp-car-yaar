// utils/filePicker.js
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pick, types} from '@react-native-documents/picker';

export const pickImage = async (fromCamera = false) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  return new Promise((resolve, reject) => {
    const picker = fromCamera ? launchCamera : launchImageLibrary;
    picker(options, response => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorMessage) {
        reject(response.errorMessage);
      } else {
        const asset = response.assets?.[0];
        resolve(asset);
      }
    });
  });
};

// export const pickDocument = async () => {
//   try {
//     const res = await DocumentPicker.pickSingle({
//       type: [DocumentPicker.types.allFiles],
//     });

//     return res;
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       return null;
//     }
//     throw err;
//   }
// };

export const pickDocument = async () => {
  try {
    const res = await pick({
      allowMultiSelection: false,
      // type: ['*/*'], // for all files
      type: [types.pdf, types.docx, types.images],
    });

    return res[0]; // since multi-selection is false, we only get one item
  } catch (err) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      return null;
    }
    throw err;
  }
};
