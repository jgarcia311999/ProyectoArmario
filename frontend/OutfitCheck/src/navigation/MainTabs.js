import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import GalleryScreen from '../screens/GalleryScreen';
import { removeBackground } from '../utils/removeBackground';
import ReviewModal from '../../components/ReviewModal'; 
const Tab = createBottomTabNavigator();

export default function MainTabs({ closet, onAddToCloset }) {
    const [reviewImage, setReviewImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDirectUpload = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso denegado');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                const noBgUri = await removeBackground(uri);
                setReviewImage(noBgUri);
                setModalVisible(true); // 👉 Muestra el modal
            }
        } catch (error) {
            console.error('Error al subir imagen:', error);
        }
    };

    return (
        <>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            const iconName = route.name === 'Galería' ? 'images' : 'add-circle';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        headerShown: false,
                        tabBarActiveTintColor: '#007AFF',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="Galería">
                        {() => <GalleryScreen closet={closet} />}
                    </Tab.Screen>

                    <Tab.Screen
                        name="Subir"
                        component={() => null}
                        listeners={{
                            tabPress: (e) => {
                                e.preventDefault();
                                handleDirectUpload();
                            },
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>

            <ReviewModal
                visible={modalVisible}
                imageUri={reviewImage}
                onSave={(imageData) => {
                    onAddToCloset(imageData);
                    setModalVisible(false);
                    setReviewImage(null);
                }}
                onCancel={() => {
                    setModalVisible(false);
                    setReviewImage(null);
                }}
            />
        </>
    );
}