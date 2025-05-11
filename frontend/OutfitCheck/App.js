import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ImageUploadScreen from './src/screens/ImageUploadScreen';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState('home');
  const [closetImages, setClosetImages] = useState([]); 

  const handleAddImageToCloset = (uri) => {
    setClosetImages((prev) => [...prev, uri]); 
  };

  if (!loggedIn) {
    return <AuthScreen onLogin={() => setLoggedIn(true)} />;
  }

  if (screen === 'upload') {
    return (
      <View style={{ flex: 1 }}>
        <ImageUploadScreen
          onAddToCloset={handleAddImageToCloset}
          autoPick={true}
          onDone={() => setScreen('home')} 
        />
        <Button title="Volver al inicio" onPress={() => setScreen('home')} />
      </View>
    );
  }

  return (
    <HomeScreen
      onLogout={() => setLoggedIn(false)}
      onNavigateToUpload={() => setScreen('upload')}
      closetImages={closetImages} 
    />
  );
}