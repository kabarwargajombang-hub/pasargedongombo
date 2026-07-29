import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const daftarProduk = document.getElementById("daftarProduk");
const cariProduk = document.getElementById("cariProduk");
const tombolKategori = document.querySelectorAll(".kategori");


let semuaProduk = [];

let kategoriAktif = "Semua";



// Ambil WhatsApp dari toko

async function ambilWhatsAppToko(uidPenjual){

try{

const tokoRef = doc(db,"toko",uidPenjual);

const tokoSnap = await getDoc(tokoRef);


if(tokoSnap.exists()){

return tokoSnap.data().whatsapp || "";

}

return "";

}

catch(error){

console.log(error);

return "";

}

}





// Ambil data produk

async function ambilProduk(){


try{


const querySnapshot = await getDocs(collection(db,"produk"));


semuaProduk=[];


querySnapshot.forEach((item)=>{


semuaProduk.push({

id:item.id,

...item.data()

});


});


filterProduk();



}

catch(error){


console.log(error);


daftarProduk.innerHTML=
"<p>Gagal mengambil produk.</p>";


}


}






// Menampilkan produk

async function tampilkanProduk(data){


daftarProduk.innerHTML="";


if(data.length==0){


daftarProduk.innerHTML=
"<p>Tidak ada produk.</p>";


return;


}




for(const produk of data){



const nomorWA = await ambilWhatsAppToko(produk.uidPenjual);



const card=document.createElement("div");


card.className="card";



card.innerHTML=`

<img
src="${produk.foto || 'https://picsum.photos/600/350'}"
alt="${produk.namaProduk}"
style="
width:100%;
height:220px;
object-fit:cover;
border-radius:10px;
">



<h3>${produk.namaProduk}</h3>



<a
href="toko.html?uid=${produk.uidPenjual}"
style="
display:block;
font-weight:bold;
color:#198754;
text-decoration:none;
margin-top:5px;
">

🏪 ${produk.namaToko || "Toko Gedongombo"}

</a>




<div class="harga">

Rp${Number(produk.harga).toLocaleString("id-ID")}

</div>




<div class="stok">

Stok : ${produk.stok}

</div>




<p>${produk.deskripsi || "-"}</p>





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
href="https://wa.me/${nomorWA}?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(produk.namaProduk)}">

💬 Chat WhatsApp

</a>




`;


daftarProduk.appendChild(card);


}



}





// Filter

function filterProduk(){


const kata=cariProduk.value.toLowerCase();



const hasil=semuaProduk.filter((produk)=>{



const cocokCari=

produk.namaProduk.toLowerCase().includes(kata) ||

(produk.namaToko || "").toLowerCase().includes(kata);





const cocokKategori=

kategoriAktif=="Semua" ||

produk.kategori===kategoriAktif;



return cocokCari && cocokKategori;



});



tampilkanProduk(hasil);



}






// Pencarian

cariProduk.addEventListener("input",filterProduk);





// Kategori

tombolKategori.forEach((btn)=>{


btn.addEventListener("click",()=>{


kategoriAktif=btn.dataset.kategori;


filterProduk();



});


});





// Jalankan

ambilProduk();
