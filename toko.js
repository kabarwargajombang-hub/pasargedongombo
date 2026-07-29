import { db } from "./firebase.js";


import {

collection,

getDocs,

doc,

getDoc,

query,

where

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// Ambil UID dari URL

const urlParams = new URLSearchParams(window.location.search);

const uidToko = urlParams.get("uid");



// Element HTML

const namaToko = document.getElementById("namaToko");

const pemilik = document.getElementById("pemilik");

const whatsapp = document.getElementById("whatsapp");

const jumlahProdukTampil = document.getElementById("jumlahProduk");

const produkToko = document.getElementById("produkToko");





// Tampilkan data toko

async function tampilkanToko(){


try{


const tokoRef = doc(db,"toko",uidToko);


const tokoSnap = await getDoc(tokoRef);



if(tokoSnap.exists()){


const data = tokoSnap.data();



namaToko.innerHTML =

"🏪 " + (data.namaToko || "Toko Gedongombo");



pemilik.innerHTML =

"👤 " + (data.namaPemilik || "-");



whatsapp.innerHTML =

"📱 " + (data.whatsapp || "-");



}


}

catch(error){

console.log(error);

}


}





// Tampilkan produk toko

async function tampilkanProduk(){


try{


const q = query(

collection(db,"produk"),

where("uidPenjual","==",uidToko)

);



const hasil = await getDocs(q);



produkToko.innerHTML="";



let jumlahProduk = 0;



if(hasil.empty){


produkToko.innerHTML=

"<p>Belum ada produk.</p>";


jumlahProdukTampil.innerHTML=

"📦 Jumlah Produk: 0";


return;


}




hasil.forEach((item)=>{


jumlahProduk++;


const produk = item.data();



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

Stok : ${produk.stok}

</p>



<a class="wa"

href="https://wa.me/${produk.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(produk.namaProduk)}">

💬 Chat WhatsApp

</a>


</div>


`;


});




jumlahProdukTampil.innerHTML=

"📦 Jumlah Produk: " + jumlahProduk;



}


catch(error){

console.log(error);

produkToko.innerHTML=

"Gagal mengambil produk";

}


}





tampilkanToko();

tampilkanProduk();
