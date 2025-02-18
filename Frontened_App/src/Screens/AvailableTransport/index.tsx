import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import CarIcon from '../../assets/images/svg/Car.svg';

const carsData = [
    {
        id: '1',
        name: 'BMW Cabrio',
        details: 'Automatic | 3 seats | Octane',
        distance: '800m (5 mins away)',
        image: <CarIcon />, // Replace with actual image path
    },
    {
        id: '2',
        name: 'Mustang Shelby GT',
        details: 'Automatic | 3 seats | Octane',
        distance: '800m (5 mins away)',
        image: <CarIcon />, // Replace with actual image path
    },
    {
        id: '3',
        name: 'BMW 18',
        details: 'Automatic | 3 seats | Octane',
        distance: '800m (5 mins away)',
        image: <CarIcon/>, // Replace with actual image path
    },
   
];

const AvailableCarsScreen = () => {
    const renderCarItem = ({ item }: { item: any }) => (
        <View style={styles.carItem}>
            <Image source={item.image} style={styles.carImage} />
            <View style={styles.carDetails}>
                <Text style={styles.carName}>{item.name}</Text>
                <Text style={styles.carInfo}>{item.details}</Text>
                <Text style={styles.carDistance}>{item.distance}</Text>
                <TouchableOpacity style={styles.viewCarListButton}>
                    <Text style={styles.buttonText}>View car list</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Available cars for ride</Text>
            <Text style={styles.subHeader}>{carsData.length} cars found</Text>
            <FlatList
                data={carsData}
                renderItem={renderCarItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
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
        marginBottom: 10,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    carItem: {
        flexDirection: 'row',
        padding: 16,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    carImage: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    carDetails: {
        flex: 1,
    },
    carName: {
        fontSize: 18,
        fontWeight: '600',
    },
    carInfo: {
        fontSize: 14,
        color: '#666',
    },
    carDistance: {
        fontSize: 14,
        color: '#999',
    },
    viewCarListButton: {
        marginTop: 8,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AvailableCarsScreen;