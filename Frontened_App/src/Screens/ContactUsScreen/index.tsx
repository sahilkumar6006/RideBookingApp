// ContactUsScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const ContactUsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.backButton}>Back</Text>
                <Text style={styles.title}>Contact Us</Text>
            </View>
            <Text style={styles.subtitle}>Contact us for Ride share</Text>
            <Text style={styles.address}>
                Address: House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon School & College, beside University of South Asia)
            </Text>
            <Text style={styles.contactInfo}>Call: 13301 (24/7)</Text>
            <Text style={styles.contactInfo}>Email: support@pathao.com</Text>

            <TextInput style={styles.input} placeholder="Name" />
            <TextInput style={styles.input} placeholder="Email" />
            <View style={styles.mobileInputContainer}>
                <Text style={styles.countryCode}>+880</Text>
                <TextInput style={styles.mobileInput} placeholder="Your mobile number" keyboardType="phone-pad" />
            </View>
            <TextInput style={styles.input} placeholder="Write your text" multiline={true} numberOfLines={4} />

            <Button title="Send Message" onPress={() => {}} color="#28a745" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        color: '#007bff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    address: {
        marginBottom: 10,
    },
    contactInfo: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    mobileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    countryCode: {
        marginRight: 10,
        fontSize: 16,
    },
    mobileInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
});

export default ContactUsScreen;