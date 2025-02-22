// Frontened_App/src/Screens/AvailableCars/index.tsx
import CarCard from '@/src/components/CarCard';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
const AvailableCarsScreen = () => {
  const cars = [
    { name: 'BMW Cabrio', details: 'Automatic | 3 seats | Octane', image: 'url_to_image' },
    { name: 'Mustang Shelby GT', details: 'Automatic | 3 seats | Octane', image: 'url_to_image' },
    { name: 'BMW 18', details: 'Automatic | 3 seats | Octane', image: 'url_to_image' },
    { name: 'Jaguar Silber', details: 'Automatic | 3 seats | Octane', image: 'url_to_image' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Available cars for ride</Text>
      <Text style={styles.carsFoundText}>{cars.length} cars found</Text>
      <ScrollView>
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    backgroundColor: '#F8F8F8',
  },
  headerText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  carsFoundText: {
    fontSize: scale(16),
    marginBottom: scale(20),
  },
});

export default AvailableCarsScreen;