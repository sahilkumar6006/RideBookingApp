// src/Screens/SelectAddressScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const recentPlaces = [
    { id: '1', name: 'Office', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486', distance: '2.7km' },
    { id: '2', name: 'Coffee shop', address: '1901 Thornridge Cir. Shiloh, Hawaii 81063', distance: '1.1km' },
    { id: '3', name: 'Shopping center', address: '4140 Parker Rd. Allentown, New Mexico 31134', distance: '4.9km' },
    { id: '4', name: 'Shopping mall', address: '4140 Parker Rd. Allentown, New Mexico 31134', distance: '4.0km' },
];

interface SelectAddressProps {
    visible: boolean;
    onClose: () => void;
}

const SelectAddressScreen: React.FC<SelectAddressProps> = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Select address</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>From</Text>
                    <TouchableOpacity style={styles.input}>
                        <Text style={styles.inputText}>Enter your address</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>To</Text>
                    <TouchableOpacity style={styles.input}>
                        <Text style={styles.inputText}>Enter destination</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.recentPlacesTitle}>Recent places</Text>
                <FlatList
                    data={recentPlaces}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.placeItem}>
                            <Ionicons name="location-outline" size={20} color="#4CAF50" />
                            <View style={styles.placeInfo}>
                                <Text style={styles.placeName}>{item.name}</Text>
                                <Text style={styles.placeAddress}>{item.address}</Text>
                            </View>
                            <Text style={styles.placeDistance}>{item.distance}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 'auto',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
    },
    inputText: {
        color: '#999',
    },
    recentPlacesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    placeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    placeInfo: {
        flex: 1,
        marginLeft: 8,
    },
    placeName: {
        fontWeight: 'bold',
    },
    placeAddress: {
        color: '#666',
    },
    placeDistance: {
        color: '#4CAF50',
    },
});

export default SelectAddressScreen;