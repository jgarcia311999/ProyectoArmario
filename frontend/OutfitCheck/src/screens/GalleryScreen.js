import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const categories = [
    'Camisetas', 'Camisas', 'Pantalones', 'Shorts', 'Faldas',
    'Chaquetas', 'Abrigos', 'Zapatos', 'Accesorios', 'Vestidos'
];

export default function GalleryScreen({ closet, reviewImage, onReviewConfirm }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (reviewImage) {
            setModalVisible(true);
        }
    }, [reviewImage]);

    const handleConfirm = () => {
        if (!selectedCategory) return;
        onReviewConfirm({ image: reviewImage, category: selectedCategory });
        setSelectedCategory(null);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image style={styles.avatar} source={require('../../assets/user_icon.png')} />
                <Text style={styles.username}>Name user</Text>

                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Diseño')}>
                        <Ionicons name="heart-outline" size={24} color="#333" style={styles.icon} />
                    </TouchableOpacity>
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
                            <Image source={{ uri: item.image }} style={styles.galleryImage} />
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>Tu armario está vacío</Text>
                )}
            </View>

            {/* MODAL DE REVISIÓN */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {reviewImage && (
                            <Image source={{ uri: reviewImage }} style={styles.modalImage} />
                        )}
                        <Text style={styles.modalTitle}>Selecciona una categoría</Text>

                        <ScrollView style={styles.modalScroll}>
                            {categories.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={[
                                        styles.categoryItem,
                                        selectedCategory === item && styles.categoryItemSelected,
                                    ]}
                                    onPress={() => setSelectedCategory(item)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryItemText,
                                            selectedCategory === item && { fontWeight: 'bold' },
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                !selectedCategory && { backgroundColor: '#ccc' },
                            ]}
                            disabled={!selectedCategory}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.saveButtonText}>Guardar prenda</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fefce8' },
    scrollContent: { paddingBottom: 40 },

    safeArea: {
        flex: 1,
        backgroundColor: '#fefce8',
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
    icon: { marginLeft: 12 },
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
        alignItems: 'start',
        paddingVertical: 10,
        paddingHorizontal: 40,
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
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
        fontSize: 16,
    },

    modalScroll: {
        maxHeight: 200,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalImage: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginBottom: 20,
    },
    categoryItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
    },
    categoryItemSelected: {
        backgroundColor: '#d9e4d4',
    },
    categoryItemText: {
        fontSize: 16,
        color: '#333',
    },
});