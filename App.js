import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import {configureStore} from './src/redux';

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
