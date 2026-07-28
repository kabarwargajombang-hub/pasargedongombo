// login.js

import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Ambil tombol login

const tombolMasuk = document.getElementById("masuk");


tombolMasuk.addEventListener("click", async function(){


const email = document.getElementById("email").value;

const password = document.getElementById("password").value;



if(email === "" || password === ""){

alert("Email dan password harus diisi");

return;

}



try{


await signInWithEmailAndPassword(
auth,
email,
password
);



alert("Login berhasil!");


// pindah ke dashboard

window.location.href="dashboard.html";



}

catch(error){


alert("Login gagal: " + error.message);


}



});
