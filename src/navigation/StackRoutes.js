// navigation/StackRoutes.js
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as Screens from '../screens';
import ScreenNames from '../constants/ScreenNames';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  detachPreviousScreen: true,
  lazy: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 220},
    },
    close: {
      animation: 'timing',
      config: {duration: 200},
    },
  },
};

const StackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Splash}
      screenOptions={screenOptions}>
      <Stack.Screen
        name={ScreenNames.Splash}
        component={Screens.SplashScreen}
      />
      <Stack.Screen name={ScreenNames.Login} component={Screens.LoginScreen} />
      <Stack.Screen
        name={ScreenNames.OTP}
        component={Screens.OTPVerification}
      />
      <Stack.Screen name={ScreenNames.HomeTab} component={TabNavigator} />
      <Stack.Screen
        name={ScreenNames.Notification}
        component={Screens.NotificationScreen}
      />
      <Stack.Screen
        name={ScreenNames.SearchView}
        component={Screens.SearchScreen}
      />
      <Stack.Screen
        name={ScreenNames.VehicleDetail}
        component={Screens.VehicleDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.VehicleImages}
        component={Screens.VehicleImagesScreen}
      />
      <Stack.Screen
        name={ScreenNames.VehicleOdometer}
        component={Screens.VehicleOdometerScreen}
      />
      <Stack.Screen
        name={ScreenNames.VehiclePricing}
        component={Screens.VehiclePricingScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerDetail}
        component={Screens.CustomerDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerPersonalDetails}
        component={Screens.CustomerPersonalDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.LoanDocument}
        component={Screens.LoanDocumentsScreen}
      />
      <Stack.Screen
        name={ScreenNames.LoanAmount}
        component={Screens.LoanAmountScreen}
      />
      <Stack.Screen
        name={ScreenNames.CheckCIBIL}
        component={Screens.CheckCIBILScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerEnvelope}
        component={Screens.CustomerEnvelopeScreen}
      />
      <Stack.Screen
        name={ScreenNames.LenderSelection}
        component={Screens.LenderSelectionScreen}
      />
      <Stack.Screen
        name={ScreenNames.LoanOfferDetail}
        component={Screens.LoanOfferDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.AddReference}
        component={Screens.AddReferencesScreen}
      />
      <Stack.Screen
        name={ScreenNames.ViewLoanDetail}
        component={Screens.ViewLoanDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.VehicleHypothecation}
        component={Screens.VehicleHypothecationScreen}
      />
      <Stack.Screen
        name={ScreenNames.FinanceDetails}
        component={Screens.FinanceDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.FinanceDocuments}
        component={Screens.FinanceDocumentsScreen}
      />
      <Stack.Screen
        name={ScreenNames.ThankYouView}
        component={Screens.ThankYouScreen}
      />
      <Stack.Screen
        name={ScreenNames.TrackApplication}
        component={Screens.TrackApplicationScreen}
      />
      <Stack.Screen
        name={ScreenNames.CarFinanceDetails}
        component={Screens.CarFinanceDetails}
      />
      <Stack.Screen
        name={ScreenNames.TopUpFinanceDocuments}
        component={Screens.TopUpFinanceDocuments}
      />
      <Stack.Screen
        name={ScreenNames.LenderDetails}
        component={Screens.LenderDetails}
      />
      <Stack.Screen
        name={ScreenNames.CustomizeLoanOffer}
        component={Screens.CustomizeLoanOffer}
      />
      <Stack.Screen
        name={ScreenNames.CustomerInfo}
        component={Screens.CustomerInfoScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerDocuments}
        component={Screens.CustomerDocumentsScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerFinancialDocs}
        component={Screens.CustomerFinancialDocsScreen}
      />
      <Stack.Screen
        name={ScreenNames.MoreOnFinancial}
        component={Screens.MoreOnFinancialScreen}
      />
      <Stack.Screen
        name={ScreenNames.UserProfile}
        component={Screens.ProfileScreen}
      />
      <Stack.Screen
        name={ScreenNames.EditProfile}
        component={Screens.EditProfileScreen}
      />
      <Stack.Screen
        name={ScreenNames.ManageMember}
        component={Screens.ManageMembersScreen}
      />
      <Stack.Screen
        name={ScreenNames.ChangePassword}
        component={Screens.ChangePasswordScreen}
      />
      <Stack.Screen name={ScreenNames.FAQS} component={Screens.FAQScreen} />
      <Stack.Screen
        name={ScreenNames.ContactSupport}
        component={Screens.ContactSupportScreen}
      />
      <Stack.Screen
        name={ScreenNames.NewLoanCustomerOtp}
        component={Screens.NewLoanCustomerOtpScreen}
      />
      <Stack.Screen
        name={ScreenNames.SelectVehicle}
        component={Screens.SelectVehicleScreen}
      />
      <Stack.Screen
        name={ScreenNames.ProformaInvoice}
        component={Screens.ProformaInvoiceScreen}
      />
      <Stack.Screen
        name={ScreenNames.SuccessScreen}
        component={Screens.SuccessModalScreen}
        options={{
          gestureEnabled: false, // disables swipe back on iOS
        }}
      />
      <Stack.Screen
        name={ScreenNames.ImagePreviewScreen}
        component={Screens.ImagePreviewScreen}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
