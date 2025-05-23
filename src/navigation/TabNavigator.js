/* eslint-disable react-native/no-inline-styles */
import {Text, images, theme} from '@caryaar/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import ScreenNames from '../constants/ScreenNames';
import {
  ApplicationsScreen,
  CustomersScreen,
  HomeScreen,
  VehiclesScreen,
} from '../screens';
import {useDispatch} from 'react-redux';
import {setIsCreatingLoanApplication} from '../redux/actions';

const Tab = createBottomTabNavigator();

const renderTabIcon = image => (
  <Image source={image} style={{height: 24, width: 24}} />
);

const renderTabLabel = (focused, label) => (
  <Text
    color={focused ? theme.colors.textPrimary : theme.colors.textLabel}
    size={theme.typography.fontSizes.caption}
    hankenGroteskBold={focused}>
    {label}
  </Text>
);

const TabNavigator = () => {
  const dispatch = useDispatch();

  // Reset isCreatingLoanApplication when tab changes
  const handleTabPress = () => {
    dispatch(setIsCreatingLoanApplication(false));
  };
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Home}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          borderTopWidth: 2,
          borderTopColor: 'rgba(0, 0, 0, 0.08)',
          backgroundColor: 'white',
          minHeight: 60,
          maxHeight: 90,
        },
        tabBarItemStyle: {
          padding: 0,
        },
      }}>
      <Tab.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Home'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(focused ? images.homeSolid : images.homeOutline),
        }}
        listeners={{tabPress: handleTabPress}}
      />
      <Tab.Screen
        name={ScreenNames.Applications}
        component={ApplicationsScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Applications'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(
              focused ? images.applicationSolid : images.applicationOutline,
            ),
        }}
        listeners={{tabPress: handleTabPress}}
      />
      <Tab.Screen
        name={ScreenNames.Vehicles}
        component={VehiclesScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Vehicles'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(
              focused ? images.vehiclesSolid : images.vehiclesOutline,
            ),
        }}
        listeners={{tabPress: handleTabPress}}
      />
      <Tab.Screen
        name={ScreenNames.Customer}
        component={CustomersScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Customers'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(
              focused ? images.customersSolid : images.customersOutline,
            ),
        }}
        listeners={{tabPress: handleTabPress}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
