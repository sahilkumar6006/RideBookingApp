import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import CarCard from '@/src/components/CarCard';

type VehicleScreenProps = {
  route: {
    params: {
      vehicles: any[];
      vehicleType: 'Car' | 'Bike' | 'Cycle' | 'Taxi';
    }
  }
};

const AvailableVehiclesScreen: React.FC<VehicleScreenProps> = ({ route }) => {
  const { vehicles = [], vehicleType = 'Car' } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Available {vehicleType}s for ride</Text>
      <Text style={styles.vehiclesFoundText}>{vehicles.length} {vehicleType.toLowerCase()}s found</Text>
      <ScrollView>
        {vehicles.map((vehicle, index) => (
          <CarCard 
            key={index} 
            car={vehicle}
            vehicleType={vehicleType}
          />
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
  vehiclesFoundText: {
    fontSize: scale(16),
    marginBottom: scale(20),
  },
});

export default AvailableVehiclesScreen;