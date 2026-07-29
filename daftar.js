import { auth, db } from "./firebase.js";


import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const tombolDaftar = document.getElementById("daftar");



tombolDaftar.addEventListener("click", async()=>{



const namaPemilik =
document.getElementById("namaPemilik").value;


const namaToko =
document.getElementById("namaToko").value;


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;


const whatsapp =
document.getElementById("whatsapp").value;


const dusun =
document.getElementById("dusun").value;


const rtRw =
document.getElementById("rtRw").value;


const desa =
document.getElementById("desa").value;




if(

namaPemilik=="" ||
namaToko=="" ||
email=="" ||
password=="" ||
whatsapp=="" ||
dusun==""

){


alert("Lengkapi data pendaftaran");


return;


}




try{



// Buat akun

const hasil =
await createUserWithEmailAndPassword(
auth,
email,
password
);



const user = hasil.user;




// Simpan profil toko


await setDoc(

doc(db,"toko",user.uid),

{


namaPemilik:namaPemilik,


namaToko:namaToko,


whatsapp:whatsapp,


dusun:dusun,


rtRw:rtRw,


desa:desa,


alamat:
dusun + " RT/RW " + rtRw + " Desa " + desa,


email:email,


deskripsi:""


}

);





alert("Pendaftaran berhasil");



window.location.href="dashboard.html";



}



catch(error){


alert(

"Gagal daftar: " + error.message

);


}



});
