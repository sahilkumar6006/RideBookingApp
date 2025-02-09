import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming using Expo

const OfferCard = ({ discount, description }) => (
  <View style={styles.offerCard}>
    <View>
      <Text style={styles.discountText}>{discount} off</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
    <TouchableOpacity style={styles.collectButton}>
      <Text style={styles.collectButtonText}>Collect</Text>
    </TouchableOpacity>
  </View>
);

const Offer = () => {
  const offers = [
    { discount: '15%', description: 'Black Friday' },
    { discount: '5%', description: 'Crismus' },
    { discount: '15%', description: 'Happy New Year' },
    { discount: '15%', description: 'Black Friday' },
    { discount: '5%', description: 'Crismus' },
    { discount: '15%', description: 'Happy New Year' },
    { discount: '15%', description: 'Black Friday' },
    { discount: '5%', description: 'Crismus' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#40B37C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offer</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            discount={offer.discount}
            description={offer.description}
          />
        ))}
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  offerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 12,
  },
  discountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8A65',
  },
  descriptionText: {
    color: '#999',
    marginTop: 4,
  },
  collectButton: {
    backgroundColor: '#40B37C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  collectButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeNav: {
    opacity: 1,
  },
  activeText: {
    color: '#40B37C',
  },
  walletButton: {
    backgroundColor: '#40B37C',
    padding: 16,
    borderRadius: 8,
    marginTop: -32,
  },
});

export default Offer;