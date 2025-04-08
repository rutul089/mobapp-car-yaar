export const formatIndianNumber = value => {
  const [intPart, decimalPart] = value.split('.');
  let cleaned = intPart.replace(/[^0-9]/g, '');

  if (!cleaned) {
    return '';
  }

  let lastThree = cleaned.slice(-3);
  let otherNumbers = cleaned.slice(0, -3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
};

export const formatAmount = text => {
  // Allow only numbers and one dot
  return text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
};
