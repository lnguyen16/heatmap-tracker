// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Create firebase instances with error handling
let db: any;
let auth: any;
let firebaseInitialized = false;

try {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Get Firestore instance
  db = getFirestore(app);
  
  // Get Auth instance
  auth = getAuth(app);
  
  firebaseInitialized = true;
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  // Create mock objects to prevent further errors
  db = {};
  auth = { currentUser: null };
  firebaseInitialized = false;
}

export { db, auth, firebaseInitialized };