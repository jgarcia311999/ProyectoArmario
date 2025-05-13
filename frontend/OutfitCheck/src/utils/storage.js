import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'closet_items'; // renombrado por claridad

/**
 * Guarda el array de imágenes en almacenamiento local
 * @param {string[]} closet - Lista de URIs de imágenes
 */

export const saveCloset = async (closet) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(closet));
    } catch (e) {
        console.error('❌ Error guardando closet:', e);
    }
  };

/**
 * Carga el array de imágenes desde almacenamiento local
 * @returns {Promise<string[]>} - Lista de URIs de imágenes
 */
export const loadCloset = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('❌ Error cargando closet:', e);
        return [];
    }
  };