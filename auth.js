// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v3
// auth.js
// ==========================================

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user)=>{

    if(user){

        window.userLogin = user;

        console.log("Login :", user.email);

    }else{

        window.userLogin = null;

        console.log("Belum Login");

    }

});
