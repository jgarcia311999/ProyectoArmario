import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAratWuBFcHoLYxMqOAb7GAWEp2UHqxJJg",
  authDomain: "outfitcheck-18408.firebaseapp.com",
  projectId: "outfitcheck-18408",
  storageBucket: "outfitcheck-18408.appspot.com",
  messagingSenderId: "461057803122",
  appId: "1:461057803122:web:16bbf9df806f8f8a2453eb"
};

const app = initializeApp(firebaseConfig);
export const auth = {
  currentUser: null,
};