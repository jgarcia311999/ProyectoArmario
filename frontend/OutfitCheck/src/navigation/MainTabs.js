import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import GalleryScreen from '../screens/GalleryScreen';
import * as ImagePicker from 'expo-image-picker';
import { removeBackground } from '../utils/removeBackground';
import ReviewModal from '../../components/ReviewModal';
import DesignScreen from '../screens/DesignScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function MainTabs({ closet, onAddToCloset }) {
    const [reviewImage, setReviewImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDirectUpload = async ({ navigation }) => {
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
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error al subir imagen:', error);
        }
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;
                            if (route.name === 'Galería') iconName = 'images';
                            else if (route.name === 'Subir') iconName = 'add-circle';
                            else if (route.name === 'Diseño') iconName = 'heart';
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
                        listeners={({ navigation }) => ({
                            tabPress: (e) => {
                                e.preventDefault();
                                handleDirectUpload({ navigation });
                            },
                        })}
                    />

                    <Tab.Screen name="Diseño" component={DesignScreen} />
                </Tab.Navigator>
            </NavigationContainer>

            <ReviewModal
                visible={modalVisible}
                imageUri={reviewImage}
                onClose={() => setModalVisible(false)}
                onSave={(data) => {
                    onAddToCloset(data);
                    setModalVisible(false);
                }}
            />
        </SafeAreaProvider>
    );
}