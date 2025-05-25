import Toast from 'react-native-toast-message';
import moment from 'moment';
import {applicationStatus} from '../constants/enums';
import {theme} from '@caryaar/components';

export const formatIndianCurrency = (
  value,
  showSign = true,
  showPlaceholder = false,
) => {
  if (!value) {
    return showPlaceholder ? '' : '-';
  }
  const [intPart, decimalPart] = value?.toString().split('.');
  let cleaned = intPart.replace(/[^0-9]/g, '');

  if (!cleaned) {
    return showPlaceholder ? '' : '-';
  }

  let lastThree = cleaned.slice(-3);
  let otherNumbers = cleaned.slice(0, -3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  let formatAmount = decimalPart ? `${formatted}.${decimalPart}` : formatted;
  return showSign ? `₹${formatAmount}` : formatAmount;
};

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
    default:
      return ['#E8E8E8', '#E8E8E8']; // fallback
  }
};

export const getStatusColor = status => {
  switch (status) {
    case 'SAVED':
      return '#1D95F0';
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
export const formatDate = (inputDate, outputFormat = 'DD MMM YYYY') => {
  if (!inputDate || typeof inputDate !== 'string') {
    return '-';
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
    case applicationStatus.PENDING:
    case applicationStatus.IN_REVIEW:
      return theme.colors.appliedGradient;
    case applicationStatus.APPROVED:
      return theme.colors.lenderApprovedGradient;
    case applicationStatus.REJECTED:
    case applicationStatus.QUERY:
      return theme.colors.onHoldGradient;
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
    case 'SAVED':
      return '#1D95F0';
    case 'IN_PROGRESS':
      return 'rgba(243, 105, 110, 0.12)';
    case 'COMPLETED':
      return 'rgba(110, 238, 135, 0.2)';
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
