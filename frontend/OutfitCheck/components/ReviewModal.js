import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const attributeFields = [
    { key: 'category', label: 'Categoría' },
    { key: 'color', label: 'Color' },
    { key: 'season', label: 'Temporada' },
    { key: 'style', label: 'Estilo' },
    { key: 'material', label: 'Material' }
];

export default function ReviewModal({ visible, imageUri, onSave, onClose }) {
    const [attributes, setAttributes] = useState({});
    const [activeField, setActiveField] = useState(null);
    const [selectorVisible, setSelectorVisible] = useState(false);

    const options = {
        category: ['Camisetas', 'Camisas', 'Pantalones', 'Shorts', 'Faldas', 'Chaquetas', 'Abrigos', 'Zapatos', 'Accesorios', 'Vestidos'],
        color: ['Blanco', 'Negro', 'Beige', 'Azul', 'Rojo'],
        season: ['Verano', 'Invierno', 'Entretiempo'],
        style: ['Casual', 'Elegante', 'Deportivo', 'Urbano'],
        material: ['Algodón', 'Pana', 'Lana', 'Sintético', 'Denim']
    };

    const handleSelect = (field, value) => {
        setAttributes(prev => ({ ...prev, [field]: value }));
        setSelectorVisible(false);
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
            <View style={styles.fullContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Revisar prenda</Text>
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

                    {attributeFields.map(({ key, label }) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.row}
                            onPress={() => {
                                setActiveField(key);
                                setSelectorVisible(true);
                            }}
                        >
                            <Text style={styles.label}>{label}</Text>
                            <Text style={styles.select}>{attributes[key] || 'Seleccionar'}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity
                    style={[styles.saveButton, !attributes.category && { backgroundColor: '#ccc' }]}
                    disabled={!attributes.category}
                    onPress={() => onSave({ image: imageUri, ...attributes })}
                >
                    <Text style={styles.saveText}>Guardar prenda</Text>
                </TouchableOpacity>

                {/* Selector modal 3/4 pantalla */}
                <Modal visible={selectorVisible} animationType="slide" transparent>
                    <View style={styles.selectorContainer}>
                        {options[activeField]?.map((opt) => (
                            <TouchableOpacity
                                key={opt}
                                style={styles.option}
                                onPress={() => handleSelect(activeField, opt)}
                            >
                                <Text style={styles.optionText}>{opt}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setSelectorVisible(false)}>
                            <Text style={styles.cancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
    scrollContainer: { paddingBottom: 100 },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
    image: { width: '100%', height: 250, borderRadius: 16, marginBottom: 30 },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
    label: { fontSize: 16 },
    select: { fontSize: 16, color: '#007AFF' },
    saveButton: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#007AFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
    saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    selectorContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, maxHeight: '70%' },
    option: { paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
    optionText: { fontSize: 16 },
    cancel: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#007AFF' },
});
