import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeMain({ onLogout, onNavigateToUpload }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎉 Bienvenido a OutfitCheck</Text>
            <Button title="Subir una imagen" onPress={onNavigateToUpload} />
            <View style={{ height: 20 }} />
            <Button title="Cerrar sesión" onPress={onLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' }
});