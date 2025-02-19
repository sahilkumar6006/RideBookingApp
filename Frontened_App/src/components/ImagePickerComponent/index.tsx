import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import { Text } from 'react-native';
import Profie from "../../assets/images/svg/Profile.svg";

const ImagePickerComponent = ({ selectedImage, setSelectedImage }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasCameraPermission(cameraPermission.granted);
            setHasMediaLibraryPermission(mediaLibraryPermission.granted);
        })();
    }, []);

    const pickImage = async () => {
        if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
            Alert.alert('Permissions not determined');
            return;
        }

        if (!hasCameraPermission || !hasMediaLibraryPermission) {
            Alert.alert(
                'Permissions required',
                'You need to grant camera and gallery permissions to use this feature.',
                [{ text: 'OK' }]
            );
            return;
        }

        Alert.alert(
            'Select Image Source',
            'Choose an option:',
            [
                {
                    text: 'Camera',
                    onPress: async () => {
                        let result = await ImagePicker.launchCameraAsync({
                            allowsEditing: false,
                            quality: 1,
                        });

                        if (!result.canceled && result.assets.length > 0) {
                            const croppedImage = await ImageManipulator.manipulateAsync(
                                result.assets[0].uri,
                                [{ resize: { width: 400, height: 400 } }],
                                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                            );

                            setSelectedImage(croppedImage.uri);
                        }
                    },
                },
                {
                    text: 'Gallery',
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.getPendingResultAsync.Images, // Fixed to use MediaTypeOptions
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled && result.assets.length > 0) {
                            const croppedImage = await ImageManipulator.manipulateAsync(
                                result.assets[0].uri,
                                [{ resize: { width: 400, height: 400 } }],
                                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                            );

                            setSelectedImage(croppedImage.uri);
                        }
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
                <Profie style={styles.profileImage} />
            )}
            {/* <EDITicon style={styles.editIconOverlay} /> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    editIcon: {
        position: 'relative',
        alignSelf: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 10,
    },
    profileIcon: {
        borderRadius: 35,
        width: 50,
        height: 50,
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        alignSelf: 'center',
    },
    editIconOverlay: {
        position: 'absolute',
        right: -10,
        bottom: 0,
    },
});

export default ImagePickerComponent;