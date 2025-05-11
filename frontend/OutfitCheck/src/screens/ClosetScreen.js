import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function ClosetScreen({ closetImages }) {
    return (
        <View style={styles.container}>
            {closetImages.length === 0 ? (
                <Text style={styles.text}>👚 Tu armario está vacío</Text>
            ) : (
                <FlatList
                    data={closetImages}
                    keyExtractor={(uri, index) => uri + index}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    text: { fontSize: 20, textAlign: 'center', marginTop: 30 },
    image: { width: '48%', aspectRatio: 1, margin: '1%', borderRadius: 10 }
});