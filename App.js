import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Toast, toastConfig} from '@caryaar/components';
import RootNavigator from './src/navigation/RootNavigator';
import {persistor, store} from './src/redux';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
          <View pointerEvents="box-none" style={{marginHorizontal: 20}}>
            <Toast config={toastConfig} />
          </View>
      </PersistGate>
    </Provider>
  );
}
