// DeleteAccountScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const DeleteAccountScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.backButton}>Back</Text>
                <Text style={styles.title}>Delete Account</Text>
            </View>
            <Text style={styles.message}>
                Are you sure you want to delete your account? Please read how account deletion will affect.
            </Text>
            <Text style={styles.message}>
                Deleting your account removes personal information from our database. Your email becomes permanently reserved and the same email cannot be re-used to register a new account.
            </Text>

            <Button title="Delete" onPress={() => {}} color="#ff4d4d" />
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
    message: {
        marginVertical: 10,
        fontSize: 16,
    },
});

export default DeleteAccountScreen;