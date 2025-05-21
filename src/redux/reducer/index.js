import {combineReducers} from 'redux';

import appStateReducer from './appStateReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import loanReducer from './loanReducer';
import vehicleReducer from './vehicleReducer';
import customerReducer from './customerReducer';
import bankReducer from './bankReducer';

const rootReducer = combineReducers({
  appState: appStateReducer,
  auth: authReducer,
  user: userReducer,
  loanData: loanReducer,
  vehicleData: vehicleReducer,
  customerData: customerReducer,
  bankData: bankReducer,
});

export default rootReducer;
