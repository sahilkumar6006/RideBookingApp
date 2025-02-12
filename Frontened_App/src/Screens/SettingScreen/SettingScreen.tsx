// src/SettingsScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <View style={styles.settingsList}>
                <TouchableOpacity style={styles.settingItem}>
                    <Text>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                    <Text>Change Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                    <Text>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                    <Text>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                    <Text>Delete Account</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subHeader}>Change Password</Text>
            <TextInput style={styles.input} placeholder="Old Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
            <Button title="Save" onPress={() => { }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    settingsList: {
        marginBottom: 20,
    },
    settingItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default SettingsScreen;