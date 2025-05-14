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

export const getLabelFromEnum = (enumObject, value, defaultLabel = '') => {
  return enumObject?.[value] || defaultLabel;
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

export const vehicleImageTypes = [
  [vehicleImageType.FRONT_VIEW],
  [vehicleImageType.REAR_VIEW],
  [vehicleImageType.LEFT_VIEW],
  [vehicleImageType.RIGHT_VIEW],
  [vehicleImageType.INTERIOR_VIEW],
  [vehicleImageType.VISIBLE_DAMAGE],
  [vehicleImageType.RC_BOOK],
];
