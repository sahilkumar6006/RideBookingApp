// src/Screens/SelectTransportScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const transportOptions = [
    { id: '1', name: 'Car', icon: require('../../assets/images/car.svg') }, // Add your icon images
    { id: '2', name: 'Bike', icon: require('../../assets/images/bike.svg') },
    { id: '3', name: 'Cycle', icon: require('../../assets/images/cycle.svg') },
    { id: '4', name: 'Taxi', icon: require('../../assets/images/taxi.svg') },
];

const SelectTransportScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select your transport</Text>
            <View style={styles.optionsContainer}>
                {transportOptions.map((option) => (
                    <TouchableOpacity key={option.id} style={styles.option}>
                        <Image source={option.icon} style={styles.icon} />
                        <Text style={styles.optionText}>{option.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
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
        width: '45%', // Adjust width for two options per row
        padding: 16,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default SelectTransportScreen;