import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const VehicleDetailsScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation();
    const  vehicleId  = route.params?.id; // Get the vehicle ID from params
    console.log(vehicleId, "VEHICLE ID");
    const [loading, setLoading] = useState(true);
    const [vehicle, setVehicle] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchVehicleDetails();
    }, []);

    const fetchVehicleDetails = async () => {
        try {
            const response = await axios.get(`http://192.168.31.111:8000/api/v1/vehicles/vehicles/${vehicleId}`);
            if (response.data.success) {
                setVehicle(response.data.data);
            } else {
                setError('Vehicle not found');
            }
        } catch (err) {
            console.error('Error fetching vehicle details:', err);
            setError('Failed to fetch vehicle details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0B8A4D" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>{error}</Text>
            </View>
        );
    }

    if (!vehicle) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: Vehicle details not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={scale(24)} color="#000" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{vehicle.model}</Text>
            <View style={styles.ratingContainer}>
                <Icon name="star" size={scale(16)} color="#FFD700" />
                <Text style={styles.rating}>{4.9}</Text>
                <Text style={styles.reviews}>({531} reviews)</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} resizeMode="contain" />
            </View>

            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specificationsContainer}>
                <View style={styles.specItem}>
                    <Text style={styles.specValue}>{vehicle.specifications.maxPower}</Text>
                    <Text style={styles.specLabel}>Max. power</Text>
                </View>
                <View style={styles.specItem}>
                    <Text style={styles.specValue}>{vehicle.specifications.fuel}</Text>
                    <Text style={styles.specLabel}>Fuel</Text>
                </View>
                <View style={styles.specItem}>
                    <Text style={styles.specValue}>{vehicle.specifications.maxSpeed}</Text>
                    <Text style={styles.specLabel}>Max. speed</Text>
                </View>
                <View style={styles.specItem}>
                    <Text style={styles.specValue}>{vehicle.specifications.zeroToSixty}</Text>
                    <Text style={styles.specLabel}>0-60mph</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Car Features</Text>
            <View style={styles.featuresContainer}>
                <Text style={styles.featureLabel}>Model: {vehicle.features.model}</Text>
                <Text style={styles.featureLabel}>Capacity: {vehicle.features.capacity}</Text>
                <Text style={styles.featureLabel}>Color: {vehicle.features.color}</Text>
                <Text style={styles.featureLabel}>Fuel type: {vehicle.features.fuelType}</Text>
                <Text style={styles.featureLabel}>Gear type: {vehicle.features.gearType}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bookLaterButton}>
                    <Text style={styles.bookLaterText}>Book later</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rideNowButton}>
                    <Text style={styles.rideNowText}>Ride Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        marginBottom: verticalScale(8),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(16),
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
        fontSize: scale(14),
        fontWeight: '500',
        color: '#333',
    },
    specLabel: {
        fontSize: scale(12),
        color: '#666',
    },
    featuresContainer: {
        backgroundColor: '#F8FFFA',
        borderRadius: scale(12),
        padding: scale(16),
        marginBottom: verticalScale(24),
    },
    featureLabel: {
        fontSize: scale(14),
        color: '#333',
        marginBottom: verticalScale(8),
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
    },
    rideNowButton: {
        flex: 1,
        padding: verticalScale(12),
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

export default VehicleDetailsScreen; 