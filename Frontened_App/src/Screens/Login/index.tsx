import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('192.168.31.111:8000/api/v1/users/login', {
                email: emailOrPhone,
                password: password,
            });
            
            // Store tokens in AsyncStorage
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
            await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
            
            // Navigate to the next screen (e.g., Home)
            Alert.alert('Login Successful', `Welcome back!`);
            console.log(response.data); // You can store the user data as needed
        } catch (error) {
            Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign in with your email or phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forget password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Sign up with Gmail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Sign up with Apple</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.footerText}>
                Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    forgotPassword: {
        color: 'red',
        textAlign: 'right',
        marginBottom: 20,
    },
    signInButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
    },
    socialButtonsContainer: {
        marginBottom: 20,
    },
    socialButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    socialButtonText: {
        color: '#333',
    },
    footerText: {
        textAlign: 'center',
    },
    signUpText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default LoginScreen;