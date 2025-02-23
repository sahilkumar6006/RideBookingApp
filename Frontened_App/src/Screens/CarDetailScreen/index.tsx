import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const VehicleDetailsScreen = ({ route }: {route: any}) => {
  const navigation = useNavigation();
  const { vehicle } = route.params;
  const rating = 4.8;
  const reviews = 531;

  const SpecificationItem = ({ icon, value, label }) => (
    <View style={styles.specItem}>
      <Icon name={icon} size={scale(24)} color="#0B8A4D" />
      <Text style={styles.specValue}>{value}</Text>
      <Text style={styles.specLabel}>{label}</Text>
    </View>
  );

  const FeatureRow = ({ label, value }) => (
    <View style={styles.featureRow}>
      <Text style={styles.featureLabel}>{label}</Text>
      <Text style={styles.featureValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={scale(24)} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Title and Rating */}
      <Text style={styles.title}>{vehicle.model}</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={scale(16)} color="#FFD700" />
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.reviews}>({reviews} reviews)</Text>
      </View>

      {/* Vehicle Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} resizeMode="contain" />
      </View>

      {/* Specifications */}
      <Text style={styles.sectionTitle}>Specifications</Text>
      <View style={styles.specificationsContainer}>
        <SpecificationItem 
          icon="speed" 
          value={vehicle.specifications.maxPower || "250hp"} 
          label="Max. power" 
        />
        <SpecificationItem 
          icon="local-gas-station" 
          value={vehicle.specifications.fuel || "10km per ltre"} 
          label="Fuel" 
        />
        <SpecificationItem 
          icon="trending-up" 
          value={vehicle.specifications.maxSpeed || "220km/h"} 
          label="Max speed" 
        />
        <SpecificationItem 
          icon="timer" 
          value={vehicle.specifications.zeroToSixty || "2.5sec"} 
          label="0-60mph" 
        />
      </View>

      {/* Car Features */}
      <Text style={styles.sectionTitle}>Car features</Text>
      <View style={styles.featuresContainer}>
        {/* <FeatureRow label="Model" value={vehicle.features.model} /> */}
        <FeatureRow label="Capacity" value={vehicle.features.capacity} />
        <FeatureRow label="Color" value={vehicle.features.color} />
        <FeatureRow label="Fuel type" value={vehicle.features.fuelType} />
        <FeatureRow label="Gear type" value={vehicle.features.gearType} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bookLaterButton}>
          <Text style={styles.bookLaterText}>Book later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rideNowButton} onPress={() => navigation.navigate('Su')}>
          <Text style={styles.rideNowText}>Ride Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(20),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  backText: {
    fontSize: scale(16),
    marginLeft: scale(8),
  },
  title: {
    fontSize: scale(24),
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  rating: {
    fontSize: scale(14),
    marginLeft: scale(4),
    color: '#333',
  },
  reviews: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: scale(4),
  },
  imageContainer: {
    height: verticalScale(200),
    marginVertical: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(16),
    color: '#333',
  },
  specificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  specItem: {
    alignItems: 'center',
    backgroundColor: '#F8FFFA',
    padding: scale(12),
    borderRadius: scale(8),
    width: scale(75),
  },
  specValue: {
    fontSize: scale(12),
    fontWeight: '500',
    marginTop: verticalScale(4),
    color: '#333',
  },
  specLabel: {
    fontSize: scale(10),
    color: '#666',
    marginTop: verticalScale(2),
  },
  featuresContainer: {
    backgroundColor: '#F8FFFA',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(24),
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  featureLabel: {
    fontSize: scale(14),
    color: '#666',
  },
  featureValue: {
    fontSize: scale(14),
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  bookLaterButton: {
    flex: 1,
    padding: verticalScale(12),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#0B8A4D',
    alignItems: 'center',
    backgroundColor: '#F8FFFA',
    marginRight: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rideNowButton: {
    flex: 1,
    padding: verticalScale(12),
    borderRadius: scale(8),
    backgroundColor: '#0B8A4D',
    alignItems: 'center',
    marginLeft: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookLaterText: {
    color: '#0B8A4D',
    fontSize: scale(16),
    fontWeight: '500',
  },
  rideNowText: {
    color: '#FFF',
    fontSize: scale(16),
    fontWeight: '500',
  },
});

export default VehicleDetailsScreen;