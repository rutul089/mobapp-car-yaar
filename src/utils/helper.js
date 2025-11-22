import Toast from 'react-native-toast-message';
import moment from 'moment';
import {applicationStatus} from '../constants/enums';
import {theme, images} from '@caryaar/components';

export const formatIndianCurrency = (
  value,
  showSign = true,
  showPlaceholder = false,
) => {
  // ✅ Allow 0 to pass through, but handle null/undefined/empty string
  if (value === null || value === undefined || value === '') {
    return showPlaceholder ? '' : '-';
  }

  // Convert to string for processing
  const [intPart, decimalPart] = value.toString().split('.');
  let cleaned = intPart.replace(/[^0-9]/g, '');

  if (!cleaned) {
    return showPlaceholder ? '' : '-';
  }

  // Apply Indian numbering format
  let lastThree = cleaned.slice(-3);
  let otherNumbers = cleaned.slice(0, -3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  const formatAmount = decimalPart ? `${formatted}.${decimalPart}` : formatted;

  // ✅ Always show ₹0 for zero value
  return showSign ? `₹${formatAmount}` : formatAmount;
};

// export const formatIndianCurrency = (
//   value,
//   showSign = true,
//   showPlaceholder = false,
// ) => {
//   if (value === null || value === undefined || value === '') {
//     return showPlaceholder ? '' : '-';
//   }

//   const [intPart, decimalPart] = value?.toString().split('.');
//   let cleaned = intPart.replace(/[^0-9]/g, '');

//   if (!cleaned) {
//     return showPlaceholder ? '' : '-';
//   }

//   let lastThree = cleaned.slice(-3);
//   let otherNumbers = cleaned.slice(0, -3);
//   if (otherNumbers !== '') {
//     lastThree = ',' + lastThree;
//   }
//   const formatted =
//     otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

//   let formatAmount = decimalPart ? `${formatted}.${decimalPart}` : formatted;
//   return showSign ? `₹${formatAmount}` : formatAmount;
// };

export const formatAmount = text => {
  // Allow only numbers and one dot
  return text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
};

export const getGradientColors = status => {
  switch (status) {
    case 'SAVED':
      return ['rgba(29, 149, 240, 0.12)', 'rgba(61, 173, 255, 0.2)'];
    case 'IN_PROGRESS':
      return ['rgba(243, 105, 110, 0.12)', 'rgba(248, 169, 2, 0.2)'];
    case 'COMPLETED':
      return ['rgba(95, 197, 46, 0.12)', 'rgba(110, 238, 135, 0.2)'];
    case 'COMMERCIAL':
      return ['#FFE100', '#FFE100'];
    default:
      return ['#E8E8E8', '#E8E8E8']; // fallback
  }
};

export const getStatusColor = status => {
  switch (status) {
    case 'SAVED':
      return '#3DADFF';
    case 'IN_PROGRESS':
      return 'rgba(243, 105, 110, 0.12)';
    case 'COMPLETED':
      return 'rgba(110, 238, 135, 0.2)';
    default:
      return theme.colors.textPrimary;
  }
};

export const isLastRow = (index, data, item) => {
  const visibleItems = data.filter(d => !d.full); // half-width items
  const totalHalf = visibleItems.length;

  const lastIndex = data.length - 1;

  // Case 1: Last item
  if (index === lastIndex) {
    return true;
  }

  // Case 2: Last two half-width items in even row
  if (!item?.full && data[index + 1] && !data[index + 1].full) {
    return index === lastIndex - 1;
  }

  // Case 3: Only one half-width item at the end
  if (!item?.full && !data[index + 1]) {
    return true;
  }

  return false;
};

export const getGradientColorsLoan = status => {
  switch (status) {
    case 1: //Draft
      return ['#E8E8E8', '#E8E8E8'];
    case 2: //Applied
      return ['#F8A902', '#F3696E'];
    case 3: //lender approved
      return ['#6EEE87', '#5FC52E'];
    case 4: //on hold
      return ['#FF5B5E', '#B60003'];
    default:
      return ['#E8E8E8', '#E8E8E8'];
  }
};

/**
 * Ensure mobile number has +91 prefix
 * @param {string} num
 * @returns {string}
 */
export const formatMobileNumber = num => {
  return num.startsWith('+91') ? num : `+91${num}`;
};

/**
 * Show toast message
 * @param {'success'|'error'|'info'|'warning'} type
 * @param {string} message
 * @param {'top'|'bottom'} [position='bottom']
 * @param {number} [visibilityTime=2000]
 */
export const showToast = (
  type = 'warning',
  message = '',
  position = 'bottom',
  visibilityTime = 2000,
) => {
  Toast.show({
    type,
    text1: message,
    position,
    bottomOffset: 100,
    topOffset: 100,
    visibilityTime,
  });
};

/**
 * Show API error toast
 * @param {any} error
 */
export const showApiErrorToast = error => {
  let type = 'warning';
  let message = getErrorMessage(error);
  if (error?.status === 503) {
    type = 'warning';
    message = 'Service is temporarily unavailable. Please try again later.';
  }
  showToast(type, message, 'bottom', 3000);
};

/**
 * Parse API error object into readable message
 * @param {any} error
 * @returns {string}
 */
export const getErrorMessage = error => {
  try {
    // if (error?.message === 'Network Error') {
    //   return 'Please check your internet connection.';
    // }
    const message = error?.response?.data?.message;
    return message || 'Something went wrong';
  } catch {
    return 'Something went wrong';
  }
};

/**
 * Show API success toast
 * @param {Object} response
 */
export const showApiSuccessToast = response => {
  if (response?.success && response?.message) {
    showToast('success', response.message, 'bottom', 3000);
  }
};

/**
 * Constructs a vehicle description string from model, trim, and colour.
 * Skips any null or undefined values.
 *
 * @param {Object} vehicle
 * @param {string} vehicle.model
 * @param {string} vehicle.trim
 * @param {string} vehicle.colour
 * @returns {string} Formatted string like "Camry | XLE | Silver"
 */
export const formatVehicleDetails = ({
  model,
  trim,
  colour,
  manufactureYear = '',
}) => {
  return [model, trim, manufactureYear, colour].filter(Boolean).join(' | ');
};

/**
 * Attempts to parse and format a date string safely using known formats.
 * Prevents Moment fallback warnings by strictly validating known formats only.
 *
 * @param {string} inputDate - The input date string.
 * @param {string} outputFormat - The desired output format (default: 'DD MMM YYYY').
 * @returns {string} Formatted date or empty string if invalid.
 */
export const formatDate = (
  inputDate,
  outputFormat = 'DD MMM YYYY',
  defaultValue = '-',
) => {
  if (!inputDate || typeof inputDate !== 'string') {
    return defaultValue;
  }

  // List of known safe formats (add more if needed)
  const knownFormats = [
    moment.ISO_8601,
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'MM-DD-YYYY',
    'DD-MM-YYYY',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DDTHH:mm:ssZ',
    'YYYY-MM-DD HH:mm:ss',
    'DD MMM YYYY, hh:mm A',
  ];

  let parsedDate;

  for (const format of knownFormats) {
    parsedDate = moment(inputDate, format, true); // strict parsing
    if (parsedDate.isValid()) {
      break;
    }
  }

  return parsedDate?.isValid() ? parsedDate.format(outputFormat) : '-';
};

export const capitalizeFirstLetter = str => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Get gradient color array based on application status
 * @param {number} status
 * @returns {string[]}
 */
export const getApplicationGradientColors = status => {
  switch (status) {
    case applicationStatus.IN_REVIEW:
      return theme.colors.appliedGradient;
    case applicationStatus.APPROVED:
    case applicationStatus.DISBURSED:
      return theme.colors.lenderApprovedGradient;
    case applicationStatus.REJECTED:
    case applicationStatus.QUERY:
      return theme.colors.onHoldGradient;
    case applicationStatus.DRAFT:
      return ['#E8E8E8', '#E8E8E8'];
    default:
      return theme.colors.appliedGradient;
  }
};

/**
 * Return background color for given application status
 * @param {string} status
 * @returns {string}
 */
export const getApplicationStatusColor = status => {
  switch (status) {
    case applicationStatus.IN_REVIEW:
    case applicationStatus.APPROVED:
    case applicationStatus.REJECTED:
    case applicationStatus.QUERY:
    case applicationStatus.DISBURSED:
      return 'rgba(0, 0, 0, 0.36)';
    case applicationStatus.DRAFT:
      return '#828282';
    default:
      return theme.colors.textPrimary;
  }
};

import get from 'lodash/get';

/**
 * Safely gets a value from an object, returns fallback if loading or value is undefined.
 *
 * @param {Object} obj - The source object.
 * @param {string | Array<string>} path - Path to the property (lodash-style).
 * @param {boolean} loading - If true, fallback will be returned regardless of value.
 * @param {*} fallback - The fallback value if not found or loading is true.
 * @returns {*} The resolved value or fallback.
 */
export const safeGet = (loading = false, obj, path, fallback = '-') => {
  return loading ? fallback : get(obj, path, fallback);
};

export const formatMonths = (value, loading = false, fallback = '-') => {
  return loading ? fallback : value ? `${value} Months` : fallback;
};

export const convertToISODate = dateStr => {
  const [day, month, year] = dateStr.split('/');
  const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

  if (isNaN(date.getTime())) {
    return null; // invalid date
  }

  return date.toISOString(); // returns "1995-07-15T00:00:00.000Z"
};

/**
 * Remove country code from phone number
 * @param {string} phoneNumber
 * @param {string} [defaultCountryCode='91']
 * @returns {string}
 */
export const removeCountryCode = (phoneNumber, defaultCountryCode = '91') => {
  if (!phoneNumber) {
    return '';
  }

  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.startsWith(defaultCountryCode)) {
    return digitsOnly.slice(defaultCountryCode.length);
  }

  if (digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1);
  }

  return digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
};

export const formatVehicleNumber = (vehicleNumber = '') => {
  if (!vehicleNumber || vehicleNumber.trim() === '') {
    return '-';
  }
  const clean = vehicleNumber.toUpperCase().replace(/\s+/g, '');

  // Format for Bharat Series (e.g., KABH1234AA)
  const bhPattern = /^([A-Z]{2})(BH)(\d{4})([A-Z]{2})$/;
  const standardPattern = /^([A-Z]{2})(\d{2})([A-Z]{2})(\d{4})$/;

  if (bhPattern.test(clean)) {
    const [, state, bh, number, series] = clean.match(bhPattern);
    return `${state} ${bh} ${number} ${series}`;
  }

  // Format for standard numbers (e.g., GJ01RM5054)
  if (standardPattern.test(clean)) {
    const [, state, code, series, number] = clean.match(standardPattern);
    return `${state} ${code} ${series} ${number}`;
  }

  // Return original if it doesn't match known formats
  return vehicleNumber;
};

/**
 * Shortens a UUID or string by keeping the first 4 and last 4 characters.
 * @param {string} id - The full UUID or string to shorten.
 * @returns {string} - The shortened string in the format XXXX...YYYY.
 */
export const formatShortId = (id, length = 6) => {
  if (typeof id !== 'string' || id.length < 14) {
    return id;
  }
  return `${id.slice(0, length)}...${id.slice(-length)}`;
};

export const photoSourceOptions = [
  {label: 'Camera', value: 'camera', icon: images.file_camera},
  {label: 'Photo Gallery', value: 'gallery', icon: images.file_gallery},
];

export const uploadOptions = [
  {label: 'Camera', value: 'camera', icon: images.file_camera},
  {label: 'Photo Gallery', value: 'gallery', icon: images.file_gallery},
  {label: 'Documents', value: 'document', icon: images.file_documents},
];

/**
 * Get CIBIL score status based on score value.
 *
 * @param {number} score - The CIBIL score (300–900).
 * @returns {string} - The score category (Excellent, Good, Fair, Poor, Fail).
 */
export const getCibilScoreStatus = score => {
  if (score === -1 || score === null) {
    return 'No History';
  }

  if (score < 550) {
    return 'Poor';
  }
  if (score < 670) {
    return 'Fair';
  }
  if (score < 740) {
    return 'Good';
  }
  return 'Excellent';
};

/**
 * Generate a random Indian PAN number.
 *
 * PAN format: 5 letters + 4 digits + 1 letter -> [A-Z]{5}[0-9]{4}[A-Z]
 *  - 4th character is the holder type (P, C, F, T, H, A, B, L, J, G, etc).
 *  - 5th character is usually the first letter of the holder's last name (for individuals).
 *
 * Usage:
 *   generateRandomPAN()                     // random person-like PAN
 *   generateRandomPAN({ type: 'C' })        // company PAN (4th char = C)
 *   generateRandomPAN({ initial: 'M' })     // uses 'M' as 5th char
 *
 * Returns uppercase PAN string.
 */
export const generateRandomPAN = (options = {}) => {
  const {type = 'P', initial = null} = options;

  // Map of friendly types (optional). If user passes a letter directly it will be used.
  const typeMap = {
    person: 'P',
    company: 'C',
    firm: 'F',
    trust: 'T',
    huf: 'H',
    aop: 'A',
    body: 'B',
    local: 'L',
    j: 'J',
    govt: 'G',
  };

  // Normalize type to a single uppercase letter
  const typeChar = (
    typeMap[type?.toString()?.toLowerCase()] ||
    (typeof type === 'string' && type.toUpperCase().slice(0, 1)) ||
    'P'
  ).toUpperCase();

  const randomLetter = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
  const randomDigit = () => String(Math.floor(Math.random() * 10)); // 0-9

  // first 3 letters: random
  const first3 = Array.from({length: 3}, randomLetter).join('');

  // 5th character: use provided initial if valid letter, else random letter
  const fifthChar =
    initial && typeof initial === 'string' && /^[A-Za-z]$/.test(initial)
      ? initial.toUpperCase()
      : randomLetter();

  // middle 4 digits
  const digits4 = Array.from({length: 4}, randomDigit).join('');

  // last letter
  const last = randomLetter();

  return `${first3}${typeChar}${fifthChar}${digits4}${last}`;
};

/**
 * Generate a masked Aadhaar string (default format: "XXXXXXXX1234").
 *
 * Options:
 *  - maskChar: character used for masking (default: 'X')
 *  - maskLength: number of mask characters (default: 8)
 *  - visibleDigits: number of trailing digits to show (default: 4)
 *
 * Returns a string like: "XXXXXXXX1234"
 */
export const generateMaskedAadhaar = (options = {}) => {
  const {maskChar = 'X', maskLength = 8, visibleDigits = 4} = options;

  // Ensure visibleDigits is between 1 and 12 (Aadhaar is 12 digits total)
  const vd = Math.min(Math.max(Math.floor(visibleDigits) || 4, 1), 12);

  // Generate the trailing digits (ensure correct zero-padding)
  const max = Math.pow(10, vd);
  const min = Math.pow(10, vd - 1);
  const randomTrailing = Math.floor(min + Math.random() * (max - min));
  const trailingStr = String(randomTrailing).padStart(vd, '0');

  // Build mask
  const mask = String(maskChar).repeat(Math.max(0, Math.floor(maskLength)));

  return `${mask}${trailingStr}`;
};

export const validateReferences = references => {
  if (!Array.isArray(references) || references.length < 2) {
    return true; // not enough references to compare
  }

  const [homeRef, officeRef] = references;

  // Fields to compare
  const fieldsToCheck = ['referenceName', 'mobileNumber', 'address', 'pincode'];

  for (const field of fieldsToCheck) {
    if (
      homeRef[field]?.trim().toLowerCase() ===
      officeRef[field]?.trim().toLowerCase()
    ) {
      return {
        isValid: false,
        message: `Home and Office reference cannot have the same ${field
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()}.`,
      };
    }
  }

  return {isValid: true};
};

export const toISODateNoShift = date => {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0); // set to noon local
  return d.toISOString().slice(0, 10);
};

export const calculateVehicleAge = manufactureYear => {
  if (!manufactureYear) {
    return '';
  }

  const year = parseInt(manufactureYear, 10);
  const currentYear = new Date().getFullYear();

  if (isNaN(year) || year < 1900 || year > currentYear) {
    return '';
  }

  const age = currentYear - year;
  return `${age < 0 ? 0 : age} Years`;
};

/**
 * Extracts PAN details (like PAN number, name, etc.) from OCR API response.
 * @param {Object} response - API response object
 * @returns {Object} - Extracted PAN data or empty object
 */
export const extractPanDetails = response => {
  try {
    const fields = response?.data?.ocr_fields?.[0];
    if (!fields || fields.document_type !== 'pan') {
      console.warn('Invalid or missing PAN OCR data');
      return {};
    }

    const panNumber = fields?.pan_number?.value || '';
    const fullName = fields?.full_name?.value || '';
    const fatherName = fields?.father_name?.value || '';
    const dob = fields?.dob?.value || '';

    return {
      panNumber,
      fullName,
      fatherName,
      dob,
    };
  } catch (error) {
    console.error('Error extracting PAN details:', error);
    return {};
  }
};

/**
 * Extracts Aadhaar details (name, number, DOB, gender, etc.) from OCR API response.
 * @param {Object} response - API response object
 * @returns {Object} - Extracted Aadhaar data or empty object
 */
export const extractAadhaarDetails = response => {
  try {
    const fields = response?.data?.ocr_fields?.[0];
    if (!fields || !fields.document_type?.includes('aadhaar')) {
      console.warn('Invalid or missing Aadhaar OCR data');
      return {};
    }

    const fullName = fields?.full_name?.value || '';
    const gender = fields?.gender?.value || '';
    const dob = fields?.dob?.value || '';
    const aadhaarNumber = fields?.aadhaar_number?.value || '';
    const fatherName = fields?.father_name?.value || '';
    const motherName = fields?.mother_name?.value || '';

    return {
      fullName,
      gender,
      dob,
      aadhaarNumber,
      fatherName,
      motherName,
    };
  } catch (error) {
    console.error('Error extracting Aadhaar details:', error);
    return {};
  }
};

export const findTotalAmountNeedToPaid = (emi, tenure) => {
  const numA = parseFloat(emi);
  const numB = parseFloat(tenure);

  // If either value is not a valid number → return "-"
  if (isNaN(numA) || isNaN(numB)) {
    return '-';
  }

  return numA * numB;
};
