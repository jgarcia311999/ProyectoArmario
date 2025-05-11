import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { encode } from 'base64-arraybuffer';

const REMOVE_BG_API_KEY = '6gEV236KTnQJLcvff7rzqqyw'; 

export const removeBackground = async (imageUri) => {
    try {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            headers: {
                'X-Api-Key': REMOVE_BG_API_KEY,
            },
            data: {
                image_file_b64: base64,
                size: 'auto',
            },
            responseType: 'arraybuffer',
        });

        const base64Image = encode(response.data);
        const uniqueFilename = `no-bg-${Date.now()}.png`; // ✅ nombre único
        const localUri = `${FileSystem.cacheDirectory}${uniqueFilename}`;

        await FileSystem.writeAsStringAsync(localUri, base64Image, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return localUri;
    } catch (error) {
        console.error('❌ Error al quitar fondo:', error.message);
        throw error;
    }
};