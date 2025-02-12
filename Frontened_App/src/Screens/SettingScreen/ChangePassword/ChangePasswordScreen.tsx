// src/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ChangePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Change Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Old Password"
                    secureTextEntry={!showOldPassword}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                    <Text style={styles.toggleText}>{showOldPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry={!showNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                    <Text style={styles.toggleText}>{showNewPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Text style={styles.toggleText}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            <Button title="Save" onPress={() => { }} color="#4CAF50" />
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    toggleText: {
        marginLeft: 10,
        color: '#007BFF',
    },
});

export default ChangePasswordScreen;