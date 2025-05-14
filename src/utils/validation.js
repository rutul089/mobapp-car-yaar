export const validateMobileNumber = input => {
  // Final check: must be 10 digits and start with 6-9
  //   const regex = /^[6-9]\d{9}$/;
  const regex = /^[\s()-]*([0-9][\s()-]*){10}$/;
  return regex.test(input);
};

export const isValidAlphanumeric = value => {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(value);
};

export const isValidAmount = value => {
  return /^\d{1,15}(\.\d{1,3})?$/.test(value);
};

/**
 * Validates an Indian vehicle number.
 *
 * Supports both:
 * - Old format: e.g. MH12AB1234 (2 letters for state, 1-2 digits for RTO, 1-2 letters, 4 digits)
 * - Bharat (BH) format: e.g. 22BH1234AA (2-digit year, 'BH', 4 digits, 2 letters)
 *
 * @param {string} vehicleNumber - The vehicle number to validate.
 * @returns {boolean} Returns `true` if the vehicle number is valid according to Indian formats; otherwise `false`.
 */
export const isValidIndianVehicleNumber = vehicleNumber => {
  const upper = vehicleNumber.toUpperCase();

  const oldFormat = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/;
  const bharatFormat = /^\d{2}BH\d{4}[A-Z]{2}$/;

  return oldFormat.test(upper) || bharatFormat.test(upper);
};
