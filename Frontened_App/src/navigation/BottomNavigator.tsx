import React from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Wallet from '../Screens/Wallet';
import Offer from '../Screens/Offer';
  import HomeIcon from '../assets/images/svg/Home.svg';
import Heart from '../assets/images/svg/Heart.svg';
import Vector from '../assets/images/svg/Vector.svg';
import WalletIcon from '../assets/images/svg/wallet.svg';
import Discount from '../assets/images/svg/Discount.svg';
import Favourite from '../Screens/Favourite/index'
import ProfileScreen from '../Screens/ProfileBotto';
const Tab = createBottomTabNavigator();

export default function BTabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 70,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,
        },
        tabBarActiveTintColor: '#28A745',
        tabBarInactiveTintColor: '#7A7A7A',
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HomeIcon fill={focused ? '#28A745' : '#7A7A7A'} />
          ),
        }}
      />

      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Heart fill={focused ? '#28A745' : '#7A7A7A'} />
          ),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.walletContainer}>
              <WalletIcon fill="#FFFFFF" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Offer"
        component={Offer}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Discount fill={focused ? '#28A745' : '#7A7A7A'} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Vector fill={focused ? '#28A745' : '#7A7A7A'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  walletContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#28A745',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20, // This will make the wallet icon sit slightly above the tab bar
  },
});
