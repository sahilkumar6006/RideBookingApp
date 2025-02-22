// src/SettingsScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.settingsList}>
                <Pressable style={styles.settingItem} onPress={() => {
                    navigation.navigate('ChangePasswordScreen');
                }}>
                    <Text>Change Password</Text>
                </Pressable>
                <Pressable style={styles.settingItem}>
                    <Text>Change Language</Text>
                </Pressable>
                <Pressable style={styles.settingItem}>
                    <Text>Privacy Policy</Text>
                </Pressable>
                <Pressable style={styles.settingItem}  onPress={() => {
                    navigation.navigate('ContactUsScreen');
                }}>
                    <Text>Contact Us</Text>
                </Pressable>
                <Pressable style={styles.settingItem} onPress={() => {
                    navigation.navigate('DeleteAccountScreen');
                }}>
                    <Text>Delete Account</Text>
                </Pressable>
            </View>
            {/* <Text style={styles.subHeader}>Change Password</Text>
            <TextInput style={styles.input} placeholder="Old Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
            <Button title="Save" onPress={() => { }} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: scale(20),
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: scale(20),
    },
    settingsList: {
        marginBottom: scale(20),
    },
    settingItem: {
        padding: scale(15),
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: scale(10),
    },
    input: {
        height: verticalScale(40),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
    },
});

export default SettingsScreen;