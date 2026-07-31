// ==========================================
// PASAR GEDONGOMBO
// toko.js FINAL
// Menampilkan Profil Toko + Produk Toko
// ==========================================


import { db } from "./firebase.js";


import {
collection,
getDocs,
doc,
getDoc,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// Ambil UID toko dari URL

const urlParams = new URLSearchParams(
window.location.search
);


const uidToko = urlParams.get("uid");





// Element halaman

const namaToko = document.getElementById("namaToko");

const pemilik = document.getElementById("pemilik");

const whatsapp = document.getElementById("whatsapp");

const jumlahProdukTampil = document.getElementById("jumlahProduk");

const produkToko = document.getElementById("produkToko");





let nomorWA = "";





// ================================
// TAMPILKAN DATA TOKO
// ================================

async function tampilkanToko(){


try{


if(!uidToko){

namaToko.innerHTML =
"🏪 Pasar Gedongombo";


pemilik.innerHTML =
"Tempat Belanja Produk Lokal";


return;

}




const tokoRef = doc(
db,
"toko",
uidToko
);



const tokoSnap = await getDoc(tokoRef);



if(tokoSnap.exists()){


const data = tokoSnap.data();



namaToko.innerHTML =

"🏪 " + 
(data.namaToko || "Toko Gedongombo");



pemilik.innerHTML =

"👤 " +
(data.namaPemilik || "-");



nomorWA = data.whatsapp || "";



nomorWA = nomorWA.replace(/\D/g,"");



if(nomorWA.startsWith("0")){


nomorWA =
"62" + nomorWA.substring(1);


}



whatsapp.innerHTML =

"📱 " + nomorWA;



}



}


catch(error){

console.log(error);

}


}








// ================================
// TAMPILKAN PRODUK TOKO
// ================================

async function tampilkanProduk(){


try{


const q = query(

collection(db,"produk"),

where(
"uidPenjual",
"==",
uidToko
)

);



const hasil = await getDocs(q);



produkToko.innerHTML = "";



let jumlahProduk = 0;





if(hasil.empty){


produkToko.innerHTML =

`
<p>
Belum ada produk.
</p>
`;


jumlahProdukTampil.innerHTML =

"📦 Jumlah Produk: 0";


return;


}







hasil.forEach((item)=>{


jumlahProduk++;


const produk = item.data();


const idProduk = item.id;






produkToko.innerHTML += `


<div class="produk-toko">



<img 

src="${produk.foto || 'https://picsum.photos/600/350'}"

>




<h3>

${produk.namaProduk}

</h3>





<div class="harga">

Rp${Number(produk.harga)
.toLocaleString("id-ID")}

</div>





<p class="stok">

📦 Stok : ${produk.stok}

</p>





<a

class="detail"

href="./detailproduk.html?id=${idProduk}"

>

👁️ Lihat Produk

</a>





<a

class="wa"

href="https://wa.me/${nomorWA}?text=${encodeURIComponent(

"Halo, saya tertarik dengan produk " +

produk.namaProduk +

" di Pasar Gedongombo."

)}"

>

💬 Chat WhatsApp

</a>




</div>



`;



});






jumlahProdukTampil.innerHTML =

"📦 Jumlah Produk: " + jumlahProduk;



}



catch(error){


console.log(error);



produkToko.innerHTML =

"Gagal mengambil produk";


}



}






await tampilkanToko();


tampilkanProduk();
