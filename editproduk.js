// ==========================================
// PASAR GEDONGOMBO
// editproduk.js FINAL
// Edit Produk + Edit Foto Produk
// ==========================================


import { db } from "./firebase.js";


import {
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// ==========================
// AMBIL ID PRODUK
// ==========================

const params =
new URLSearchParams(window.location.search);


const id =
params.get("id");



if(!id){

alert("Produk tidak ditemukan");

window.location.href="dashboard.html";

}



// ==========================
// ELEMENT
// ==========================


const namaProduk =
document.getElementById("namaProduk");


const kategori =
document.getElementById("kategori");


const harga =
document.getElementById("harga");


const stok =
document.getElementById("stok");


const deskripsi =
document.getElementById("deskripsi");



const fotoProduk =
document.getElementById("fotoProduk");


const previewFoto =
document.getElementById("previewFoto");


const btnFoto =
document.getElementById("btnFoto");


const statusFoto =
document.getElementById("statusFoto");



const tombolUpdate =
document.getElementById("updateProduk");



let fotoBaru = null;

let fotoLama = "";



// ==========================
// PILIH FOTO
// ==========================


if(btnFoto){


btnFoto.addEventListener("click",()=>{


fotoProduk.click();


});


}




if(fotoProduk){


fotoProduk.addEventListener("change",()=>{


const file =
fotoProduk.files[0];


if(!file)return;



fotoBaru = file;



previewFoto.src =
URL.createObjectURL(file);



btnFoto.innerHTML =
"📷 Ganti Foto Lagi";



statusFoto.innerHTML =
"✅ Foto baru dipilih";



});


}



// ==========================
// AMBIL DATA PRODUK
// ==========================


const ref =
doc(db,"produk",id);



const snap =
await getDoc(ref);



if(snap.exists()){


const data =
snap.data();



namaProduk.value =
data.namaProduk || "";



kategori.value =
data.kategori || "";



harga.value =
data.harga || "";



stok.value =
data.stok || "";



deskripsi.value =
data.deskripsi || "";



fotoLama =
data.foto || "";



if(fotoLama && previewFoto){


previewFoto.src =
fotoLama;


statusFoto.innerHTML =
"✅ Foto produk aktif";


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
// UPDATE PRODUK
// ==========================


tombolUpdate.addEventListener("click",async()=>{


try{


let urlFoto =
fotoLama;



// Jika pilih foto baru

if(fotoBaru){


urlFoto =
await uploadFoto(fotoBaru);


}




await updateDoc(

ref,

{


namaProduk:
namaProduk.value,


kategori:
kategori.value,


harga:
Number(harga.value),


stok:
Number(stok.value),


deskripsi:
deskripsi.value,


foto:
urlFoto



}

);





alert("Produk berhasil diperbarui");



window.location.href =
"dashboard.html";



}

catch(error){


alert(

"Gagal memperbarui produk: "

+ error.message

);


}



});
