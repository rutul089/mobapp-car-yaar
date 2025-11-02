/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DevSettings, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Toast, toastConfig} from '@caryaar/components';
import RootNavigator from './src/navigation/RootNavigator';
import {persistor, store} from './src/redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {en, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en', en);

if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
          <View pointerEvents="none" style={{marginHorizontal: 20}}>
            <Toast config={toastConfig} />
          </View>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}
