import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const fotoProduk = document.getElementById("fotoProduk");

const previewFoto = document.getElementById("previewFoto");

fotoProduk.addEventListener("change", () => {

const file = fotoProduk.files[0];

if(file){

previewFoto.src = URL.createObjectURL(file);

previewFoto.style.display = "block";

}

});

const tombol = document.getElementById("simpanProduk");


tombol.addEventListener("click", async()=>{


const user = auth.currentUser;


if(!user){

alert("Silakan login terlebih dahulu");

return;

}


// Ambil data toko penjual

const tokoRef = doc(db,"toko",user.uid);

const tokoSnap = await getDoc(tokoRef);


let dataToko = {};


if(tokoSnap.exists()){

dataToko = tokoSnap.data();

}



const namaProduk = document.getElementById("namaProduk").value;

const harga = document.getElementById("harga").value;

const stok = document.getElementById("stok").value;

const kategori = document.getElementById("kategori").value;

const deskripsi = document.getElementById("deskripsi").value;



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


namaToko:dataToko.namaToko || "",

whatsapp:dataToko.whatsapp || "",

pemilik:dataToko.namaPemilik || "",


uidPenjual:user.uid,


tanggal:new Date()


});



alert("Produk berhasil ditambahkan");


window.location.reload();


}


catch(error){


alert(error.message);


}


});
