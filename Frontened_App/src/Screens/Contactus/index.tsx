import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CountryPicker from 'react-native-country-picker-modal';

const ContactUs = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('BD');
  const [callingCode, setCallingCode] = useState('880');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Contact Us</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.linkText}>Contact us for Ride share</Text>

            {/* Address Section */}
            <View style={styles.addressSection}>
              <Text style={styles.sectionTitle}>Address</Text>
              <Text style={styles.addressText}>
                House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon School &{'\n'}
                College, beside University of South Asia)
              </Text>
              <Text style={styles.contactText}>
                Call : 1200 (24/7)
              </Text>
              <Text style={styles.emailText}>
                Email: support@pathao.com
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Send Message</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#999"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />

              {/* Phone Input with Country Picker */}
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity 
                  style={styles.countryPickerButton}
                  onPress={() => setCountryPickerVisible(true)}
                >
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCallingCode
                    withCountryNameButton={false}
                    visible={countryPickerVisible}
                    onSelect={(country) => {
                      setCountryCode(country.cca2);
                      setCallingCode(country.callingCode[0]);
                      setCountryPickerVisible(false);
                    }}
                    onClose={() => setCountryPickerVisible(false)}
                  />
                  <Text style={styles.callingCodeText}>+{callingCode}</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Your mobile number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Write your text"
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    paddingVertical: verticalScale(4),
    paddingRight: scale(16),
  },
  backText: {
    fontSize: moderateScale(16),
    color: '#000000',
  },
  title: {
    fontSize: moderateScale(16),
    color: '#000000',
    marginLeft: scale(8),
  },
  content: {
    padding: scale(16),
  },
  linkText: {
    fontSize: moderateScale(16),
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  addressSection: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    color: '#000000',
    marginBottom: verticalScale(8),
  },
  addressText: {
    fontSize: moderateScale(14),
    color: '#666666',
    lineHeight: moderateScale(20),
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  contactText: {
    fontSize: moderateScale(14),
    color: '#666666',
    textAlign: 'center',
  },
  emailText: {
    fontSize: moderateScale(14),
    color: '#666666',
    textAlign: 'center',
  },
  formSection: {
    marginTop: verticalScale(16),
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: verticalScale(16),
    fontSize: moderateScale(14),
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  countryPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: scale(8),
    padding: scale(12),
    marginRight: scale(8),
  },
  callingCodeText: {
    marginLeft: scale(4),
    fontSize: moderateScale(14),
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: scale(8),
    padding: scale(12),
    fontSize: moderateScale(14),
  },
  messageInput: {
    height: verticalScale(100),
  },
  sendButton: {
    backgroundColor: '#008D5E',
    borderRadius: scale(8),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});

export default ContactUs;