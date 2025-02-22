import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CarIcon from '../../assets/images/svg/Car.svg';
import BikeIcon from '../../assets/images/svg/Bike.svg';
import CycleIcon from '../../assets/images/svg/Cycle.svg';
import WalletIcon from '../../assets/images/svg/Taxi.svg';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface VehicleResponse {
    success: boolean;
    data: any[]; // You might want to replace 'any' with a specific vehicle type
    message?: string;
}

const SelectTransportScreen = () => {
    const navigation = useNavigation();


    // ... existing code ...
    
    const fetchVehicles = async (type: string) => {
        try {
            console.log('1. Starting fetchVehicles with type:', type);
            
            const apiUrl = `http://192.168.31.111:8000/api/v1/vehicles/vehicles/${type.toLowerCase()}`; 
            console.log('2. API URL:', apiUrl);
            
            const response = await axios.get(apiUrl, {
                params: {
                    showLoader: true // If you need to pass any parameters
                }
            });
            
            console.log('3. API Response:', response.data); // Log the response data
    
            // Determine the property name based on the vehicle type
            const vehicleProperty = type.toLowerCase(); // e.g., 'taxis', 'cycles', etc.
    
            // Check if the response has the expected property
            if (response.data && Array.isArray(response.data[vehicleProperty])) {
                navigation.navigate('AvailableVehiclesScreen', {
                    vehicles: response.data[vehicleProperty], // Use the dynamic property
                    vehicleType: type
                });
            } else {
                throw new Error(`Invalid response format: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error("Error in fetchVehicles:", error);
            console.error("Error stack:", error.stack);
        }
    };
    
    // ... existing code ...

// ... existing code ...

// ... existing code ...

    const transportOptions = [
        { id: '1', name: 'Car', icon: CarIcon, onPress: () => fetchVehicles('cars') },
        { id: '2', name: 'Bike', icon: BikeIcon, onPress: () => fetchVehicles('bikes') },
        { id: '3', name: 'Cycle', icon: CycleIcon, onPress: () => fetchVehicles('cycles') },
        { id: '4', name: 'Taxi', icon: WalletIcon, onPress: () => fetchVehicles('taxis') },
    ];

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Select your transport</Text>
                <View style={styles.optionsContainer}>
                    {transportOptions.map((option) => (
                        <TouchableOpacity 
                            key={option.id} 
                            style={styles.option} 
                            onPress={option.onPress}
                        >
                            <option.icon width={scale(60)} height={scale(70)} />
                            <Text style={styles.optionText}>{option.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    option: {
        width: '45%',
        padding: 16,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default SelectTransportScreen;