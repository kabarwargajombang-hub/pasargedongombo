import { auth, db } from "./firebase.js";


import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const tombolDaftar = document.getElementById("daftar");
// ==========================
// FOTO PROFIL
// ==========================

const fotoProfil = document.getElementById("fotoProfil");

const previewFoto = document.getElementById("previewFoto");

const btnFoto = document.getElementById("btnFoto");

// ==========================
// PILIH FOTO
// ==========================

btnFoto.addEventListener("click",()=>{

fotoProfil.click();

});

fotoProfil.addEventListener("change",()=>{

const file = fotoProfil.files[0];

if(file){

previewFoto.src = URL.createObjectURL(file);

}

});

// ==========================
// UPLOAD CLOUDINARY
// ==========================

async function uploadFoto(file){

const formData = new FormData();

formData.append("file",file);

formData.append(
"upload_preset",
"pasar_gedongombo"
);

const response = await fetch(

"https://api.cloudinary.com/v1_1/pthqkjlo/image/upload",

{

method:"POST",

body:formData

}

);

const hasil = await response.json();

return hasil.secure_url;

}

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

if(!fotoProfil.files[0]){

alert("Silakan pilih foto profil.");

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
  
// Upload Foto Profil

const fotoUrl = await uploadFoto(

fotoProfil.files[0]

);



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

role:"penjual",

deskripsi:"",

fotoProfil:fotoUrl


}

);





alert("Pendaftaran berhasil");



window.location.href="login.html";



}



catch(error){


alert(

"Gagal daftar: " + error.message

);


}



});
