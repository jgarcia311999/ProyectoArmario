import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DesignScreen from '../screens/DesignScreen';
import GalleryScreen from '../screens/GalleryScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainTabs({ closet, onAddToCloset, onClearCloset }) {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainTabs">
                        {() => (
                            <Tab.Navigator
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ color, size }) => {
                                        let iconName = route.name === 'Diseño' ? 'heart' : 'ellipse';
                                        return <Ionicons name={iconName} size={size} color={color} />;
                                    },
                                    headerShown: false,
                                    tabBarActiveTintColor: '#007AFF',
                                    tabBarInactiveTintColor: 'gray',
                                })}
                            >
                                <Tab.Screen name="Diseño">
                                    {() => (
                                        <DesignScreen
                                            closet={closet}
                                            onAddToCloset={onAddToCloset}
                                            onClearCloset={onClearCloset}
                                        />
                                    )}
                                </Tab.Screen>
                            </Tab.Navigator>
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name="GalleryScreen"
                        component={GalleryScreen}
                        options={{
                            animation: 'slide_from_bottom',
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}