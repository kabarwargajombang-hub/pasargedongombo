import { db } from "./firebase.js";

import { 
collection, 
addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const tombol = document.getElementById("simpanProduk");


tombol.addEventListener("click", async()=>{


const namaProduk = document.getElementById("namaProduk").value;

const harga = document.getElementById("harga").value;

const stok = document.getElementById("stok").value;

const kategori = document.getElementById("kategori").value;

const deskripsi = document.getElementById("deskripsi").value;



if(
namaProduk=="" ||
harga=="" ||
stok=="" ||
kategori==""
){

alert("Mohon lengkapi data produk");

return;

}



try{


await addDoc(collection(db,"produk"),{


namaProduk:namaProduk,

harga:Number(harga),

stok:Number(stok),

kategori:kategori,

deskripsi:deskripsi,

tanggal:new Date()


});



alert("Produk berhasil ditambahkan");


document.getElementById("namaProduk").value="";

document.getElementById("harga").value="";

document.getElementById("stok").value="";

document.getElementById("kategori").value="";

document.getElementById("deskripsi").value="";


}

catch(error){

alert("Gagal menambahkan produk : "+error.message);

}


});
