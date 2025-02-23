// Frontened_App/src/Components/CarCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface VehicleCardProps {
  car: {
    _id: string;
    model: string;
    image: string;
    specifications: {
      maxPower: string;
      fuel: string;
      maxSpeed: string;
      zeroToSixty: string;
    };
    features: {
      model: string;
      capacity: string;
      color: string;
      fuelType: string;
      gearType: string;
    };
    isVerified: boolean;
    licensePlate: string;
  };
}

const VehicleCard= ({ car }: {car: any}) => {
  const navigation = useNavigation();

  const handleRideNow = async (item: any) => {
    console.log(item, "PASSING ID");
    try {
      console.log(item);
      navigation.navigate('DEtailScreenVehicles', { id: item?._id });
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      // Handle error appro
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.modelName}>{car?.model}</Text>
          <View style={styles.specificationRow}>
            <Text style={styles.specText}>
              {car?.features?.gearType || 'Automatic'} | {' '}
              {car?.features?.capacity ? `${car?.features?.capacity} hp` : '3 seats'} | {' '}
              {car?.features?.fuelType || 'Octane'}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color="#666" />
            <Text style={styles.locationText}>800m (5mins away)</Text>
          </View>
        </View>
        
        <Image 
          source={{ uri: car.image }} 
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bookLaterButton}>
          <Text style={styles.bookLaterText}>Book later</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.rideNowButton}
          onPress={() => handleRideNow(car)}
        >
          <Text style={styles.rideNowText}>Ride Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FFFA',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  leftContent: {
    flex: 1,
  },
  modelName: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: scale(4),
  },
  specificationRow: {
    marginBottom: scale(8),
  },
  specText: {
    fontSize: scale(12),
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: scale(12),
    color: '#666',
    marginLeft: scale(4),
  },
  carImage: {
    width: scale(100),
    height: scale(60),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(12),
  },
  bookLaterButton: {
    flex: 1,
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#0B8A4D',
    alignItems: 'center',
  },
  rideNowButton: {
    flex: 1,
    padding: scale(10),
    borderRadius: scale(8),
    backgroundColor: '#0B8A4D',
    alignItems: 'center',
  },
  bookLaterText: {
    color: '#0B8A4D',
    fontSize: scale(14),
    fontWeight: '500',
  },
  rideNowText: {
    color: '#FFF',
    fontSize: scale(14),
    fontWeight: '500',
  },
});

export default VehicleCard;