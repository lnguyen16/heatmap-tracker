import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD45P1YhaCwZOjiddodOM0fbkAwSVY49vo",
    authDomain: "heatmap-tracker.firebaseapp.com",
    projectId: "heatmap-tracker",
    storageBucket: "heatmap-tracker.firebasestorage.app",
    messagingSenderId: "550298165891",
    appId: "1:550298165891:web:b8a63d8db66e35fa8cf1b6",
    measurementId: "G-5582XYYXRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
