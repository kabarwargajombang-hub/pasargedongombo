// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v4
// Kategori Produk Pembeli
// ==========================================


import { db } from "./firebase.js";


import {
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const tombolKategori = document.querySelectorAll(".item");

const hasilProduk = document.getElementById("hasilProduk");




// Tampilkan produk kategori

async function tampilkanProduk(kategori){


try{


const q = query(

collection(db,"produk"),

where("kategori","==",kategori)

);



const hasil = await getDocs(q);



hasilProduk.innerHTML = "";



if(hasil.empty){


hasilProduk.innerHTML = `

<div class="produk">

<p>
Belum ada produk kategori ${kategori}
</p>

</div>

`;

return;


}





hasil.forEach((item)=>{


const produk = item.data();


const idProduk = item.id;



hasilProduk.innerHTML += `


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

📦 Lihat Detail

</a>



</div>


`;



});



}

catch(error){


console.log(error);


hasilProduk.innerHTML =

"Gagal mengambil produk";


}



}





// Klik kategori

tombolKategori.forEach((btn)=>{


btn.addEventListener("click",()=>{


const kategori = btn.dataset.kategori;


tampilkanProduk(kategori);


});


});
