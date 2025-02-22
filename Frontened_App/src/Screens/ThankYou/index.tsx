// ThankYouScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';

const ThankYouScreen = ({ route }: {route: any}) => {
    const navigation = useNavigation();
    const { driverName } = route.params; // Get the driver's name from the route parameters

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thank you</Text>
            <Text style={styles.message}>
                Your booking has been placed to
            </Text>
            <Text style={styles.driverName}>{driverName}</Text>
            <Button
                title="Confirm Ride"
                onPress={() => navigation.navigate('BottomTab')} // Navigate back or to another screen
                color="#4CAF50" // Green color for the button
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: verticalScale(20),
    },
    title: {
        fontSize: verticalScale(24),
        fontWeight: 'bold',
        marginBottom: verticalScale(10),
    },
    message: {
        fontSize: verticalScale(16),
        textAlign: 'center',
        marginBottom: verticalScale(5),
    },
    driverName: {
        fontSize: verticalScale(18), 
            fontWeight: 'bold',
        marginBottom: verticalScale(20), 
    },
});

export default ThankYouScreen;