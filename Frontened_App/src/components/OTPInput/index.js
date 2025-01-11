import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length = 6, otp, setOtp, isOtpValid }) => {
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    if (value === '') {
      newOtp[index] = '';
    } else if (!isNaN(value)) {
      newOtp[index] = value;
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
    setOtp(newOtp);
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    } else if (event.nativeEvent.key === 'Backspace') {
      handleChange('', index);
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={digit}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          style={[
            styles.input,
            digit ? styles.inputFilled : null, 
            !isOtpValid && styles.inputInvalid,
          ]}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
 alignItems:'center',
    marginTop: 3,
    alignSelf:'center'
  },
  input: {
    width: 11,
    height: 6,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: Colors.lightgrey,
    marginRight: 10,
    // fontSize: responsiveFontSize(2),
    // color: Colors.black,
  },
  inputFilled: {
    // borderColor: Colors.black,
  },
  inputInvalid: {
    // borderColor: Colors.red,
  },
});

export default OTPInput;
