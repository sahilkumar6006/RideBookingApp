import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    {/* <Image
                        source={require('../../assets/avatar.png')}
                        style={styles.avatar}
                    /> */}
                    <ImagePickerComponent selectedImage={undefined} setSelectedImage={undefined} />
                </View>

                <Text style={styles.userName}>{user.fullName}</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={user?.email}
                    editable={false}
                />

                <View style={styles.phoneInputContainer}>
                    <View style={styles.countryCode}>
                        {/* <Image
                            source={require('../../assets/bangladesh-flag.png')}
                            style={styles.flagIcon}
                        /> */}
                        <Text>+880</Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </View>
                    <TextInput
                        style={styles.phoneInput}
                        placeholder="Your mobile number"
                        editable={false}
                        value={user?.phone}
                    />
                </View>

                <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={styles.dropdownText}>Male</Text>
                    <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    editable={false}
                />

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>


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
        alignItems: 'center',
        padding: 16,
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    menuButton: {
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 16,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarContainer: {
        position: 'relative',
        backgroundColor: '#fff',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    userName: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 16,
        color: '#333',
    },
    formContainer: {
        padding: 16,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginRight: 8,
    },
    flagIcon: {
        width: 24,
        height: 16,
        marginRight: 8,
    },
    phoneInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
    },
    dropdownInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    activeNav: {
        color: '#4CAF50',
    },
    activeNavText: {
        color: '#4CAF50',
    },
});

export default ProfileScreen;