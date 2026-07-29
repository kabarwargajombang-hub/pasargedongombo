import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const daftarProduk = document.getElementById("daftarProduk");

async function tampilkanProduk(){

try{

const querySnapshot = await getDocs(collection(db,"produk"));

daftarProduk.innerHTML="";

querySnapshot.forEach((item)=>{

const produk=item.data();

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
href="detailproduk.html?id=${item.id}"
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
catch(error){

console.log(error);

daftarProduk.innerHTML="<p>Gagal mengambil produk.</p>";

}

}

tampilkanProduk();
