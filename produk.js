import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
getDoc,
query,
orderBy,
limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const daftarProduk = document.getElementById("daftarProduk");
const produkTerlaris =
document.getElementById("produkTerlaris");
const cariProduk = document.getElementById("cariProduk");
const tombolKategori = document.querySelectorAll(".kategori");


let semuaProduk = [];

let kategoriAktif = "Semua";



// Format nomor WhatsApp Indonesia

function formatNomorWA(nomor){

nomor = nomor.replace(/\D/g,"");


if(nomor.startsWith("0")){

nomor = "62" + nomor.substring(1);

}


return nomor;

}





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


// =========================
// PRODUK PALING DIMINATI
// =========================

async function tampilkanProdukTerlaris(){

try{


const q = query(

collection(db,"produk"),

orderBy("klikWA","desc"),

limit(5)

);



const hasil =
await getDocs(q);



produkTerlaris.innerHTML="";



hasil.forEach((item)=>{


const produk =
item.data();



produkTerlaris.innerHTML += `


<div class="populer-card">


<img
src="${produk.foto || 'https://picsum.photos/100'}"
>


<div class="populer-info">

<h4>

${produk.namaProduk}

</h4>


<p>

💬 ${produk.klikWA || 0} peminat

</p>


</div>


</div>


`;


});



}

catch(error){

console.log(error);

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


daftarProduk.innerHTML =
"<p>Gagal mengambil produk.</p>";


}


}


// =========================
// HITUNG KLIK WHATSAPP
// =========================

async function tambahKlikWA(idProduk){

try{

await updateDoc(

doc(db,"produk",idProduk),

{

klikWA: increment(1)

}

);

}

catch(error){

console.log(error);

}

}



// Menampilkan produk

async function tampilkanProduk(data){


daftarProduk.innerHTML="";



if(data.length==0){


daftarProduk.innerHTML =
"<p>Tidak ada produk.</p>";


return;


}





for(const produk of data){



let nomorWA = await ambilWhatsAppToko(produk.uidPenjual);


nomorWA = formatNomorWA(nomorWA);




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
href="#"
data-id="${produk.id}"
data-wa="${nomorWA}"
data-produk="${produk.namaProduk}">

💬 Chat WhatsApp

</a>




`;



daftarProduk.appendChild(card);
const tombolWA = card.querySelector(".wa");

tombolWA.addEventListener("click", async(e)=>{

e.preventDefault();

await tambahKlikWA(produk.id);

const url =
`https://wa.me/${nomorWA}?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(produk.namaProduk)}`;

window.open(url,"_blank");

});

}



}







// Filter produk

function filterProduk(){


const kata=cariProduk.value.toLowerCase();



const hasil=semuaProduk.filter((produk)=>{


const cocokCari =

produk.namaProduk.toLowerCase().includes(kata) ||

(produk.namaToko || "").toLowerCase().includes(kata);




const cocokKategori =

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


kategoriAktif = btn.dataset.kategori;


filterProduk();


});


});






// Jalankan

ambilProduk();
tampilkanProdukTerlaris();
