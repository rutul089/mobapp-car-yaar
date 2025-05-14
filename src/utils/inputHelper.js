/**
 * Validate a form field by key
 * @param {string} key
 * @param {string} value
 * @returns {string} - Error message if invalid, otherwise empty string
 */
export const validateField = (key, value) => {
  // const trimmedValue = value?.trim();

  const nameRegex = /^[A-Za-z\s]+$/;
  const numericRegex = /^[0-9]+(\.[0-9]+)?$/;
  const integerRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileNumberRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const accountNumberRegex = /^[0-9]{9,18}$/;

  const trimmedValue = typeof value === 'string' ? value.trim() : '';

  switch (key) {
    case 'odometerReading':
      return trimmedValue === ''
        ? 'Please enter the odometer reading'
        : !numericRegex.test(trimmedValue) || trimmedValue.startsWith('.')
        ? 'Odometer must be a valid number (not starting with a decimal)'
        : parseFloat(trimmedValue) <= 0
        ? 'Odometer reading must be greater than 0'
        : parseFloat(trimmedValue) > 1000000
        ? 'Odometer reading seems too high'
        : '';

    case 'vehicleCondition':
      return trimmedValue === ''
        ? 'Please select a valid vehicle condition.'
        : '';

    case 'amount':
    case 'estimatedPrice':
    case 'salePrice':
    case 'trueValuePrice':
      return trimmedValue === ''
        ? 'Please enter the valid value.'
        : !integerRegex.test(trimmedValue)
        ? 'Value must be a valid number'
        : parseInt(trimmedValue, 10) <= 0
        ? 'Value must be greater than 0'
        : // : parseInt(trimmedValue, 10) > 99999999
          // ? 'Value is too large'
          '';

    default:
      return '';
  }
};

/**
 * Handle change for form fields, validate and update state
 * @param {React.Component} component
 * @param {string} key
 * @param {string} value
 */
export const handleFieldChange = (component, key, value) => {
  const errorMsg = validateField(key, value);

  component.setState(prevState => {
    const updatedErrors = {
      ...prevState.errors,
      [key]: errorMsg,
    };

    const isFormValid = Object.values(updatedErrors).every(
      error => error === '',
    );

    return {
      [key]: value,
      errors: updatedErrors,
      isFormValid,
    };
  });
};
