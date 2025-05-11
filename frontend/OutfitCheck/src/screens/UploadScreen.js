import React, { useState, useCallback } from 'react';
import { View, Button, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { removeBackground } from '../utils/removeBackground';

export default function UploadScreen({ onAddToCloset }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const navigation = useNavigation();

    const pickImage = async () => {
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
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            setProcessedImage(null);
        }
    };

    useFocusEffect(
        useCallback(() => {
            pickImage();

            return () => {
                setSelectedImage(null);
                setProcessedImage(null);
                setProcessing(false);
            };
        }, [])
    );

    const handleRemoveBackground = async () => {
        if (!selectedImage) return;

        try {
            setProcessing(true);
            const uri = await removeBackground(selectedImage);
            setProcessedImage(uri);
        } catch (error) {
            Alert.alert('Error', 'No se pudo quitar el fondo.');
        } finally {
            setProcessing(false);
        }
    };

    const handleSaveToCloset = () => {
        const finalImage = processedImage || selectedImage;
        if (!finalImage) return;

        Alert.alert(
            '¿Guardar imagen?',
            '¿Quieres guardar esta imagen en tu armario?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Guardar',
                    onPress: () => {
                        console.log('🧥 Imagen guardada:', finalImage);
                        onAddToCloset && onAddToCloset(finalImage);
                        Alert.alert('✅ Imagen guardada en tu armario');
                        setSelectedImage(null);
                        setProcessedImage(null);
                        navigation.navigate('Galería'); // ✅ redirige a tab Galería
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {selectedImage && (
                <>
                    <Image source={{ uri: processedImage || selectedImage }} style={styles.image} />
                    <View style={{ marginTop: 15, gap: 10 }}>
                        {!processedImage && (
                            <Button title="Quitar fondo" onPress={handleRemoveBackground} />
                        )}
                        <Button title="Guardar en armario" onPress={handleSaveToCloset} />
                    </View>
                </>
            )}

            {processing && (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    image: { width: 300, height: 300, marginTop: 20, borderRadius: 10, resizeMode: 'contain' }
});