import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Feather";

const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                {/* Profile Section */}
                <View style={{ padding: 20, alignItems: "center" }}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/80" }} // Replace with actual image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                        Nate Samson
                    </Text>
                    <Text style={{ color: "gray" }}>nate@email.com</Text>
                </View>

                {/* Drawer Options */}
                <View style={{ paddingLeft: 20 }}>
                    {[
                        { label: "History", icon: "file-text" },
                        { label: "Complain", icon: "alert-circle" },
                        { label: "Referral", icon: "users" },
                        { label: "About Us", icon: "info" },
                        { label: "Settings", icon: "settings" },
                        { label: "Help and Support", icon: "help-circle" },
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
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
