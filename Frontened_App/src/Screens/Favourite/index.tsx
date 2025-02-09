import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface FavoriteLocation {
    id: string;
    name: string;
    address: string;
    type: 'home' | 'work' | 'other';
}

const favoriteLocations: FavoriteLocation[] = [
    {
        id: '1',
        name: 'Home',
        address: '123 Main Street, New York',
        type: 'home',
    },
    {
        id: '2',
        name: 'Office',
        address: '456 Business Ave, Manhattan',
        type: 'work',
    },
    {
        id: '3',
        name: 'Gym',
        address: '789 Fitness Road, Brooklyn',
        type: 'other',
    },
];

const Favourite = () => {
    const navigation = useNavigation();

    const getIconName = (type: string) => {
        switch (type) {
            case 'home':
                return 'home';
            case 'work':
                return 'business';
            default:
                return 'location';
        }
    };

    const renderFavoriteItem = ({ item }: { item: FavoriteLocation }) => (
        <TouchableOpacity
            style={styles.favoriteItem}
            onPress={() => navigation.navigate('RideSearch', { destination: item })}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={getIconName(item.type)} size={24} color="#4CAF50" />
            </View>
            <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationAddress}>{item.address}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Favourite Places</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddFavorite')}
                >
                    <Ionicons name="add" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={favoriteLocations}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {favoriteLocations.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="heart-outline" size={64} color="#666" />
                    <Text style={styles.emptyStateText}>No favourite places yet</Text>
                    <Text style={styles.emptyStateSubtext}>
                        Add your frequently visited places for quick access
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        padding: 8,
    },
    listContainer: {
        padding: 16,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        color: '#666',
    },
    moreButton: {
        padding: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default Favourite; 