// Frontened_App/src/Screens/Home/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

interface LocationType {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const navigation = useNavigation(); // Get navigation object
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('transport');

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    };

    requestLocationPermission();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Button to Open Drawer */}
      <View style={styles.drawerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 37.78825,
          longitude: currentLocation?.longitude || -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Your Location"
            description="Your current location"
            pinColor="blue"
          />
        )}
      </MapView>

      <View style={{ position: 'absolute', alignItems: 'flex-end', marginTop: 500 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.rentalButton}>
            <Text style={styles.rentalButtonText}>Rental</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Search Container */}
        <View style={styles.searchContainer}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Where would you go?"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Toggle Buttons */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'transport' && styles.activeToggle]}
              onPress={() => setActiveTab('transport')}
            >
              <Text style={[styles.toggleText, activeTab === 'transport' && styles.activeToggleText]}>
                Transport
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'delivery' && styles.activeToggle]}
              onPress={() => setActiveTab('delivery')}
            >
              <Text style={[styles.toggleText, activeTab === 'delivery' && styles.activeToggleText]}>
                Delivery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerButtonContainer: {
    position: 'absolute',
    top: 40, // Adjust as needed
    left: 16, // Adjust as needed
    zIndex: 1, // Ensure it appears above the map
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  rentalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  rentalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  locationButton: {
    padding: 8,
  },
  searchContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    width: 350,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#4CAF50',
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeToggleText: {
    color: 'white',
  },
  map: {
    flex: 1,
  },
});

export default Home;