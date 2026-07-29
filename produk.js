import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const daftarProduk = document.getElementById("daftarProduk");
const cariProduk = document.getElementById("cariProduk");

// Menyimpan semua produk
let semuaProduk = [];

// Ambil produk dari Firebase
async function ambilProduk(){

try{

const querySnapshot = await getDocs(collection(db,"produk"));

semuaProduk = [];

querySnapshot.forEach((item)=>{

semuaProduk.push({

id:item.id,

...item.data()

});

});

tampilkanProduk(semuaProduk);

}catch(error){

console.log(error);

daftarProduk.innerHTML="<p>Gagal mengambil produk.</p>";

}

}

// Menampilkan produk
function tampilkanProduk(data){

daftarProduk.innerHTML="";

if(data.length==0){

daftarProduk.innerHTML="<p>Tidak ada produk ditemukan.</p>";

return;

}

data.forEach((produk)=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="https://picsum.photos/600/350">

<h3>${produk.namaProduk}</h3>

<div style="font-weight:bold;color:#198754;">
🏪 ${produk.namaToko || "Penjual Gedongombo"}
</div>

<div class="harga">
Rp${Number(produk.harga).toLocaleString("id-ID")}
</div>

<div class="stok">
Stok : ${produk.stok}
</div>

<p>
${produk.deskripsi || "-"}
</p>

<a
href="detailproduk.html?id=${produk.id}"
style="
display:block;
margin-top:10px;
background:#0d6efd;
color:white;
padding:12px;
border-radius:10px;
text-align:center;
text-decoration:none;
font-weight:bold;
">

👀 Lihat Detail

</a>

<a
class="wa"
href="https://wa.me/${produk.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(produk.namaProduk)}">

💬 Chat WhatsApp

</a>

`;

daftarProduk.appendChild(card);

});

}

// Pencarian realtime
cariProduk.addEventListener("input",()=>{

const kata = cariProduk.value.toLowerCase();

const hasil = semuaProduk.filter((produk)=>{

return (

produk.namaProduk.toLowerCase().includes(kata) ||

(produk.namaToko || "").toLowerCase().includes(kata) ||

(produk.kategori || "").toLowerCase().includes(kata)

);

});

tampilkanProduk(hasil);

});

// Jalankan
ambilProduk();
