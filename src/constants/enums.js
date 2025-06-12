export const applicationStatus = Object.freeze({
  APPROVED: 'APPROVED',
  IN_REVIEW: 'IN_REVIEW',
  QUERY: 'QUERY',
  REJECTED: 'REJECTED',
  DRAFT: 'DRAFT',
  DISBURSED: 'DISBURSED',
});

export const applicationStatusOptions = [
  {id: '1', label: 'Approved', value: applicationStatus.APPROVED},
  {id: '2', label: 'Rejected', value: applicationStatus.REJECTED},
  {id: '4', label: 'Query', value: applicationStatus.QUERY},
  {id: '5', label: 'In Review', value: applicationStatus.IN_REVIEW},
  {id: '6', label: 'Disbursed', value: applicationStatus.DISBURSED},
];

export const applicationStatusValue = {
  [applicationStatus.APPROVED]: 'Approved',
  [applicationStatus.REJECTED]: 'Rejected',
  [applicationStatus.QUERY]: 'Query',
  [applicationStatus.IN_REVIEW]: 'In Review',
  [applicationStatus.DRAFT]: 'Draft',
  [applicationStatus.DISBURSED]: 'Disbursed',
};

export const customerCategory = Object.freeze({
  CORPORATE: 'CORPORATE',
  INDIVIDUAL: 'INDIVIDUAL',
});

export const customerCategoryOptions = [
  {id: '1', label: 'Individual', value: customerCategory.INDIVIDUAL},
  {id: '2', label: 'Corporate', value: customerCategory.CORPORATE},
];

export const customerCategoryValue = {
  [customerCategory.INDIVIDUAL]: 'Individual',
  [customerCategory.CORPORATE]: 'Corporate',
};

export const customerIndividualType = Object.freeze({
  BUSINESS: 'BUSINESS',
  OTHERS: 'OTHERS',
  RETIRED: 'RETIRED',
  SALARIED: 'SALARIED',
  SELFEMPLOYED: 'SELFEMPLOYED',
  STUDENT: 'STUDENT',
});

export const customerIndividualTypeOptions = [
  {id: '1', label: 'Salaried', value: customerIndividualType.SALARIED},
  {id: '2', label: 'Self Employed', value: customerIndividualType.SELFEMPLOYED},
  {id: '3', label: 'Business', value: customerIndividualType.BUSINESS},
  {id: '4', label: 'Retired', value: customerIndividualType.RETIRED},
  {id: '5', label: 'Student', value: customerIndividualType.STUDENT},
  {id: '6', label: 'Others', value: customerIndividualType.OTHERS},
];

export const customerIndividualTypeValue = {
  [customerIndividualType.SALARIED]: 'Salaried',
  [customerIndividualType.SELFEMPLOYED]: 'Self Employed',
  [customerIndividualType.BUSINESS]: 'Business',
  [customerIndividualType.RETIRED]: 'Retired',
  [customerIndividualType.STUDENT]: 'Student',
  [customerIndividualType.OTHERS]: 'Others',
};

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
  PASSPORT_SIZE_PHOTO: 'passportImage',
  CO_APPLICANT_DOCUMENTS: 'coapplicantImage',
});

export const documentImageLabelMap = {
  [documentImageType.ADDRESS_PROOF]: 'Address Proof',
  [documentImageType.APPLICATION_FORM]: 'Application Form',
  [documentImageType.BANKING_PROOF]: 'Banking Proof',
  [documentImageType.BUSINESS_PROOF]: 'Business Proof',
  [documentImageType.CO_APPLICANT]: 'Co-applicant Image',
  [documentImageType.FORM_34]: 'Form 34',
  [documentImageType.ID_PROOF]: 'ID Proof',
  [documentImageType.INCOME_PROOF]: 'Income Proof',
  [documentImageType.INSURANCE]: 'Insurance',
  [documentImageType.NOC]: 'NOC',
  [documentImageType.OTHER_DOCUMENTS]: 'Other Documents',
  [documentImageType.PASSPORT]: 'Passport',
  [documentImageType.PERMANENT_ADDRESS]: 'Permanent Address',
  [documentImageType.SANCTION_LETTER]: 'Sanction Letter',
  [documentImageType.SOA]: 'Form24 or SOA',
  [documentImageType.PASSPORT_SIZE_PHOTO]: 'Passport Image',
  [documentImageType.CO_APPLICANT_DOCUMENTS]: 'Co-applicant Image',
};

export const documentImageTypes = Object.values(documentImageType).map(v => [
  v,
]);

export const referenceType = Object.freeze({
  HOME: 'HOME',
  OFFICE: 'OFFICE',
});

export const referenceLabelMap = {
  [referenceType.HOME]: 'Home Verification',
  [referenceType.OFFICE]: 'Office Verification',
};

export const referenceTypes = [referenceType.HOME, referenceType.OFFICE];

export const eVehicleCondition = Object.freeze({
  AVERAGE: 'average',
  EXCELLENT: 'excellent',
  GOOD: 'good',
  NEW: 'new',
  POOR: 'poor',
  USED: 'used',
});

export const vehicleConditionOptions = [
  {id: '1', label: 'Excellent', value: eVehicleCondition.EXCELLENT},
  {id: '2', label: 'Good', value: eVehicleCondition.GOOD},
  {id: '3', label: 'Average', value: eVehicleCondition.AVERAGE},
  {id: '4', label: 'Poor', value: eVehicleCondition.POOR},
  {id: '5', label: 'New', value: eVehicleCondition.NEW},
  {id: '6', label: 'Used', value: eVehicleCondition.USED},
];

export const vehicleConditionValue = {
  [eVehicleCondition.EXCELLENT]: 'Excellent',
  [eVehicleCondition.GOOD]: 'Good',
  [eVehicleCondition.AVERAGE]: 'Average',
  [eVehicleCondition.POOR]: 'Poor',
  [eVehicleCondition.NEW]: 'New',
  [eVehicleCondition.USED]: 'Used',
};

export const vehicleImageType = Object.freeze({
  FRONT_VIEW: 'frontView',
  REAR_VIEW: 'rearView',
  LEFT_VIEW: 'leftView',
  RIGHT_VIEW: 'rightView',
  INTERIOR_VIEW: 'interiorView',
  VISIBLE_DAMAGE: 'visibleDamage',
  RC_BOOK: 'rcBook',
});

export const vehicleImageLabelMap = {
  [vehicleImageType.FRONT_VIEW]: 'Front View',
  [vehicleImageType.REAR_VIEW]: 'Rear View',
  [vehicleImageType.LEFT_VIEW]: 'Left View',
  [vehicleImageType.RIGHT_VIEW]: 'Right View',
  [vehicleImageType.INTERIOR_VIEW]: 'Interior View',
  [vehicleImageType.VISIBLE_DAMAGE]: 'Visible Damage',
  [vehicleImageType.RC_BOOK]: 'RC Book',
};

export const vehicleImageTypes = Object.values(vehicleImageType).map(v => v);

export const occupationType = Object.freeze({
  SALARIED: 'SALARIED',
  SELF_EMPLOYED: 'SELF_EMPLOYED',
  SELF_EMPLOYED_PROFESSIONAL: 'SELF_EMPLOYED_PROFESSIONAL',
  AGRICULTURE: 'AGRICULTURE',
  OTHER: 'OTHER',
});

export const occupationLabelMap = {
  [occupationType.SALARIED]: 'Salaried',
  [occupationType.SELF_EMPLOYED]: 'Self Employed',
  [occupationType.SELF_EMPLOYED_PROFESSIONAL]: 'Self Employed Professional',
  [occupationType.AGRICULTURE]: 'Agriculture',
  [occupationType.OTHER]: 'Other',
};

export const occupationOptions = [
  {
    id: '1',
    label: occupationLabelMap[occupationType.SALARIED],
    value: occupationType.SALARIED,
  },
  {
    id: '2',
    label: occupationLabelMap[occupationType.SELF_EMPLOYED],
    value: occupationType.SELF_EMPLOYED,
  },
  {
    id: '3',
    label: occupationLabelMap[occupationType.SELF_EMPLOYED_PROFESSIONAL],
    value: occupationType.SELF_EMPLOYED_PROFESSIONAL,
  },
  {
    id: '4',
    label: occupationLabelMap[occupationType.AGRICULTURE],
    value: occupationType.AGRICULTURE,
  },
  {
    id: '5',
    label: occupationLabelMap[occupationType.OTHER],
    value: occupationType.OTHER,
  },
];

export const genderType = Object.freeze({
  MALE: 'Male',
  FEMALE: 'Female',
});

export const genderLabelMap = {
  [genderType.MALE]: 'Male',
  [genderType.FEMALE]: 'Female',
};

export const genderTypes = [
  {label: genderLabelMap[genderType.MALE], value: genderType.MALE},
  {label: genderLabelMap[genderType.FEMALE], value: genderType.FEMALE},
];

export const currentLoanOptions = Object.freeze({
  NO: false,
  YES: true,
});

export const currentLoanLabelMap = {
  [currentLoanOptions.NO]: 'No',
  [currentLoanOptions.YES]: 'Yes',
};

export const currentLoanTypes = [
  {
    label: currentLoanLabelMap[currentLoanOptions.YES],
    value: currentLoanOptions.YES,
  },
  {
    label: currentLoanLabelMap[currentLoanOptions.NO],
    value: currentLoanOptions.NO,
  },
];

export const API_TRIGGER = {
  DEFAULT: 'default',
  LOAD_MORE: 'loadMore',
  PULL_TO_REFRESH: 'pullToRefresh',
};

export const gender = Object.freeze({
  female: 'female',
  male: 'male',
});

export const loanType = Object.freeze({
  addVehicle: 9,
  externalBT: 'EXTERNAL_BALANCE_TRANSFER',
  internalBT: 'INTERNAL_BALACE_TRANSFER',
  lease: 7,
  loan: 6,
  purchase: 'OLD_CAR_SALE_PURCHASE',
  refinance: 'REFINANCE',
  subscribe: 8,
  topUp: 'TOP_UP',
});

export const loanTypeLabelMap = {
  [loanType.addVehicle]: 'Add Vehicle',
  [loanType.externalBT]: 'External Balance Transfer',
  [loanType.internalBT]: 'Internal Balance Transfer',
  [loanType.lease]: 'Lease',
  [loanType.loan]: 'Loan',
  [loanType.purchase]: 'Purchase',
  [loanType.refinance]: 'Refinance',
  [loanType.subscribe]: 'Subscribe',
  [loanType.topUp]: 'Top-Up',
};

export const vehicleType = Object.freeze({
  used: 'used',
  new: 'new',
});

/**
 * Generic helper to get label from any label map.
 */
export const getLabelFromEnum = (enumObject, value, defaultLabel = '') => {
  return enumObject?.[value] || defaultLabel;
};

/**
 * Helper to get application status label.
 */
export const getApplicationStatusLabel = status => {
  return applicationStatusValue[status] || '';
};

export const userRole = Object.freeze({
  ADMIN: 'ADMIN',
  PARTNER: 'PARTNER',
  SALES_EXECUTIVE: 'SALES_EXECUTIVE',
});

export const userRoleValue = {
  [userRole.ADMIN]: 'Admin',
  [userRole.PARTNER]: 'Partner',
  [userRole.SALES_EXECUTIVE]: 'Sales Executive',
};

export const relationshipType = Object.freeze({
  FATHER: 'FATHER',
  MOTHER: 'MOTHER',
  SPOUSE: 'SPOUSE',
  BROTHER: 'BROTHER',
  SISTER: 'SISTER',
  SON: 'SON',
  DAUGHTER: 'DAUGHTER',
  FRIEND: 'FRIEND',
  RELATIVE: 'RELATIVE',
  COLLEAGUE: 'COLLEAGUE',
  EMPLOYER: 'EMPLOYER',
  NEIGHBOR: 'NEIGHBOR',
  OTHER: 'OTHER',
});

export const relationshipTypeOptions = [
  {label: 'Father', value: relationshipType.FATHER},
  {label: 'Mother', value: relationshipType.MOTHER},
  {label: 'Spouse', value: relationshipType.SPOUSE},
  {label: 'Brother', value: relationshipType.BROTHER},
  {label: 'Sister', value: relationshipType.SISTER},
  {label: 'Son', value: relationshipType.SON},
  {label: 'Daughter', value: relationshipType.DAUGHTER},
  {label: 'Friend', value: relationshipType.FRIEND},
  {label: 'Relative', value: relationshipType.RELATIVE},
  {label: 'Colleague', value: relationshipType.COLLEAGUE},
  {label: 'Employer', value: relationshipType.EMPLOYER},
  {label: 'Neighbor', value: relationshipType.NEIGHBOR},
  {label: 'Other', value: relationshipType.OTHER},
];

export const relationshipTypeValue = {
  [relationshipType.FATHER]: 'Father',
  [relationshipType.MOTHER]: 'Mother',
  [relationshipType.SPOUSE]: 'Spouse',
  [relationshipType.BROTHER]: 'Brother',
  [relationshipType.SISTER]: 'Sister',
  [relationshipType.SON]: 'Son',
  [relationshipType.DAUGHTER]: 'Daughter',
  [relationshipType.FRIEND]: 'Friend',
  [relationshipType.RELATIVE]: 'Relative',
  [relationshipType.COLLEAGUE]: 'Colleague',
  [relationshipType.EMPLOYER]: 'Employer',
  [relationshipType.NEIGHBOR]: 'Neighbor',
  [relationshipType.OTHER]: 'Other',
};

export const salesExecutivePosition = Object.freeze({
  SALES_EXECUTIVE: 'SALES_EXECUTIVE',
  SENIOR_SALES_EXECUTIVE: 'SENIOR_SALES_EXECUTIVE',
  TEAM_LEAD: 'TEAM_LEAD',
  MANAGER: 'MANAGER',
});

/**
 * Dropdown options for Sales Executive Position selection.
 * Used in forms, UI dropdowns, or selectors.
 */
export const salesExecOptions = [
  {
    id: '1',
    label: 'Sales Executive',
    value: salesExecutivePosition.SALES_EXECUTIVE,
  },
  {
    id: '2',
    label: 'Senior Sales Executive',
    value: salesExecutivePosition.SENIOR_SALES_EXECUTIVE,
  },
  {id: '3', label: 'Team Lead', value: salesExecutivePosition.TEAM_LEAD},
  {id: '4', label: 'Manager', value: salesExecutivePosition.MANAGER},
];

/**
 * Mapping of Sales Executive Position value to its display label.
 */
export const salesExecutiveValue = {
  [salesExecutivePosition.SALES_EXECUTIVE]: 'Sales Executive',
  [salesExecutivePosition.SENIOR_SALES_EXECUTIVE]: 'Senior Sales Executive',
  [salesExecutivePosition.TEAM_LEAD]: 'Team Lead',
  [salesExecutivePosition.MANAGER]: 'Manager',
};

export const vehicleFilterOption = Object.freeze({
  SAVED: 'SAVED',
  DRAFT: 'DRAFT',
});
