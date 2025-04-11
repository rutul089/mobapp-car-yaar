import React, {Component} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {configureStore} from './src/redux';
import {NoInternetProvider} from './src/NoInternetProvider';
import NoInternetModal from './src/components/NetworkStatus';

const store = configureStore().store;
const persistor = configureStore().persistor;

export default function App() {
  return (
    // <NoInternetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        {/* <NoInternetModal /> */}
      </PersistGate>
    </Provider>
    // </NoInternetProvider>
  );
}
