import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GalleryScreen({ closet }) {
    console.log('🧥 Imagenes recibidas:', closet);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image style={styles.avatar} source={require('../../assets/user_icon.png')} />
                <Text style={styles.username}>Name user</Text>

                <View style={styles.headerIcons}>
                    <Ionicons name="heart-outline" size={24} color="#333" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="#333" style={styles.icon} />
                </View>

                <View style={styles.toggle}>
                    <Text style={styles.toggleText}>TODO</Text>
                    <Text style={[styles.toggleText, { color: '#888' }]}>ARMARIOS</Text>
                </View>
            </View>

            {/* CATEGORÍAS */}
            <View style={styles.categories}>
                <TouchableOpacity style={styles.categoryCircle}><Text style={styles.categoryLabel}>TODO</Text></TouchableOpacity>
                <TouchableOpacity style={styles.categoryCircle}><Text style={styles.categoryLabel}>CAM.</Text></TouchableOpacity>
                <TouchableOpacity style={styles.categoryCircle}><Text style={styles.categoryLabel}>PANT.</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterCircle}>
                    <Ionicons name="filter-outline" size={18} color="#333" />
                </TouchableOpacity>
            </View>

            {/* GALERÍA */}
            <View style={styles.galleryContainer}>
                {closet.length > 0 ? (
                    closet.map((item, index) => (
                        <View key={index} style={styles.greenCard}>
                            <Image source={{ uri: item }} style={styles.galleryImage} />
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>Tu armario está vacío</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fefce8' },
    scrollContent: {
        paddingBottom: 40
    },
    header: {
        margin: 20,
        marginTop: 60,
        padding: 20,
        backgroundColor: '#d9e4d4',
        borderRadius: 30,
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        marginBottom: 5,
    },
    username: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    headerIcons: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row',
        gap: 10,
    },
    icon: {
        marginLeft: 12,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '500',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    categoryCircle: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#e6eedd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterCircle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#e6eedd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
    greenCard: {
        backgroundColor: '#d9e4d4',
        borderRadius: 30,
        padding: 15,
        margin: 20,
    },
    
    galleryImage: {
        width: '100%',
        height: 400,
        marginBottom: 20,
        borderRadius: 16,
        resizeMode: 'cover',
    },
});