const fotoProfil =
document.getElementById("fotoProfil");

const previewFoto =
document.getElementById("previewFoto");

const btnFoto =
document.getElementById("btnFoto");

const statusFoto =
document.getElementById("statusFoto");

btnFoto.addEventListener("click",()=>{

fotoProfil.click();

});

fotoProfil.addEventListener("change",()=>{

const file=fotoProfil.files[0];

if(!file)return;

previewFoto.src=URL.createObjectURL(file);

btnFoto.innerHTML="📷 Ganti Foto Lagi";

statusFoto.innerHTML="✅ Foto berhasil dipilih";

});

// profil-toko.js


import { auth, db } from "./firebase.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// Proteksi login

let userAktif = null;



onAuthStateChanged(auth,(user)=>{


if(!user){


alert("Silakan login terlebih dahulu");


window.location.href="login.html";


return;


}



userAktif = user;



});







// Tombol simpan

const tombolSimpan = document.getElementById("simpan");



if(tombolSimpan){


tombolSimpan.addEventListener("click", async()=>{



const user = auth.currentUser;



if(!user){


alert("Anda belum login");


window.location.href="login.html";


return;


}





const dataToko = {



namaToko:

document.getElementById("namaToko").value,




namaPemilik:

document.getElementById("namaPemilik").value,




whatsapp:

document.getElementById("whatsapp").value,




dusun:

document.getElementById("dusun").value,




rtRw:

document.getElementById("rtRw").value,




desa:

document.getElementById("desa").value,




alamat:

document.getElementById("alamat").value,




deskripsi:

document.getElementById("deskripsi").value,




email:

user.email



};






try{



await setDoc(

doc(db,"toko",user.uid),

dataToko

);




alert("Profil toko berhasil disimpan");



window.location.href="dashboard.html";



}



catch(error){



alert(

"Gagal menyimpan: "

+ error.message

);



}



});



}
