import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeMain from './HomeMain';
import ClosetScreen from './ClosetScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ onLogout, onNavigateToUpload, closetImages }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Inicio') iconName = 'home';
            else if (route.name === 'Armario') iconName = 'shirt';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Inicio">
          {() => (
            <HomeMain
              onLogout={onLogout}
              onNavigateToUpload={onNavigateToUpload} // ✅ ahora sí está definida
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Armario">
          {() => <ClosetScreen closetImages={closetImages} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}