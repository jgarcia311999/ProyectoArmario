import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Alert, View, Modal, ActivityIndicator, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import GalleryScreen from '../screens/GalleryScreen';
import { removeBackground } from '../utils/removeBackground';

const Tab = createBottomTabNavigator();

export default function MainTabs({ closet, onAddToCloset }) {
    const [loading, setLoading] = useState(false);

    const handleDirectUpload = async (navigation) => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se necesita acceso a la galería.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled) {
                setLoading(true); // ⏳ Mostrar modal
                const uri = result.assets[0].uri;
                const noBgUri = await removeBackground(uri);
                onAddToCloset(noBgUri);
                setLoading(false); //  Ocultar modal
                navigation.navigate('Galería');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'No se pudo subir la imagen');
            console.error(' Error en subida directa:', error);
        }
    };

    return (
        <>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route, navigation }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName = route.name === 'Galería' ? 'images' : 'cloud-upload';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        headerShown: false,
                        tabBarActiveTintColor: '#007AFF',
                        tabBarInactiveTintColor: 'gray',
                        tabBarButton: (props) => {
                            if (route.name === 'Subir') {
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleDirectUpload(navigation)}
                                        accessibilityRole="button"
                                        accessibilityState={props.accessibilityState}
                                        style={props.style}
                                    >
                                        {props.children}
                                    </TouchableOpacity>
                                );
                            }
                            return <TouchableOpacity {...props} />;
                        },
                    })}
                >
                    <Tab.Screen name="Galería">
                        {() => <GalleryScreen closet={closet} />}
                    </Tab.Screen>

                    <Tab.Screen name="Subir">
                        {() => <View />} 
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>

            {/* MODAL DE CARGA */}
            <Modal visible={loading} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.modalText}>Procesando imagen...</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 15,
        fontSize: 16,
        color: '#333',
    },
});