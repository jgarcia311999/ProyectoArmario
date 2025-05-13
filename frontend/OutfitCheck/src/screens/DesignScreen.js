import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { removeBackground } from '../utils/removeBackground';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import 'moment/locale/es';
import { encode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

const wardrobes = ['Habitación', 'Cajón cama', 'Armario alto'];

export default function DesignScreen({ closet, onReviewStart, onClearCloset }) {
    const navigation = useNavigation();
    const [selectedType, setSelectedType] = useState('Todos');
    const [now, setNow] = useState(moment());

    useEffect(() => {
        moment.locale('es');
        const interval = setInterval(() => {
            setNow(moment());
        }, 60000); // Actualiza cada minuto
        return () => clearInterval(interval);
    }, []);

    const handleUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permiso denegado');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            navigation.navigate('GalleryScreen', { reviewImage: uri });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Encabezado */}
                <View style={styles.headerRow}>
                    <Text style={styles.greeting}>
                        Hola, <Text style={styles.username}>@jgarcia</Text>
                    </Text>
                    <View style={styles.avatarCircle}>
                        <Image
                            source={require('../../assets/avatar.jpeg')}
                            style={styles.avatar}
                        />
                    </View>
                </View>

                {/* Fecha y hora */}
                <View style={styles.datetimeCard}>
                    <View style={styles.dateSection}>
                        <Text style={styles.month}>{now.format('MMMM').toUpperCase()}</Text>
                        <View style={styles.dayRow}>
                            <View style={styles.dayWrapper}>
                                <Text style={styles.day}>{now.format('D')}</Text>
                            </View>
                            <View style={styles.weekdayWrapper}>
                                <Text style={styles.weekday}>{now.format('dddd').toUpperCase()}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.timeSection}>
                        <Text style={styles.time}>{now.format('HH:mm')}</Text>
                    </View>
                </View>

                {/* Botones de tipo prenda */}
                <View style={styles.wardrobeRow}>
                    <View style={styles.fixedButtons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconText}>🔍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconText}>🎯</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconText}>＋</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        {wardrobes.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.wardrobeButton,
                                    selectedType === item && styles.wardrobeButtonActive
                                ]}
                                onPress={() => setSelectedType(item)}
                            >
                                <Text
                                    style={[
                                        styles.wardrobeButtonText,
                                        selectedType === item && styles.wardrobeButtonTextActive
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Cuadrícula de prendas */}
                <View style={styles.grid}>
                    {closet?.length > 0 ? (
                        closet.map((item, index) => (
                            <View key={index} style={styles.gridItem}>
                                <Image source={{ uri: item.image }} style={styles.gridImage} />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No hay prendas todavía</Text>
                    )}
                </View>
            </ScrollView>

            {/* Botones flotantes */}
            <TouchableOpacity style={styles.fab} onPress={handleUpload}>
                <Text style={styles.fabIcon}>＋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={() => onClearCloset()}>
                <Text style={styles.clearIcon}>－</Text>
            </TouchableOpacity>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f4f3',
    },
    container: {
        padding: 20,
        backgroundColor: 'transparent',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    username: {
        color: '#007AFF',
    },
    avatarCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    datetimeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dateSection: {
        flex: 1,
    },
    month: {
        fontSize: 16,
        fontWeight: '500',
        color: '#888',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    dayWrapper: {
    },
    weekdayWrapper: {
    },
    day: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 6,
    },
    weekday: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textTransform: 'uppercase',
    },
    timeSection: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 50,
        fontWeight: '600',
        color: '#000',
    },
    location: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    scrollContainer: {
        flexDirection: 'row',
        gap: 0,
    },
    wardrobeRow: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    wardrobeButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'transparent',
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    wardrobeButtonActive: {
        backgroundColor: '#000',
    },
    wardrobeButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    wardrobeButtonTextActive: {
        color: '#fff',
    },
    settingsButton: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#eee',
    },
    settingsIcon: {
        fontSize: 18,
    },
    buttonRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    fixedButtons: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        color: '#000',
        fontSize: 18,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    gridItem: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 15,
        borderRadius: 16,
        overflow: 'hidden',
    },
    gridImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    fabIcon: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '600',
    },
    clearButton: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    clearIcon: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '600',
    },
});