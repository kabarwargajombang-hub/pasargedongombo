import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tombol = document.getElementById("simpanProduk");

const fotoProduk = document.getElementById("fotoProduk");

const previewFoto = document.getElementById("previewFoto");


// Preview Foto

fotoProduk.addEventListener("change",()=>{

const file = fotoProduk.files[0];

if(file){

previewFoto.src = URL.createObjectURL(file);

previewFoto.style.display = "block";

}

});


// Upload ke Cloudinary

async function uploadFoto(file){

const formData = new FormData();

formData.append("file",file);

formData.append("upload_preset","pasar_gedongombo");

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



tombol.addEventListener("click",async()=>{


const user = auth.currentUser;


if(!user){

alert("Silakan login terlebih dahulu");

return;

}


// Upload Foto

let fotoUrl="";


const file = fotoProduk.files[0];


if(file){

fotoUrl = await uploadFoto(file);

}


// Ambil Data Toko

const tokoRef = doc(db,"toko",user.uid);

const tokoSnap = await getDoc(tokoRef);

let dataToko={};

if(tokoSnap.exists()){

dataToko=tokoSnap.data();

}


// Ambil Data Form

const namaProduk=document.getElementById("namaProduk").value;

const harga=document.getElementById("harga").value;

const stok=document.getElementById("stok").value;

const kategori=document.getElementById("kategori").value;

const deskripsi=document.getElementById("deskripsi").value;


// Validasi

if(

namaProduk=="" ||

harga=="" ||

stok==""

){

alert("Lengkapi data produk");

return;

}


try{


await addDoc(collection(db,"produk"),{

namaProduk:namaProduk,

harga:Number(harga),

stok:Number(stok),

kategori:kategori,

deskripsi:deskripsi,

foto:fotoUrl,

namaToko:dataToko.namaToko || "",

whatsapp:dataToko.whatsapp || "",

pemilik:dataToko.namaPemilik || "",

uidPenjual:user.uid,

tanggal:new Date()

});


alert("Produk berhasil ditambahkan");

window.location.href="dashboard.html";


}

catch(error){

alert("Gagal menambahkan produk : "+error.message);

}


});
