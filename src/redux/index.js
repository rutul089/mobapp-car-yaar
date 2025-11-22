import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import reducer from './reducer';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'auth'],
  blacklist: ['vehicleData', 'loanData', 'customerData'],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Middleware setup
const middleware = [thunk];
if (__DEV__) {
  // const logger = createLogger();
  // middleware.push(logger);
}

// Create store
const store = createStore(persistedReducer, applyMiddleware(...middleware));

// Create persistor
const persistor = persistStore(store);

export {store, persistor};
