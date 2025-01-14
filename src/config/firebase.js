import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJzzMqjge1JraKYYIHVxwsfBDYdKCCLKo",
  authDomain: "wedding-blessing-7318a.firebaseapp.com",
  projectId: "wedding-blessing-7318a",
  storageBucket: "wedding-blessing-7318a.firebasestorage.app",
  messagingSenderId: "539294773437",
  appId: "1:539294773437:web:944164b4cba6a55322c7d4",
  measurementId: "G-B6P0L1LPPB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
