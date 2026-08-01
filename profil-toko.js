// ==========================================
// PASAR GEDONGOMBO
// profil-toko.js FINAL v2
// Edit Profil + Foto Profil
// ==========================================


import { auth, db } from "./firebase.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// ==========================
// ELEMENT
// ==========================

const fotoProfil =
document.getElementById("fotoProfil");


const previewFoto =
document.getElementById("previewFoto");


const btnFoto =
document.getElementById("btnFoto");


const statusFoto =
document.getElementById("statusFoto");


const tombolSimpan =
document.getElementById("simpan");



let userAktif = null;

let fotoBaru = null;




// ==========================
// PILIH FOTO
// ==========================

btnFoto.addEventListener("click",()=>{

fotoProfil.click();

});




fotoProfil.addEventListener("change",()=>{


const file = fotoProfil.files[0];


if(!file)return;


fotoBaru = file;


previewFoto.src =
URL.createObjectURL(file);



btnFoto.innerHTML =
"📷 Ganti Foto Lagi";


statusFoto.innerHTML =
"✅ Foto berhasil dipilih";


});






// ==========================
// CEK LOGIN
// ==========================


onAuthStateChanged(auth,async(user)=>{


if(!user){


alert("Silakan login terlebih dahulu");

window.location.href="login.html";

return;


}



userAktif=user;



ambilProfilToko(user.uid);



});







// ==========================
// AMBIL DATA TOKO
// ==========================


async function ambilProfilToko(uid){



const ref =
doc(db,"toko",uid);



const snap =
await getDoc(ref);



if(snap.exists()){


const data =
snap.data();



document.getElementById("namaToko").value =
data.namaToko || "";



document.getElementById("namaPemilik").value =
data.namaPemilik || "";



document.getElementById("whatsapp").value =
data.whatsapp || "";



document.getElementById("dusun").value =
data.dusun || "";



document.getElementById("rtRw").value =
data.rtRw || "";



document.getElementById("desa").value =
data.desa || "";



document.getElementById("alamat").value =
data.alamat || "";



document.getElementById("deskripsi").value =
data.deskripsi || "";




// tampilkan foto lama

if(data.fotoProfil){


previewFoto.src =
data.fotoProfil;


statusFoto.innerHTML =
"✅ Foto profil aktif";


}


}



}







// ==========================
// UPLOAD CLOUDINARY
// ==========================


async function uploadFoto(file){



const formData =
new FormData();



formData.append(
"file",
file
);



formData.append(
"upload_preset",
"pasar_gedongombo"
);



const response =
await fetch(

"https://api.cloudinary.com/v1_1/pthqkjlo/image/upload",

{

method:"POST",

body:formData

}

);



const hasil =
await response.json();



return hasil.secure_url;



}








// ==========================
// SIMPAN PROFIL
// ==========================


tombolSimpan.addEventListener("click",async()=>{



if(!userAktif){


alert("User belum aktif");


return;


}




try{



let urlFoto = "";



// jika memilih foto baru

if(fotoBaru){


urlFoto =
await uploadFoto(fotoBaru);


}





const dataLamaRef =
doc(
db,
"toko",
userAktif.uid
);



const dataLama =
await getDoc(dataLamaRef);



let fotoLama = "";



if(dataLama.exists()){


fotoLama =
dataLama.data().fotoProfil || "";


}




await setDoc(

dataLamaRef,

{


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
userAktif.email,


fotoProfil:
urlFoto || fotoLama


},


{
merge:true
}

);





alert("Profil toko berhasil diperbarui");


window.location.href="dashboard.html";



}

catch(error){


alert(

"Gagal menyimpan: "

+ error.message

);


}



});
