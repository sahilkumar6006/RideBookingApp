import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import SuccessModal from '@/src/components/SucccesModal';

const ComplainScreen = () => {
  const [selectedComplaint, setSelectedComplaint] = useState('Vehicle not clean');
  const [complaintText, setComplaintText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    // Handle the submit action
    console.log('Complaint submitted:', complaintText);
    setModalVisible(true);
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Complain</Text>
      <Picker
        selectedValue={selectedComplaint}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedComplaint(itemValue)}
      >
        <Picker.Item label="Vehicle not clean" value="Vehicle not clean" />
        <Picker.Item label="Driver behavior" value="Driver behavior" />
        <Picker.Item label="Late arrival" value="Late arrival" />
        {/* Add more complaint options as needed */}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Write your complain here (minimum 10 characters)"
        multiline
        numberOfLines={4}
        onChangeText={setComplaintText}
        value={complaintText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    

    <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  picker: {
    height: moderateScale(50),
    marginBottom: moderateScale(20),
  },
  input: {
    height: moderateScale(100),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

export default ComplainScreen;