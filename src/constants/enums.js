export const vehicleType = Object.freeze({
  used: 'used',
  new: 'new',
});

export const customerCategory = Object.freeze({
  individual: 'Individual',
  corporate: 'Corporate',
});

export const gender = Object.freeze({
  male: 'male',
  female: 'female',
});

export const currentLoanOptions = Object.freeze({
  yes: 'yes',
  no: 'no',
});

export const loanType = Object.freeze({
  purchase: 1,
  refinance: 2,
  topUp: 3,
  internalBT: 4,
  externalBT: 5,
  loan: 6,
  lease: 7,
  subscribe: 8,
  addVehicle: 9,
});

/**
 * Enum-like object for vehicle condition values.
 */
export const eVehicleCondition = Object.freeze({
  EXCELLENT: 'excellent',
  GOOD: 'good',
  AVERAGE: 'average',
  POOR: 'poor',
  NEW: 'new',
  USED: 'used',
});

/**
 * Dropdown options for Vehicle Condition selection.
 */
export const vehicleConditionOptions = [
  {id: '1', label: 'Excellent', value: eVehicleCondition.EXCELLENT},
  {id: '2', label: 'Good', value: eVehicleCondition.GOOD},
  {id: '3', label: 'Average', value: eVehicleCondition.AVERAGE},
  {id: '4', label: 'Poor', value: eVehicleCondition.POOR},
  {id: '5', label: 'New', value: eVehicleCondition.NEW},
  {id: '6', label: 'Used', value: eVehicleCondition.USED},
];

/**
 * Mapping of Vehicle Condition value to its display label.
 */
export const vehicleConditionValue = {
  [eVehicleCondition.EXCELLENT]: 'Excellent',
  [eVehicleCondition.GOOD]: 'Good',
  [eVehicleCondition.AVERAGE]: 'Average',
  [eVehicleCondition.POOR]: 'Poor',
  [eVehicleCondition.NEW]: 'New',
  [eVehicleCondition.USED]: 'Used',
};

// Enum for different vehicle image types used in the app
export const vehicleImageType = Object.freeze({
  FRONT_VIEW: 'frontView',
  REAR_VIEW: 'rearView',
  LEFT_VIEW: 'leftView',
  RIGHT_VIEW: 'rightView',
  INTERIOR_VIEW: 'interiorView',
  VISIBLE_DAMAGE: 'visibleDamage',
  RC_BOOK: 'rcBook',
});

// Human-readable labels corresponding to each vehicle image type
export const vehicleImageLabelMap = {
  [vehicleImageType.FRONT_VIEW]: 'Front View',
  [vehicleImageType.REAR_VIEW]: 'Rear View',
  [vehicleImageType.LEFT_VIEW]: 'Left View',
  [vehicleImageType.RIGHT_VIEW]: 'Right View',
  [vehicleImageType.INTERIOR_VIEW]: 'Interior View',
  [vehicleImageType.VISIBLE_DAMAGE]: 'Visible Damage',
  [vehicleImageType.RC_BOOK]: 'RC Book',
};

// Array of vehicle image types used for iteration or rendering
export const vehicleImageTypes = [
  [vehicleImageType.FRONT_VIEW],
  [vehicleImageType.REAR_VIEW],
  [vehicleImageType.LEFT_VIEW],
  [vehicleImageType.RIGHT_VIEW],
  [vehicleImageType.INTERIOR_VIEW],
  [vehicleImageType.VISIBLE_DAMAGE],
  [vehicleImageType.RC_BOOK],
];

// Enum for different document image types used in customer onboarding or verification
export const documentImageType = Object.freeze({
  ID_PROOF: 'idProofImage',
  ADDRESS_PROOF: 'addressProofImage',
  PERMANENT_ADDRESS: 'permanentAddressImage',
  INCOME_PROOF: 'incomeProofImage',
  BANKING_PROOF: 'bankingProofImage',
  BUSINESS_PROOF: 'businessProofImage',
  INSURANCE: 'insuranceImage',
  APPLICATION_FORM: 'applicationFormImage',
  CO_APPLICANT: 'coapplicantImage',
  PASSPORT: 'passportImage',
  OTHER_DOCUMENTS: 'otherDocuments',
  SOA: 'soa',
  SANCTION_LETTER: 'sanctionLetter',
  NOC: 'noc',
  FORM_34: 'form34',
});

// Human-readable labels corresponding to each document image type
export const documentImageLabelMap = {
  [documentImageType.ID_PROOF]: 'ID Proof',
  [documentImageType.ADDRESS_PROOF]: 'Address Proof',
  [documentImageType.PERMANENT_ADDRESS]: 'Permanent Address',
  [documentImageType.INCOME_PROOF]: 'Income Proof',
  [documentImageType.BANKING_PROOF]: 'Banking Proof',
  [documentImageType.OTHER_DOCUMENTS]: 'Other Documents',
  [documentImageType.BUSINESS_PROOF]: 'Business Proof',
  [documentImageType.INSURANCE]: 'Insurance',
  [documentImageType.APPLICATION_FORM]: 'Application Form',
  [documentImageType.CO_APPLICANT]: 'Co-applicant Image',
  [documentImageType.PASSPORT]: 'Passport',
  [documentImageType.SOA]: 'SOA',
  [documentImageType.SANCTION_LETTER]: 'Sanction Letter',
  [documentImageType.NOC]: 'NOC',
  [documentImageType.FORM_34]: 'Form 34',
};

// Array of document image types used for iteration or rendering
export const documentImageTypes = [
  [documentImageType.ID_PROOF],
  [documentImageType.ADDRESS_PROOF],
  [documentImageType.PERMANENT_ADDRESS],
  [documentImageType.INCOME_PROOF],
  [documentImageType.BANKING_PROOF],
  [documentImageType.BUSINESS_PROOF],
  [documentImageType.INSURANCE],
  [documentImageType.APPLICATION_FORM],
  [documentImageType.CO_APPLICANT],
  [documentImageType.PASSPORT],
  [documentImageType.OTHER_DOCUMENTS],
  [documentImageType.SOA],
  [documentImageType.SANCTION_LETTER],
  [documentImageType.NOC],
  [documentImageType.FORM_34],
];

// Constants to track API interaction states like loading, pagination, and refresh
export const API_TRIGGER = {
  DEFAULT: 'default',
  LOAD_MORE: 'loadMore',
  PULL_TO_REFRESH: 'pullToRefresh',
};

// Enum-like object for reference types
export const referenceType = Object.freeze({
  HOME: 'HOME',
  OFFICE: 'OFFICE',
});

// Human-readable labels corresponding to each reference type
export const referenceLabelMap = {
  [referenceType.HOME]: 'Home Verification',
  [referenceType.OFFICE]: 'Office Verification',
};

// Array of reference types used for iteration or rendering
export const referenceTypes = [referenceType.HOME, referenceType.OFFICE];

/**
 * Utility function to retrieve a label from a given enum-like object using a value.
 *
 * @param {Object} enumObject - The mapping object (e.g., label map).
 * @param {string} value - The key whose corresponding label is needed.
 * @param {string} defaultLabel - Fallback label to return if the value is not found in the enumObject.
 * @returns {string} - The label corresponding to the value or the defaultLabel if not found.
 *
 * Example:
 *   getLabelFromEnum(vehicleImageLabelMap, 'frontView', 'Unknown') // returns 'Front View'
 */
export const getLabelFromEnum = (enumObject, value, defaultLabel = '') => {
  return enumObject?.[value] || defaultLabel;
};

/**
 * Enum for Application Status values.
 */
export const applicationStatus = Object.freeze({
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
  QUERY: 'QUERY',
  IN_REVIEW: 'IN_REVIEW',
});

/**
 * Dropdown options for Application Status selection.
 */
export const applicationStatusOptions = [
  {id: '1', label: 'Approved', value: applicationStatus.APPROVED},
  {id: '2', label: 'Rejected', value: applicationStatus.REJECTED},
  {id: '3', label: 'Pending', value: applicationStatus.PENDING},
  {id: '4', label: 'Query', value: applicationStatus.QUERY},
  {id: '5', label: 'In Review', value: applicationStatus.IN_REVIEW},
];

/**
 * Mapping of Application Status value to its display label.
 */
export const applicationStatusValue = {
  [applicationStatus.APPROVED]: 'Approved',
  [applicationStatus.REJECTED]: 'Rejected',
  [applicationStatus.PENDING]: 'Pending',
  [applicationStatus.QUERY]: 'Query',
  [applicationStatus.IN_REVIEW]: 'In Review',
};

export const getApplicationStatusLabel = status => {
  return applicationStatusValue[status] || '';
};
