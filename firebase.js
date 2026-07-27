// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAzFM43yBxV2NRuHvg3JhMyS-WANtS-ZQ",
  authDomain: "pasar-gedongombo.firebaseapp.com",
  projectId: "pasar-gedongombo",
  storageBucket: "pasar-gedongombo.firebasestorage.app",
  messagingSenderId: "211293292214",
  appId: "1:211293292214:web:64e4d52ce570ad3c560817"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Database Firestore
const db = getFirestore(app);

export { auth, db };
