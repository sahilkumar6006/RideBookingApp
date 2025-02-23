import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import CarCard from '@/src/components/CarCard';

type VehicleScreenProps = {
    route: {
        params: {
            vehicles: any[];
            vehicleType: string;
        }
    }
};

const AvailableVehiclesScreen: React.FC<VehicleScreenProps> = ({ route }) => {
    const { vehicles = [], vehicleType = '' } = route.params;

    const getPluralizedVehicleType = (type: string) => {
        switch (type.toLowerCase()) {
            case 'cars':
                return 'Cars';
            case 'bikes':
                return 'Bikes';
            case 'bicycles':
                return 'Bicycles';
            case 'taxis':
                return 'Taxis';
            default:
                return type;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Available {getPluralizedVehicleType(vehicleType)} for ride
            </Text>
            <Text style={styles.vehiclesFoundText}>
                {vehicles.length} {vehicleType.toLowerCase()} found
            </Text>
            <ScrollView>
                {vehicles.map((vehicle, index) => (
                    <CarCard 
                        key={vehicle._id || index}
                        car={vehicle}
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