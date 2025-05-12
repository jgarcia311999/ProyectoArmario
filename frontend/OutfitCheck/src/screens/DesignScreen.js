import React, { useState, useEffect } from 'react';
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

const types = ['Todo', 'Camiseta', 'Sudadera', 'Pantalones', 'Camisa', 'Falda'];

export default function DesignScreen() {
    const [selectedType, setSelectedType] = useState('Todo');
    const [now, setNow] = useState(moment());

    useEffect(() => {
        moment.locale('es');
        const interval = setInterval(() => {
            setNow(moment());
        }, 60000); // Actualiza cada minuto
        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Encabezado */}
                <View style={styles.headerRow}>
                    <Text style={styles.greeting}>Hola, <Text style={styles.username}>@jgarcia</Text></Text>
                    <View style={styles.avatarCircle}>
                        <Image
                            source={require('../../assets/user_icon.png')}
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
                <View style={styles.buttonRowContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        {types.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.typeButton,
                                    selectedType === item && styles.typeButtonActive
                                ]}
                                onPress={() => setSelectedType(item)}
                            >
                                <Text
                                    style={[
                                        styles.typeButtonText,
                                        selectedType === item && styles.typeButtonTextActive
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        width: 50,
        height: 50,
        borderRadius: 25,
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
        marginBottom: 30,
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
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 22,
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
        gap: 10,
    },
    typeButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'transparent',
    },
    typeButtonActive: {
        backgroundColor: '#000',
    },
    typeButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    typeButtonTextActive: {
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
});