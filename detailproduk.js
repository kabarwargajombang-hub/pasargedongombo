import { db } from "./firebase.js";


import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// Ambil ID produk dari URL

const params = new URLSearchParams(
window.location.search
);


const id = params.get("id");



if(!id){


alert("Produk tidak ditemukan");


window.location.href="index.html";


}





// Ambil data produk

const produkRef = doc(
db,
"produk",
id
);



const produkSnap = await getDoc(produkRef);





if(produkSnap.exists()){



const data = produkSnap.data();




// Tampilkan produk


document.getElementById("namaProduk").textContent =
data.namaProduk;



document.getElementById("harga").textContent =
"Rp" + Number(data.harga)
.toLocaleString("id-ID");



document.getElementById("stok").textContent =
data.stok;



document.getElementById("kategori").textContent =
data.kategori;



document.getElementById("namaToko").textContent =
data.namaToko || "Toko Gedongombo";



document.getElementById("pemilik").textContent =
data.pemilik || "-";



document.getElementById("deskripsi").textContent =
data.deskripsi || "-";





// ==============================
// AMBIL DATA TOKO + ALAMAT
// ==============================


let nomorWA = "";

let alamatToko = "-";



if(data.uidPenjual){



const tokoRef = doc(
db,
"toko",
data.uidPenjual
);



const tokoSnap = await getDoc(tokoRef);



if(tokoSnap.exists()){



const toko = tokoSnap.data();



nomorWA = toko.whatsapp || "";



alamatToko = 
toko.alamat || 
(
(toko.dusun || "") +
" RT/RW " +
(toko.rtRw || "") +
" Desa " +
(toko.desa || "")
);



}





}



// Tampilkan alamat

const alamatElement =
document.getElementById("alamat");



if(alamatElement){


alamatElement.textContent =
alamatToko;


}







// Format nomor WhatsApp


nomorWA =
nomorWA.replace(/\D/g,"");



if(nomorWA.startsWith("0")){


nomorWA =
"62" + nomorWA.substring(1);


}






// Tombol WhatsApp


document.getElementById("chatWA").href =


"https://wa.me/" +

nomorWA +

"?text=" +

encodeURIComponent(

"Halo, saya tertarik dengan produk " +

data.namaProduk +

" di Pasar Gedongombo."

);



}





else{


alert("Produk tidak ditemukan");


window.location.href="index.html";


}
