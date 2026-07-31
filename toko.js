import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const produkToko = document.getElementById("produkToko");

const jumlahProdukTampil = document.getElementById("jumlahProduk");

const namaToko = document.getElementById("namaToko");
const pemilik = document.getElementById("pemilik");
const whatsapp = document.getElementById("whatsapp");



async function tampilkanSemuaProduk(){


try{


const hasil = await getDocs(
collection(db,"produk")
);


produkToko.innerHTML="";


let jumlah = 0;



if(hasil.empty){


produkToko.innerHTML =
"<p>Belum ada produk.</p>";


return;


}




hasil.forEach((item)=>{


jumlah++;


const produk = item.data();


const idProduk = item.id;




produkToko.innerHTML += `


<div class="produk">


<img src="${produk.foto || 'https://picsum.photos/600/350'}">


<h3>
${produk.namaProduk}
</h3>



<div class="harga">

Rp${Number(produk.harga).toLocaleString("id-ID")}

</div>



<p>

🏪 Toko:
${produk.namaToko || "-"}

</p>



<p>

📦 Stok:
${produk.stok}

</p>



<a
class="btn"
href="detailproduk.html?id=${idProduk}">
📦 Lihat Detail Produk
</a>



</div>


`;



});



jumlahProdukTampil.innerHTML =
"📦 Jumlah Produk: " + jumlah;



namaToko.innerHTML =
"🛒 Pasar Gedongombo";


pemilik.innerHTML =
"Tempat Belanja Produk Lokal";


whatsapp.innerHTML =
"";


}


catch(error){


console.log(error);


produkToko.innerHTML =
"Gagal mengambil produk";


}


}



tampilkanSemuaProduk();
