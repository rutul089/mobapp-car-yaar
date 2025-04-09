/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {
  AppState,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  ApplicationsScreen,
  CustomersScreen,
  HomeScreen,
  LoginScreen,
  NotificationScreen,
  OTPVerification,
  SearchScreen,
  SplashScreen,
  VehiclesScreen,
  VehicleDetailScreen,
  VehicleImagesScreen,
  VehicleOdometerScreen,
  VehiclePricingScreen,
  CustomerDetailScreen,
  CustomerPersonalDetailsScreen,
  LoanDocumentsScreen,
  LoanAmountScreen,
  CheckCIBILScreen,
  CustomerEnvelopeScreen,
  LenderSelectionScreen,
  LoanOfferDetailScreen,
  AddReferencesScreen,
  ViewLoanDetailsScreen,
  VehicleHypothecationScreen,
  FinanceDetailsScreen,
  FinanceDocumentsScreen,
  ThankYouScreen,
  TrackApplicationScreen,
  CarFinanceDetails,
  TopUpFinanceDocuments,
  LenderDetails,
  CustomizeLoanOffer,
  CustomerInfoScreen,
} from '../screens';
import theme from '../theme';
import {navigationRef} from './NavigationUtils';
import ScreenNames from '../constants/ScreenNames';
import colors from '../theme/colors';
import images from '../assets/images';
import {Text} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionsObject =
  Platform.OS === 'android'
    ? {
        presentation: 'card',
        animationTypeForReplace: 'push',
        animation: 'fade_from_bottom',
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }
    : {
        headerShown: false,
        drawerType: 'front',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      };

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

  HomeTabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName={ScreenNames.Home}
        screenOptions={props => {
          return {
            headerShown: false,
            tabBarShowLabel: true,
            tabBarStyle: {
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
              marginBottom: 0,
              borderTopWidth: 2,
              borderTopColor: 'rgba(0, 0, 0, 0.08)',
              backgroundColor: 'white',
              minHeight: 60,
              maxHeight: 90,
            },
            tabBarItemStyle: {
              padding: 0,
            },
          };
        }}>
        <Tab.Screen
          name={ScreenNames.Home}
          component={HomeScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return this.renderTabLabel(focused, 'Home');
            },
            tabBarIcon: ({focused}) => {
              return this.renderTabIcon(
                focused ? images.homeSolid : images.homeOutline,
              );
            },
          }}
        />
        <Tab.Screen
          name={ScreenNames.Applications}
          component={ApplicationsScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return this.renderTabLabel(focused, 'Applications');
            },
            tabBarIcon: ({focused}) => {
              return this.renderTabIcon(
                focused ? images.applicationSolid : images.applicationOutline,
              );
            },
          }}
        />
        <Tab.Screen
          name={ScreenNames.Vehicles}
          component={VehiclesScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return this.renderTabLabel(focused, 'Vehicles');
            },
            tabBarIcon: ({focused}) => {
              return this.renderTabIcon(
                focused ? images.vehiclesSolid : images.vehiclesOutline,
              );
            },
          }}
        />
        <Tab.Screen
          name={ScreenNames.Customer}
          component={CustomersScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return this.renderTabLabel(focused, 'Customers');
            },
            tabBarIcon: ({focused}) => {
              return this.renderTabIcon(
                focused ? images.customersSolid : images.customersOutline,
              );
            },
          }}
        />
      </Tab.Navigator>
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
          <Stack.Navigator
            key={'Navigator'}
            initialRouteName={ScreenNames.HomeTab}
            screenOptions={screenOptionsObject}>
            <Stack.Screen
              name={ScreenNames.Splash}
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.Login}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.OTP}
              component={OTPVerification}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.HomeTab}
              component={this.HomeTabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.Notification}
              component={NotificationScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.SearchView}
              component={SearchScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.VehicleDetail}
              component={VehicleDetailScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.VehicleImages}
              component={VehicleImagesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.VehicleOdometer}
              component={VehicleOdometerScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.VehiclePricing}
              component={VehiclePricingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CustomerDetail}
              component={CustomerDetailScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CustomerPersonalDetails}
              component={CustomerPersonalDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.LoanDocument}
              component={LoanDocumentsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.LoanAmount}
              component={LoanAmountScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CheckCIBIL}
              component={CheckCIBILScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CustomerEnvelope}
              component={CustomerEnvelopeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.LenderSelection}
              component={LenderSelectionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.LoanOfferDetail}
              component={LoanOfferDetailScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.AddReference}
              component={AddReferencesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.ViewLoanDetail}
              component={ViewLoanDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.VehicleHypothecation}
              component={VehicleHypothecationScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.FinanceDetails}
              component={FinanceDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.FinanceDocuments}
              component={FinanceDocumentsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.ThankYouView}
              component={ThankYouScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.TrackApplication}
              component={TrackApplicationScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CarFinanceDetails}
              component={CarFinanceDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.TopUpFinanceDocuments}
              component={TopUpFinanceDocuments}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.LenderDetails}
              component={LenderDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CustomizeLoanOffer}
              component={CustomizeLoanOffer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={ScreenNames.CustomerInfo}
              component={CustomerInfoScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});
