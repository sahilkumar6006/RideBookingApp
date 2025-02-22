// src/Screens/SelectTransportScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CarIcon from '../../assets/images/svg/Car.svg';
import BikeIcon from '../../assets/images/svg/Bike.svg';
import CycleIcon from '../../assets/images/svg/Cycle.svg';
import WalletIcon from '../../assets/images/svg/Taxi.svg'; // Ensure the name matches the file
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const SelectTransportScreen = () => {
    const navigation = useNavigation(); 
    const transportOptions = [
        { id: '1', name: 'Car', icon: CarIcon, onPress: () => navigation.navigate('AvailableCarsScreen')},
        { id: '2', name: 'Bike', icon: BikeIcon, onPress: () => navigation.navigate('AvailableBikesScreen')},
        { id: '3', name: 'Cycle', icon: CycleIcon, onPress: () => navigation.navigate('AvailableCyclesScreen')},
        { id: '4', name: 'Taxi', icon: WalletIcon, onPress: () => navigation.navigate('AvailableTaxisScreen')},
    ];
    return (
        <ScreenWrapper children={undefined} onBackPress={undefined} containerStyle={undefined} headerRight={undefined}>
        <View style={styles.container}>
            <Text style={styles.header}>Select your transport</Text>
            <View style={styles.optionsContainer}>
                {transportOptions.map((option) => (
                    <TouchableOpacity key={option.id} style={styles.option} onPress={option.onPress}>
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