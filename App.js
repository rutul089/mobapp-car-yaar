import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import {persistor, store} from './src/redux';
import {View} from 'react-native';
import {Toast, toastConfig} from '@caryaar/components';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
      <View pointerEvents="none" style={{marginHorizontal: 20}}>
        <Toast
          pointerEvents="none"
          config={toastConfig}
          // ref={ref => Toast.setRef(ref)}
        />
      </View>
    </>
  );
}
