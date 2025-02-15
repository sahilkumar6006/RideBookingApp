import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Apple from "../../assets/images/svg/Apple.svg";
import Facebook from "../../assets/images/svg/Facebook.svg";
import Gmail from "../../assets/images/svg/Gmail.svg";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CommonHeader from "@/src/components/Header.tsx";
import ScreenWrapper from "@/src/components/ScreenWrapper";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    navigation.navigate("Otp");
    // if (!fullName || !email || !phone || !gender ) {
    //   Alert.alert('Error', 'Please fill in all fields.');
    //   return;
    // }

    // try {
    // const response = await axios.post('http://192.168.46.131:8000/api/v1/users/register', {
    //     fullName,
    //     email,
    //     phone,
    //     gender,
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   console.log('Success:', response.data);
    // } catch (error) {
    //   console.error('Error:', error.response ? error.response.data : error.message);
    // }
  };

  return (
    <ScreenWrapper children={undefined} onBackPress={undefined} containerStyle={undefined} headerRight={undefined}>
      {/* Back Button */}
      {/* Header */}
      <Text style={styles.headerText}>
        Sign up with your email or phone number
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      /> */}

      {/* Terms */}
      <Text style={styles.termsText}>
        By signing up, you agree to the{" "}
        <Text style={styles.linkText}>Terms of Service</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>.
      </Text>

      {/* Sign-Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Social Sign-Up Buttons */}
      <TouchableOpacity style={styles.socialButton}>
        <Gmail />
        <Text style={styles.socialButtonText}>Sign up with Gmail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Facebook />
        <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Apple />
        <Text style={styles.socialButtonText}>Sign up with Apple</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Login")}
        >
          Sign in
        </Text>
      </Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: scale(80),
    paddingHorizontal: scale(20),
  },
  backButton: {
    marginBottom: verticalScale(30),
  },
  backText: {
    fontSize: verticalScale(12),
    color: "#000",
  },
  headerText: {
    fontSize: scale(12),
    fontWeight: "bold",
    color: "#000",
    marginBottom: verticalScale(20),
  },
  input: {
    borderWidth: scale(1),
    borderColor: "#E5E5E5",
    borderRadius: scale(8),
    padding: scale(10),
    fontSize: scale(14),
    marginBottom: verticalScale(15),
    backgroundColor: "#F9F9F9",
  },
  picker: {
    borderWidth: scale(1),
    borderColor: "#E5E5E5",
    borderRadius: scale(8),
    backgroundColor: "#F9F9F9",
    marginBottom: verticalScale(15),
  },
  termsText: {
    fontSize: scale(12),
    color: "#7A7A7A",
    marginBottom: verticalScale(20),
  },
  linkText: {
    color: "#28A745",
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#28A745",
    paddingVertical: verticalScale(8),
    borderRadius: scale(8),
    alignItems: "center",
    marginBottom: verticalScale(15),
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    color: "#7A7A7A",
    marginVertical: verticalScale(10),
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: scale(1),
    borderColor: "#E5E5E5",
    borderRadius: scale(8),
    paddingVertical: verticalScale(5),
    alignItems: "center",
    marginBottom: verticalScale(10),
    backgroundColor: "#F9F9F9",
  },
  socialButtonText: {
    marginLeft: scale(10),
    color: "#000",
  },
  footerText: {
    textAlign: "center",
    color: "#7A7A7A",
    marginTop: verticalScale(20),
  },
});

export default SignUpScreen;
