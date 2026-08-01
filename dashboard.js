// ==========================================
// PASAR GEDONGOMBO
// dashboard.js Framework v5
// Bagian 1 - Profil & Statistik
// ==========================================

import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
getDocs,
deleteDoc,
doc,
getDoc,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tempatProduk = document.getElementById("produkSaya");
const jumlahProduk = document.getElementById("jumlahProduk");

const fotoProfil = document.getElementById("fotoProfil");
const namaToko = document.getElementById("namaToko");
const namaPemilik = document.getElementById("namaPemilik");
const lokasiToko = document.getElementById("lokasiToko");

onAuthStateChanged(auth, async(user)=>{

if(!user){

alert("Silakan login terlebih dahulu");

window.location.href="login.html";

return;

}

await tampilkanProfil(user.uid);

await tampilkanProduk(user.uid);

});

async function tampilkanProfil(uid){

try{

const ref = doc(db,"toko",uid);

const snap = await getDoc(ref);

if(!snap.exists()) return;

const data = snap.data();

if(data.fotoProfil){

fotoProfil.src = data.fotoProfil;

}

namaToko.innerHTML = data.namaToko || "Nama Toko";

namaPemilik.innerHTML = data.namaPemilik || "-";

lokasiToko.innerHTML =
(data.dusun || "") + ", " + (data.desa || "");

}catch(error){

console.log(error);

}

}


// ==========================================
// TAMPILKAN PRODUK
// ==========================================

async function tampilkanProduk(uid){

try{

const q = query(

collection(db,"produk"),

where("uidPenjual","==",uid)

);

const hasil = await getDocs(q);

tempatProduk.innerHTML="";

let jumlah=0;

hasil.forEach((item)=>{

jumlah++;

const produk=item.data();

tempatProduk.innerHTML += `

<div style="
background:#fff;
border-radius:15px;
overflow:hidden;
box-shadow:0 2px 10px rgba(0,0,0,.12);
margin-bottom:18px;
">

<img
src="${produk.foto || 'https://picsum.photos/600/350'}"
style="
width:100%;
height:180px;
object-fit:cover;
">

<div style="padding:15px;">

<h3 style="
margin-bottom:10px;
color:#198754;
">

${produk.namaProduk}

</h3>

<p style="
font-size:24px;
font-weight:bold;
color:#198754;
margin-bottom:8px;
">

Rp${Number(produk.harga).toLocaleString("id-ID")}

</p>

<p>

📦 Stok : <b>${produk.stok}</b>

</p>

<p>

🏷️ ${produk.kategori || "-"}

</p>

<div style="
display:flex;
gap:10px;
margin-top:15px;
">

<a
href="editproduk.html?id=${item.id}"
style="
flex:1;
background:#0d6efd;
color:white;
padding:12px;
text-align:center;
text-decoration:none;
border-radius:10px;
font-weight:bold;
">

✏ Edit

</a>

<button

class="hapusProduk"

data-id="${item.id}"

style="
flex:1;
background:#dc3545;
color:white;
border:none;
border-radius:10px;
font-weight:bold;
">

🗑 Hapus

</button>

</div>

</div>

</div>

`;

});

jumlahProduk.innerHTML = jumlah;

if(jumlah===0){

tempatProduk.innerHTML=`

<div style="
text-align:center;
padding:30px;
">

<h3>

📦

</h3>

<p>

Belum ada produk.

</p>

</div>

`;

}

const tombolHapus =
document.querySelectorAll(".hapusProduk");

tombolHapus.forEach((btn)=>{

btn.addEventListener("click",async()=>{

const id=btn.dataset.id;

if(!confirm("Hapus produk ini?")) return;

await deleteDoc(doc(db,"produk",id));

alert("Produk berhasil dihapus");

location.reload();

});

});

}

catch(error){

console.log(error);

tempatProduk.innerHTML="Gagal mengambil produk.";

}

}


