import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import GalleryScreen from '../screens/GalleryScreen';
import UploadScreen from '../screens/UploadScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs({ closet, onAddToCloset }) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = route.name === 'Galería' ? 'images' : 'cloud-upload';
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

                <Tab.Screen name="Subir">
                    {() => <UploadScreen onAddToCloset={onAddToCloset} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}