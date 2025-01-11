import React from 'react';
import { StyleSheet,Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Wallet from '../Screens/Wallet';
import Offer from '../Screens/Offer';
import HomeIcon from '../assets/images/svg/Home.svg';
import Vector from '../assets/images/svg/Vector.svg';
import WalletIcon from '../assets/images/svg/wallet.svg';
const Tab = createBottomTabNavigator();

export default function BTabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
        },
        tabBarLabelStyle: { display: 'none' }, 
    
      }}>

        <Tab.Screen name="Home" component={Home}  options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) =>
            focused ? <HomeIcon />: <HomeIcon /> 

        }} />
        <Tab.Screen name="Profie" component={Profile} 
        options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>    
              focused ? <Vector />: <Vector />

        }}
        />
        <Tab.Screen name="Wallet" component={Wallet}   options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
                <View style={{flexDirection: 'row', alignItems: 'center', position: 'relative', height: 30, width: 30, backgroundColor: 'red'}}>
                    {focused ? <WalletIcon />: <WalletIcon />}
                </View>    
         

        }} />
        <Tab.Screen name="Offer" component={Offer}  options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>    
              focused ? <Vector />: <Vector />

        }} />
        
        
      {/* <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <HomeIcon />: <LightHome /> 

        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <AppointmentIcon />: <LightAppointment /> 

        }}
      />
      <Tab.Screen
        name="CareTeam"
        component={CareTeamStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <CareTeamIcon />: <LightCareTeam /> 

        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <MyProfileIcon />: <LightMyProfile /> 

        }}

      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    // backgroundColor: Colors.white,
    // paddingVertical: responsiveHeight(3),
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // height: responsiveHeight(10),
    // borderTopColor:Colors.Dark_Orange,
    // borderTopWidth:2,
    // shadowColor:Colors.black,
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 3,
    // shadowRadius: 2,
    // elevation: 5,
  },
});
