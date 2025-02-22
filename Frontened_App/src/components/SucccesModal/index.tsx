import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Tick from '../../assets/images/svg/Tick.svg';
import { useNavigation } from '@react-navigation/native';

const SuccessModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const navigation = useNavigation();
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.checkmarkContainer}>
            <Tick/>
          </View>
          <Text style={styles.title}>Send successful</Text>
          <Text style={styles.message}>Your complain has been sent successfully</Text>
          <Pressable style={styles.button} onPress={() => {
            onClose
            navigation.navigate('BottomNavigation')
          }
            }>
            <Text style={styles.buttonText}>Back Home</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: moderateScale(20),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    elevation: 5,
  },
  checkmarkContainer: {
    marginBottom: moderateScale(20),
  },
  checkmark: {
    fontSize: moderateScale(50),
    color: '#4CAF50',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  message: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

export default SuccessModal;