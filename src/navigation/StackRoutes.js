import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ScreenNames from '../constants/ScreenNames';
import * as Screens from '../screens';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const StackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Splash}
      screenOptions={screenOptions}>
      {/* Splash & Authentication */}
      <Stack.Screen
        name={ScreenNames.Splash}
        component={Screens.SplashScreen}
      />
      <Stack.Screen name={ScreenNames.Login} component={Screens.LoginScreen} />
      <Stack.Screen
        name={ScreenNames.OTP}
        component={Screens.OTPVerification}
      />
      <Stack.Screen
        name={ScreenNames.NewLoanCustomerOtp}
        component={Screens.NewLoanCustomerOtpScreen}
      />

      {/* Main Tab */}
      <Stack.Screen name={ScreenNames.HomeTab} component={TabNavigator} />

      {/* Notifications */}
      <Stack.Screen
        name={ScreenNames.Notification}
        component={Screens.NotificationScreen}
      />

      {/* Search */}
      <Stack.Screen
        name={ScreenNames.SearchView}
        component={Screens.SearchScreen}
      />

      {/* Vehicle Flow */}
      <Stack.Screen
        name={ScreenNames.SelectVehicle}
        component={Screens.SelectVehicleScreen}
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
        name={ScreenNames.VehicleHypothecation}
        component={Screens.VehicleHypothecationScreen}
      />
      <Stack.Screen
        name={ScreenNames.VehicleFullScreen}
        component={Screens.VehiclesScreen}
      />

      {/* Customer Flow */}
      <Stack.Screen
        name={ScreenNames.CustomerDetail}
        component={Screens.CustomerDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerPersonalDetails}
        component={Screens.CustomerPersonalDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerEnvelope}
        component={Screens.CustomerEnvelopeScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerInfo}
        component={Screens.CustomerInfoScreen}
      />
      <Stack.Screen
        name={ScreenNames.MoreOnFinancial}
        component={Screens.MoreOnFinancialScreen}
      />
      <Stack.Screen
        name={ScreenNames.CustomerFullScreen}
        component={Screens.CustomersScreen}
      />

      {/* Loan Flow */}
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
        name={ScreenNames.TrackApplication}
        component={Screens.TrackApplicationScreen}
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
        name={ScreenNames.ViewLoanDetail}
        component={Screens.ViewLoanDetailsScreen}
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

      {/* References */}
      <Stack.Screen
        name={ScreenNames.AddReference}
        component={Screens.AddReferencesScreen}
      />

      {/* Documents & Invoices */}
      <Stack.Screen
        name={ScreenNames.ProformaInvoice}
        component={Screens.ProformaInvoiceScreen}
      />

      {/* Utilities */}
      <Stack.Screen
        name={ScreenNames.ImagePreviewScreen}
        component={Screens.ImagePreviewScreen}
      />

      {/* Settings & Profile */}
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

      {/* Final Screens */}
      <Stack.Screen
        name={ScreenNames.ThankYouView}
        component={Screens.ThankYouScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={ScreenNames.SuccessScreen}
        component={Screens.SuccessModalScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
