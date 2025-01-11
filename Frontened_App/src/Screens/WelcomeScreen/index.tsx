import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../../assets/images/Welcome.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Have a better sharing experience</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.createAccountButtonText}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
    marginBottom: 40,
    textAlign: 'center',
  },
  createAccountButton: {
    backgroundColor: '#28A745', // Green color
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 15,
  },
  createAccountButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderColor: '#28A745', // Green border
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#28A745',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
