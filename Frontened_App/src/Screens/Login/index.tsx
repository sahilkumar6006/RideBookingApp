import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, post } from '../../api'; // Adjust the import path as needed
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { setTokens } from '@/src/redux/slices/tokenSlice';
import Apple from "../../assets/images/svg/Apple.svg";
import Facebook from "../../assets/images/svg/Facebook.svg";
import Gmail from "../../assets/images/svg/Gmail.svg";
import { scale } from 'react-native-size-matters';

const LoginScreen = ({navigation}: {navigation: any}) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    type LoginResponse = {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            profileImage?: string;
            address?: string;
            street?: string;
            district?: string;
            city?: string;
            state?: string;
            zipCode?: string;
            phone?: string;
        };
    };

    const handleLogin = async () => {
        try {
            const response = await post<LoginResponse>({
                path: `${BASE_URL}/api/v1/users/login`,
                data: {
                    email: emailOrPhone,
                    password: password,
                },
            });

            // Check if the response is successful
            if (response) {
                await AsyncStorage.setItem('accessToken', response.accessToken);
                await AsyncStorage.setItem('refreshToken', response.refreshToken);

                // Dispatch the setUser action with user data and tokens
                dispatch(setUser({
                    id: response.user.id,
                    email: response.user.email,
                    fullName: response.user.fullName,
                    profileImage: response.user.profileImage || '',
                    address: response.user.address || '',
                    street: response.user.street || '',
                    district: response.user.district || '',
                    city: response.user.city || '',
                    state: response.user.state || '',
                    zipCode: response.user.zipCode || '',
                    phone: response.user.phone || ''
                }));

                // Handle navigation after successful login
                navigation.navigate('BottomNavigation');
            }
        } catch (error: any) {
            console.log(error); // Log the error for debugging
            Alert.alert('Login Failed', error?.response?.data?.message || 'An error occurred');
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
                <Gmail />
                    <Text style={styles.socialButtonText}>Login with Gmail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Facebook />
                    <Text style={styles.socialButtonText}>Login with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Apple />
                    <Text style={styles.socialButtonText}>Login with Apple</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
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
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    socialButtonText: {
        marginStart: scale(10),
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