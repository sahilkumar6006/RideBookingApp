import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import BTabNavigation from "./BottomNavigator"; // Your Bottom Tab Navigator
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerStyle: { width: "75%", borderTopRightRadius: 30, borderBottomRightRadius: 30 },
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Home" component={BTabNavigation} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
