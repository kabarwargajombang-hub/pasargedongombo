// firebase.js

// Mengambil fungsi Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
  getAuth 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Konfigurasi Firebase Pasar Gedongombo

const firebaseConfig = {

  apiKey: "AIzaSyAAzFM43yBxV2NRuHvg3JhMyS-WANtS-ZQ",

  authDomain: "pasar-gedongombo.firebaseapp.com",

  projectId: "pasar-gedongombo",

  storageBucket: "pasar-gedongombo.firebasestorage.app",

  messagingSenderId: "211293292214",

  appId: "1:211293292214:web:64e4d52ce570ad3c560817"

};


// Menjalankan Firebase

const app = initializeApp(firebaseConfig);


// Mengaktifkan Authentication

const auth = getAuth(app);


// Mengaktifkan Firestore Database

const db = getFirestore(app);


// Export agar bisa dipakai file lain

export { auth, db };
