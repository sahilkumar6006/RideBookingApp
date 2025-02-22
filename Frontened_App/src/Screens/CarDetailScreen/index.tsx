// CarDetailsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const CarDetailsScreen = ({ route, navigation }) => {
    const { car } = route.params;
    console.log(car);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{car.model}</Text>
            <Image source={{ uri: car?.image }} style={styles.image} />
            <Text>Rating: {car.rating} ({car.reviews} reviews)</Text>
            <Text>Specifications</Text>
            <Text>Max power: 250hp</Text>
            <Text>Fuel: 10km per litre</Text>
            <Text>Max speed: 230km/h</Text>
            <Text>0-60mph: 2.5 sec</Text>
            <Text>Car features</Text>
            <Text>Model: GT5000</Text>
            <Text>Capacity: 760hp</Text>
            <Text>Color: Red</Text>
            <Text>Fuel type: Octane</Text>
            <Text>Gear type: Automatic</Text>
            <Button title="Book later" onPress={() => {}} />
            <Button title="Ride Now" onPress={() => {navigation.navigate('ThankYou', { driverName: car?.driver?.name })}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 10,
    },
});

export default CarDetailsScreen;