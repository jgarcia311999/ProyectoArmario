# 👗 OutfitCheck

OutfitCheck es una app móvil desarrollada con **React Native** y **Expo** que permite a los usuarios:
- Subir fotos de su ropa
- Quitar el fondo automáticamente
- Guardar las prendas en un armario virtual
- Visualizar su galería de prendas

---

## 📦 Tecnologías utilizadas

- React Native (Expo)
- Firebase (Authentication y futuro uso de Firestore/Storage)
- Remove.bg API (para quitar fondos)
- React Navigation
- Expo Image Picker

---

## 🚀 Instalación del proyecto

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tu-usuario/OutfitCheck.git
   cd OutfitCheck
   ```

2. **Instalar dependencias**  
   Asegúrate de tener `node`, `npm`, y `expo-cli` instalados:
   ```bash
   npm install
   ```

3. **Instalar dependencias nativas si usas Yarn** (opcional)
   ```bash
   yarn
   ```

---

## 🔑 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Activa **Authentication (email/password)** y **Firestore**
3. Crea un archivo `src/firebase/firebaseConfig.js` con tu configuración:

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🧪 Correr la app en desarrollo

```bash
npx expo start
```

Escanea el QR con Expo Go o usa un emulador iOS/Android.

---

## 📂 Estructura de carpetas

```
OutfitCheck/
├── App.js
├── assets/
├── src/
│   ├── firebase/
│   │   └── firebaseConfig.js
│   ├── navigation/
│   │   └── MainTabs.js
│   ├── screens/
│   │   ├── GalleryScreen.js
│   │   └── UploadScreen.js
│   └── utils/
│       └── removeBackground.js
```

---

## ✨ Próximos pasos

- Soporte para múltiples armarios
- Categorías y filtros de prendas
- Login con redes sociales
- Almacenamiento en la nube con Firebase Storage

---

## 👨‍💻 Autor

Desarrollado por Jesús García Alemany

---
