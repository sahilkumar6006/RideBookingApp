import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';

const LocationScreen = () => {
  const recentPlaces = [
    { id: '1', name: 'Office', address: '2972 Westheimer Rd. Santa Ana, Illinois 85496', distance: '2.7km' },
    { id: '2', name: 'Coffee shop', address: '1901 Thornridge Cir. Shiloh, Hawaii 81083', distance: '1.1km' },
    { id: '3', name: 'Shopping center', address: '4140 Parker Rd. Allentown, New Mexico 31134', distance: '4.9km' },
    { id: '4', name: 'Shopping mall', address: '4140 Parker Rd. Allentown, New Mexico 31134', distance: '4.0km' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={styles.placeAddress}>{item.address}</Text>
      <Text style={styles.placeDistance}>{item.distance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select address</Text>
      <FlatList
        data={recentPlaces}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: scale(20), // Use scale for horizontal padding
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(24), // Use scale for font size
    fontWeight: 'bold',
    marginBottom: verticalScale(20), // Use verticalScale for vertical margin
  },
  list: {
    paddingBottom: verticalScale(20), // Use verticalScale for vertical padding
  },
  placeItem: {
    padding: scale(15), // Use scale for horizontal padding
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeName: {
    fontSize: scale(18), // Use scale for font size
    fontWeight: '600',
  },
  placeAddress: {
    fontSize: scale(14), // Use scale for font size
    color: '#666',
  },
  placeDistance: {
    fontSize: scale(14), // Use scale for font size
    color: '#999',
  },
});

export default LocationScreen;