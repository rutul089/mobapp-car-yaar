import {combineReducers} from 'redux';

import appStateReducer from './appStateReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import loanReducer from './loanReducer';
import vehicleReducer from './vehicleReducer';
import customerReducer from './customerReducer';
import bankReducer from './bankReducer';
import performanceReducer from './performanceReducer';
import sendCustomerOtpForCibilReducer from './sendCustomerOtpForCibilReducer';
import salesExecutiveReducer from './salesExecutiveReducer';
import emiPlanReducer from './emiPlanReducer';
import envelopeReducer from './envelopeReducer';
import lenderReducer from './lenderReducer';

const rootReducer = combineReducers({
  appState: appStateReducer,
  auth: authReducer,
  user: userReducer,
  loanData: loanReducer,
  vehicleData: vehicleReducer,
  customerData: customerReducer,
  bankData: bankReducer,
  partnerPerformance: performanceReducer,
  cibilReducer: sendCustomerOtpForCibilReducer,
  salesExecutives: salesExecutiveReducer,
  emiPlan: emiPlanReducer,
  envelopeData: envelopeReducer,
  lenderData: lenderReducer,
});

export default rootReducer;
