// LocationSelectionModal.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Location from '../../assets/images/svg/Location.svg'
import LocationIcon from '../../assets/images/svg/LocationIcon.svg'
import Crossfrom from '../../assets/images/svg/Cross.svg'

const LocationSelectionModal = ({ visible, onClose }: {visible: boolean, onClose: () => void}) => {
  const recentPlaces = [
    { id: 1, name: 'Office', address: '2972 Westheimer Rd. Santa Ana, Illinois 85468', distance: '2.7km' },
    { id: 2, name: 'Coffee shop', address: '1901 Thorndike Cir. Shiloh, Hawaii 91063', distance: '1.1km' },
    { id: 3, name: 'Shopping center', address: '4140 Parker Rd. Allentown, New Mexico 31314', distance: '4.8km' },
    { id: 4, name: 'Shopping mall', address: '4140 Parker Rd. Allentown, New Mexico 31314', distance: '4.0km' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-between'}}>
          <Text style={styles.modalHeader}>Select Address</Text>
          <Pressable onPress={onClose}>
          <Crossfrom/>
          </Pressable>
       
          </View>
         
          <View style={styles.addressForm}>
         
            <Text style={styles.formLabel}>From</Text>
            <TouchableOpacity style={styles.formInput}>
            <Location/>
              <Text style={styles.formInputText}>Your Current Location</Text>
            </TouchableOpacity>
            <Text style={styles.formLabel}>To</Text>
            <TouchableOpacity style={styles.formInput}>
            <LocationIcon/>
              <Text style={styles.formInputText}>Destination</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.recentPlacesHeader}>Recent Places</Text>
          <ScrollView>
            {recentPlaces.map(place => (
              <View key={place.id} style={styles.placeCard}>
                <LocationIcon/>
                <View>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
                <Text style={styles.placeDistance}>{place.distance}</Text>
                </View>
                
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: verticalScale(200),

  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: scale(20),
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  modalHeader: {
    fontSize: scale(14),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  addressForm: {
    marginBottom: verticalScale(20),
  },
  formLabel: {
    fontSize: scale(16),
    marginBottom: verticalScale(5),
  },
  formInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: scale(10),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
  },
  formInputText: {
    fontSize: scale(14),
    marginStart: scale(2),
  },
  recentPlacesHeader: {
    fontSize: scale(12),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  placeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  placeName: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: scale(14),
    color: '#7A7A7A',
  },
  placeDistance: {
    fontSize: scale(12),
    color: '#7A7A7A',
  },
  closeButton: {
    backgroundColor: '#28A745',
    padding: scale(15),
    borderRadius: scale(8),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
  },
});

export default LocationSelectionModal;