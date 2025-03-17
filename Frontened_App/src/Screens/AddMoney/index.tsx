// AddAmountScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const AddAmountScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Amount</Text>
      <TextInput
        style={styles.amountInput}
        placeholder="Enter Amount"
        keyboardType="numeric"
      />
      <Text>check</Text>
      <TouchableOpacity style={styles.addPaymentMethodButton}>
        <Text style={styles.addPaymentMethodText}>Add payment Method</Text>
      </TouchableOpacity>
      <Text style={styles.selectPaymentMethodText}>Select Payment Method</Text>
      <ScrollView>
        {paymentMethods.map((method, index) => (
          <View key={index} style={styles.paymentMethodCard}>
            <Text style={styles.paymentMethodText}>{method.name}</Text>
            <Text style={styles.paymentMethodDetails}>{method.details}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const paymentMethods = [
  { name: 'VISA', details: '**** **** **** 8970\nExpires: 12/26' },
  { name: 'MasterCard', details: '**** **** **** 8970\nExpires: 12/26' },
  { name: 'PayPal', details: 'mailaddress@mail.com\nExpires: 12/26' },
  { name: 'Cash', details: 'Expires: 12/26' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: scale(20),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backText: {
    fontSize: scale(16),
    color: '#007BFF',
  },
  headerText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  amountInput: {
    height: verticalScale(50),
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(20),
  },
  addPaymentMethodButton: {
    marginBottom: verticalScale(20),
  },
  addPaymentMethodText: {
    fontSize: scale(16),
    color: '#007BFF',
  },
  selectPaymentMethodText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
  },
  paymentMethodCard: {
    backgroundColor: '#E6F7E6',
    padding: scale(15),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
  },
  paymentMethodText: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  paymentMethodDetails: {
    fontSize: scale(12),
    color: '#7A7A7A',
  },
  confirmButton: {
    backgroundColor: '#28A745',
    padding: scale(15),
    borderRadius: scale(8),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
  },
});

export default AddAmountScreen;