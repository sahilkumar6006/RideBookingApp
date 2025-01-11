import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import OTPInput from '../../components/OTPInput';
import BackIcon from '../../assets/images/svg/BackIcon.svg';

const VerifyOtpScreen = () => {
    const navigation = useNavigation();
  const [otpCode, setOtpCode] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(20);
  

  const handleInputChange = (text) => {
    setOtpCode(text);
  };

  const handleVerify = () => {
    // TODO: Implement verification logic here
    console.log('OTP code:', otpCode);
    navigation.navigate('BottomNavigation');
  };
  const handleOTPChange = (newOtp) => {
    setOtp(newOtp);
    setIsOtpValid(true);
};



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style= {{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <BackIcon />
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>

      </View> 

      <Text>Phone verification</Text>
      <Text>Enter your OTP code</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <OTPInput length={6} otp={otp} setOtp={handleOTPChange} isOtpValid={isOtpValid} />
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20,
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VerifyOtpScreen;