import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { clearUser } from '@/src/redux/slices/userSlice';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    console.log(user);
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Form state
    const [formData, setFormData] = useState({
        address: user?.address || '',
        age: user?.age || '',
        street: user?.street || '',
        district: user?.district || '',
        city: user?.city || '',
        state: user?.state || '',
        zipCode: user?.zipCode || '',
    });

    const handleUpdateProfile = async () => {
        try {
            const data = new FormData();
            
            // Make sure to use the correct user id field
            data.append('userId', user.id);

            // Log the userId to verify it's being sent
            console.log('Sending userId:', user.id);

            // Append image if selected
            if (selectedImage) {
                const imageFile = {
                    uri: selectedImage,
                    type: 'image/jpeg',
                    name: 'profile-image.jpg',
                };
                data.append('profileImage', imageFile);
            }

            // Only append fields that have values
            Object.keys(formData).forEach((key) => {
                if (formData[key] && formData[key].toString().trim() !== '') {
                    data.append(key, formData[key]);
                }
            });

            // Log the full FormData for debugging
            console.log('FormData contents:', Object.fromEntries(data));

            const response = await axios.post(
                'http://your-api-url/api/v1/users/complete-profile', 
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data) {
                // Update the local state with the new data
                dispatch(updateProfile(response.data.data));
                Alert.alert('Success', 'Profile updated successfully');
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Profile update error:', error);
            Alert.alert(
                'Error', 
                error.response?.data?.message || 'Failed to update profile'
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => setIsEditing(!isEditing)}
                >
                    <Text style={styles.editButtonText}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <ImagePickerComponent 
                            selectedImage={selectedImage} 
                            setSelectedImage={setSelectedImage}
                            currentImage={user.profileImage}
                            disabled={!isEditing}
                        />
                    </View>

                    <Text style={styles.userName}>{user.fullName}</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        value={user?.email}
                        editable={false}
                    />

                    <View style={styles.phoneInputContainer}>
                        <View style={styles.countryCode}>
                            <Text>+880</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </View>
                        <TextInput
                            style={styles.phoneInput}
                            value={user?.phone}
                            editable={false}
                        />
                    </View>

                    {/* Editable fields */}
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={formData.address}
                        onChangeText={(text) => setFormData({...formData, address: text})}
                        editable={isEditing}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        value={formData.age}
                        onChangeText={(text) => setFormData({...formData, age: text})}
                        editable={isEditing}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Street"
                        value={formData.street}
                        onChangeText={(text) => setFormData({...formData, street: text})}
                        editable={isEditing}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="District"
                        value={formData.district}
                        onChangeText={(text) => setFormData({...formData, district: text})}
                        editable={isEditing}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={formData.city}
                        onChangeText={(text) => setFormData({...formData, city: text})}
                        editable={isEditing}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="State"
                        value={formData.state}
                        onChangeText={(text) => setFormData({...formData, state: text})}
                        editable={isEditing}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChangeText={(text) => setFormData({...formData, zipCode: text})}
                        editable={isEditing}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    {isEditing ? (
                        <TouchableOpacity 
                            style={[styles.logoutButton, { backgroundColor: '#4CAF50' }]}
                            onPress={handleUpdateProfile}
                        >
                            <Text style={styles.logoutText}>Save Changes</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.logoutButton} onPress={() => {
                            navigation.navigate('LoginScreen');
                            dispatch(clearUser());

                        }}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 60,
        backgroundColor: '#fff',
        zIndex: 1,
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
        justifyContent: 'center',
        overflow: 'hidden',
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
    editButton: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    editButtonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonContainer: {
        padding: 16,
        paddingBottom: 0,
    },
    bottomPadding: {
        height: 30,
    },
});

export default ProfileScreen;