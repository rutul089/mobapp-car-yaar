import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {AppState, StyleSheet, View} from 'react-native';

import {NetworkStatusBanner} from '../components';
import {navigationRef} from './NavigationUtils';
import StackRoutes from './StackRoutes';

export default class RootNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      isNetConnected: true,
      currentScreenName: null,
    };
    this.currentScreen = null;
    this.routeNameRef = React.createRef();
    this.appStateRef = null;
  }

  onNavigationStateChange = e => {
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    this.currentScreen = currentRouteName ? {...currentRouteName} : null;
    console.log(`@@@current_screen:${currentRouteName}`);
    this.routeNameRef.current = currentRouteName;
    this.setState({
      currentScreenName: currentRouteName,
    });
  };

  render() {
    const {currentScreenName} = this.state;
    return (
      <View style={styles.wrapper}>
        <NavigationContainer
          key={'NavigationContainer'}
          ref={navigationRef}
          onReady={() => {
            this.routeNameRef.current =
              navigationRef.current.getCurrentRoute().name;
            this.setState({
              currentScreenName: navigationRef.current?.getCurrentRoute()?.name,
            });
          }}
          onStateChange={this.onNavigationStateChange}>
          <StackRoutes />
        </NavigationContainer>
        <NetworkStatusBanner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
