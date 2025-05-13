import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const seasonsOptions = ['Primavera', 'Verano', 'Otoño', 'Invierno'];

const garmentTypes = {
    "Parte superior": ["Camiseta", "Camisa", "Top", "Jersey / Suéter", "Sudadera"],
    "Parte inferior": ["Pantalón", "Falda", "Shorts", "Leggins"],
    "Abrigo / chaqueta": ["Chaqueta", "Abrigo", "Cazadora", "Chaleco"],
    "Calzado": ["Zapatillas", "Botas", "Sandalias", "Tacones", "Zapatos", "Chanclas", "Deportivas"],
    "Traje de baño": ["Bikini", "Bañador entero", "Tankini"],
    "Deportiva": ["Parte superior deportiva", "Mallas", "Sudadera técnica", "Cortavientos", "Zapatillas deportivas"],
    "Accesorios": ["Sombreros / gorras", "Bufandas", "Guantes", "Bolsos / mochilas", "Gafas", "Cinturones", "Joyas"],
    "Conjunto / mono": ["Mono largo", "Mono corto", "Conjunto 2 piezas", "Enterizo"],
    "Ropa interior": ["Sujetador", "Braguita / calzoncillo", "Body", "Camiseta interior", "Calcetines"],
    "Pijama": ["Camiseta de pijama", "Pantalón de pijama", "Conjunto completo", "Bata"]
};

export default function CreateGarmentScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { reviewImage } = route.params || {};

    const [type, setType] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [style, setStyle] = useState('');
    const [brand, setBrand] = useState('');
    const [favorite, setFavorite] = useState(false);

    const [typeModalVisible, setTypeModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedSubtype, setSelectedSubtype] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSeason = (season) => {
        if (seasons.includes(season)) {
            setSeasons(seasons.filter(s => s !== season));
        } else {
            setSeasons([...seasons, season]);
        }
    };

    const canSave = type && primaryColor && seasons.length > 0;

    const handleSaveType = () => {
        if (!selectedType || !selectedSubtype) return;
        setType(selectedType);
        setSubcategory(selectedSubtype);
        setTypeModalVisible(false);
    };

    const filteredTypes = Object.entries(garmentTypes).reduce((acc, [group, items]) => {
        const filtered = items.filter(sub =>
            sub.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length) acc[group] = filtered;
        return acc;
    }, {});

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Diseño' })}>
                    <Ionicons name="close" size={30} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crear Prenda</Text>
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                    <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={28} color={favorite ? 'red' : '#333'} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {reviewImage ? (
                    <Image source={{ uri: reviewImage }} style={styles.image} />
                ) : (
                    <View style={[styles.image, styles.imagePlaceholder]}>
                        <Text style={{ color: '#999' }}>No hay imagen</Text>
                    </View>
                )}

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Tipo y subcategoría *</Text>
                    <TouchableOpacity style={styles.selectInput} onPress={() => setTypeModalVisible(true)}>
                        <Text style={{ color: type && subcategory ? '#000' : '#999' }}>
                            {type && subcategory ? `${type} - ${subcategory}` : 'Seleccionar tipo y subcategoría'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Color principal *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Azul, Rojo..."
                        value={primaryColor}
                        onChangeText={setPrimaryColor}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Color secundario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Blanco, Negro..."
                        value={secondaryColor}
                        onChangeText={setSecondaryColor}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Temporada(s) *</Text>
                    <View style={styles.seasonsContainer}>
                        {seasonsOptions.map(season => {
                            const selected = seasons.includes(season);
                            return (
                                <TouchableOpacity
                                    key={season}
                                    style={[styles.seasonButton, selected && styles.seasonButtonSelected]}
                                    onPress={() => toggleSeason(season)}
                                >
                                    <Text style={[styles.seasonText, selected && styles.seasonTextSelected]}>{season}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Estilo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Casual, Formal..."
                        value={style}
                        onChangeText={setStyle}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Marca</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Nike, Zara..."
                        value={brand}
                        onChangeText={setBrand}
                    />
                </View>
            </ScrollView>

            {/* MODAL DE TIPO Y SUBTIPO */}
            {typeModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setTypeModalVisible(false)}>
                                <Ionicons name="close" size={28} color="#333" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Buscar tipo..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        <ScrollView>
                            {Object.entries(filteredTypes).map(([group, subs]) => (
                                <View key={group}>
                                    <Text style={styles.modalGroup}>{group}</Text>
                                    {subs.map((sub, index) => (
                                        <TouchableOpacity
                                            key={`${group}-${sub}-${index}`}
                                            onPress={() => {
                                                setSelectedType(group);
                                                setSelectedSubtype(sub);
                                            }}
                                            style={styles.modalOption}
                                        >
                                            <Text style={styles.modalOptionText}>•   {sub}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.saveButton, !(selectedType && selectedSubtype) && styles.saveButtonDisabled]}
                            disabled={!(selectedType && selectedSubtype)}
                            onPress={handleSaveType}
                        >
                            <Text style={styles.saveButtonText}>Guardar selección</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
    content: { padding: 20, paddingBottom: 40 },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginBottom: 25,
        resizeMode: 'contain',
        alignSelf: 'center',
        backgroundColor: '#eee',
    },
    imagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
    formGroup: { marginBottom: 20 },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
    },
    selectInput: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
    },
    seasonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    seasonButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#f2f2f2',
        marginRight: 10,
        marginBottom: 10,
    },
    seasonButtonSelected: {
        backgroundColor: '#d9e4d4',
        borderColor: '#7ea57f',
    },
    seasonText: { fontSize: 14, color: '#333' },
    seasonTextSelected: { fontWeight: '700', color: '#3b5a2b' },

    modalOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        maxHeight: '80%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    modalGroup: {
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 5,
        color: '#555',
    },
    modalOption: {
        paddingVertical: 10,
        paddingLeft: 20,
    },
    modalOptionText: {
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonDisabled: {
        backgroundColor: '#ccc',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});