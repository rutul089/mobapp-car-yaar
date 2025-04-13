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
