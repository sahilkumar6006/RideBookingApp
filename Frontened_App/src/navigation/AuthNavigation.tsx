import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "../Screens/OnBoarding";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignUpScreen from "../Screens/signupScreen";
import Otp from "../Screens/Otp";
import BottomNavigator from "./BottomNavigator";
import SetPasswordScreen from "../Screens/setPasswordScreen";
import CompleteProfileScreen from "../Screens/CompleteProfileScreen";

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
        <Stack.Screen name="BottomNavigation" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
