export const validateMobileNumber = input => {
  if (!input) {
    return false;
  }

  // Final check: must be 10 digits and start with 6-9
  //   const regex = /^[6-9]\d{9}$/;
  const regex = /^\d{10}$/;
  return regex.test(input);
};
