// Frontened_App/src/Components/CarCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const CarCard = ({ car }: { car: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.carName}>{car.name}</Text>
      <Image source={{ uri: car.image }} style={styles.carImage} />
      <Text style={styles.carDetails}>{car.details}</Text>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View car list</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: scale(15),
    borderRadius: scale(8),
    marginBottom: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  carName: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  carImage: {
    width: '100%',
    height: scale(100),
    borderRadius: scale(8),
    marginVertical: scale(10),
  },
  carDetails: {
    fontSize: scale(14),
    color: '#7A7A7A',
  },
  viewButton: {
    backgroundColor: '#E6F7E6',
    padding: scale(10),
    borderRadius: scale(5),
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#007BFF',
  },
});

export default CarCard;