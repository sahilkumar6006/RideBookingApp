import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CarIcon from '../../assets/images/svg/Car.svg';
import BikeIcon from '../../assets/images/svg/Bike.svg';
import CycleIcon from '../../assets/images/svg/Cycle.svg';
import TaxiIcon from '../../assets/images/svg/Taxi.svg';
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

    const fetchVehicles = async (type: string) => {
        try {
            console.log('1. Starting fetchVehicles with type:', type);
            
            const apiUrl = `http://192.168.31.111:8000/api/v1/vehicles/vehicles/${type.toLowerCase()}`; 
            console.log('2. API URL:', apiUrl);
            
            const response = await axios.get(apiUrl);
            console.log('3. API Response:', response.data);

            if (response.data.success && Array.isArray(response.data.data)) {
                navigation.navigate('AvailableVehiclesScreen', {
                    vehicles: response.data.data,
                    vehicleType: type
                });
            }
        } catch (error) {
            console.error(`Error in fetchVehicles: ${error.message}`);
        }
    };

    const transportOptions = [
        { id: 'cars', icon: CarIcon, label: 'Car' },
        { id: 'bikes', icon: BikeIcon, label: 'Bike' },
        { id: 'bicycles', icon: CycleIcon, label: 'Bicycle' },
        { id: 'taxis', icon: TaxiIcon, label: 'Taxi' }
    ];

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.header}>Select Transport Type</Text>
                <View style={styles.optionsContainer}>
                    {transportOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.option}
                            onPress={() => fetchVehicles(option.id)}
                        >
                            <option.icon width={scale(40)} height={scale(40)} />
                            <Text style={styles.optionText}>{option.label}</Text>
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
        padding: scale(16),
        backgroundColor: '#fff',
    },
    header: {
        fontSize: scale(24),
        fontWeight: 'bold',
        marginBottom: scale(20),
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    option: {
        width: '45%',
        padding: scale(16),
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: scale(8),
        alignItems: 'center',
        marginBottom: scale(16),
    },
    optionText: {
        fontSize: scale(16),
        marginTop: scale(8),
        color: '#333',
    },
});

export default SelectTransportScreen;