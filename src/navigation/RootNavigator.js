/* eslint-disable react-native/no-inline-styles */

import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {AppState, Image, StyleSheet, View} from 'react-native';

import {NetworkStatusBanner, Text} from '../components';
import theme from '../theme';
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

  renderTabIcon = image => {
    return (
      <Image
        source={image}
        style={{
          height: 24,
          width: 24,
        }}
      />
    );
  };

  renderTabLabel = (focused, label) => {
    return (
      <Text
        color={focused ? theme.colors.textPrimary : theme.colors.textLabel}
        size={theme.typography.fontSizes.caption}
        hankenGroteskBold={focused}>
        {label}
      </Text>
    );
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
