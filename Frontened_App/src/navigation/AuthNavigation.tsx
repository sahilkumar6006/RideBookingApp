import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "../Screens/OnBoarding";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignUpScreen from "../Screens/signupScreen";
import Otp from "../Screens/Otp";
import SetPasswordScreen from "../Screens/setPasswordScreen";
import CompleteProfileScreen from "../Screens/CompleteProfileScreen";
import DrawerNavigator from "./DrawerNavigator";
import SettingsScreen from "../Screens/SettingScreen/SettingScreen";
import SelectTransportScreen from "../Screens/SelectTransportScreen";
import AvailableCarsScreen from "../Screens/AvailableTransport";
import LoginScreen from "../Screens/Login";
import ContactUsScreen from "../Screens/ContactUsScreen";
import DeleteAccountScreen from "../Screens/DeleteAccountScreen";
import ChangePasswordScreen from "../Screens/SettingScreen/ChangePassword/ChangePasswordScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import AddMoney from "../Screens/AddMoney";
import LocationScreen from "../Screens/LocationSelection";
import AddAmountScreen from "../Screens/AddMoney";
import ComplainScreen from "../Screens/ComplainScreen";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="setPassword" component={SetPasswordScreen} />
        <Stack.Screen
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
        />
        <Stack.Screen name="BottomNavigation" component={DrawerNavigator} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="SelectTransportScreen" component={SelectTransportScreen} />
        <Stack.Screen name="AvailableCarsScreen" component={AvailableCarsScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="AddMoney" component={AddMoney} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="AddAmountScreen" component={AddAmountScreen} />
        <Stack.Screen name="ComplainScreen" component={ComplainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
