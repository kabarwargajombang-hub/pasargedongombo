import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Ambil ID produk dari URL
const params = new URLSearchParams(window.location.search);

const id = params.get("id");

if(!id){

alert("Produk tidak ditemukan");

window.location.href="index.html";

}

// Ambil data produk
const ref = doc(db,"produk",id);

const snap = await getDoc(ref);

if(snap.exists()){

const data = snap.data();

document.getElementById("namaProduk").textContent = data.namaProduk;

document.getElementById("harga").textContent =
"Rp" + Number(data.harga).toLocaleString("id-ID");

document.getElementById("stok").textContent = data.stok;

document.getElementById("kategori").textContent = data.kategori;

document.getElementById("namaToko").textContent = data.namaToko;

document.getElementById("pemilik").textContent = data.pemilik;

document.getElementById("deskripsi").textContent =
data.deskripsi || "-";

document.getElementById("chatWA").href =
"https://wa.me/" +
data.whatsapp +
"?text=" +
encodeURIComponent(
"Halo, saya tertarik dengan produk " +
data.namaProduk +
" di Pasar Gedongombo."
);

}else{

alert("Produk tidak ditemukan");

window.location.href="index.html";

}
