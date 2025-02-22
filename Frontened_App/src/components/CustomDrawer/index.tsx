import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Profie from "../../assets/images/svg/Profile.svg";



const CustomDrawer = (props) => {
    const user = useSelector((state: RootState) => state.user);
    console.log(user);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                {/* Profile Section */}
                <View style={{ padding: 20, alignItems: "center" }}>
                {
                    user?.profileImage ? (
                        <Image source={{ uri: user?.profileImage }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                    ) : (
                        <Profie style={{ width: 80, height: 80, borderRadius: 40 }} />
                    )
                }
                    
                    {/* <Image
                        source={{ uri: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250" }} // Replace with actual image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    /> */}
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                        {user?.fullName}
                    </Text>
                    <Text style={{ color: "gray" }}>{user?.email}</Text>
                </View>

                {/* Drawer Options */}
                <View style={{ paddingLeft: 20 }}>
                    {[
                        { label: "History", icon: "file-text" },
                        { label: "Complain", icon: "alert-circle", onPress: () => props.navigation.navigate('ComplainScreen') },
                        { label: "Referral", icon: "users" },
                        { label: "About Us", icon: "info" },
                        { label: "SettingsScreen", icon: "settings" , navigation: props.navigation} ,
                        { label: "Help and Support", icon: "help-circle" },
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}
                            onPress={() => item.onPress ? item.onPress() : props.navigation.navigate(item.label)}
                        >
                            <Icon name={item.icon} size={20} color="black" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 16 }}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </DrawerContentScrollView>

            {/* Logout */}
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 20, borderTopWidth: 1, borderColor: "#ddd" }}>
                <Icon name="log-out" size={20} color="black" style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomDrawer;
