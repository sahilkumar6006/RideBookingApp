import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors } from '@/src/constants/colors';
import LocationScreen from '../LocationSelection';
import LocationSelectionModal from '../LocationSelection';

interface LocationType {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('transport');
  const [modalVisible, setModalVisible] = useState(false);

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

      {/* Top Icons */}
      <View style={styles.topIconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={Colors.green[200]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("NotificationScreen")}>
          <Ionicons name="notifications-outline" size={24} color={Colors.green[200]} />
        </TouchableOpacity>
      </View>

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Rental Button */}
        <TouchableOpacity style={styles.rentalButton}  onPress={() => navigation.navigate("SelectTransport")}>
          <Text style={styles.rentalButtonText}>Rental</Text>
        </TouchableOpacity>

        {/* Location Button */}
        <TouchableOpacity style={styles.locationButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="location" size={moderateScale(24)} color={Colors.green[200]} />
        </TouchableOpacity>

        {/* Search Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={moderateScale(20)} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Where would you go?"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={moderateScale(20)} color="#666" />
            </TouchableOpacity>
          </View>

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

      {/* Bottom Tab Bar
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={moderateScale(24)} color={Colors.green[200]} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart-outline" size={moderateScale(24)} color="#666" />
          <Text style={styles.tabText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.walletButton}>
            <Ionicons name="wallet-outline" size={moderateScale(24)} color="#fff" />
          </View>
          // <Text style={styles.tabText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="gift-outline" size={moderateScale(24)} color="#666" />
          <Text style={styles.tabText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={moderateScale(24)} color="#666" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View> */}

<LocationSelectionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  topIconsContainer: {
    position: 'absolute',
    top: verticalScale(40),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  iconButton: {
    padding: scale(8),
    backgroundColor: '#fff',
    borderRadius: scale(8),
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: verticalScale(20),
    padding: scale(16),
  },
  rentalButton: {
    backgroundColor: Colors.green[200],
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    alignSelf: 'flex-start',
    marginBottom: verticalScale(16),
  },
  rentalButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  locationButton: {
    position: 'absolute',
    right: scale(16),
    backgroundColor: '#fff',
    padding: scale(8),
    borderRadius: scale(8),
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: scale(16),
    padding: scale(16),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    marginLeft: scale(8),
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: scale(8),
    padding: scale(4),
  },
  toggleButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: scale(6),
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: Colors.green[200],
  },
  toggleText: {
    fontSize: moderateScale(16),
    color: '#666',
    fontWeight: '500',
  },
  activeToggleText: {
    color: 'white',
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(8),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: moderateScale(12),
    color: '#666',
    marginTop: verticalScale(4),
  },
  walletButton: {
    backgroundColor: Colors.green[200],
    padding: scale(12),
    borderRadius: scale(8),
  },
});

export default Home;