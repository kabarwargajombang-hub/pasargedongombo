// ==========================================
// PASAR GEDONGOMBO
// toko.js FINAL PERBAIKAN UID
// ==========================================


import { auth, db } from "./firebase.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
collection,
getDocs,
doc,
getDoc,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




// Ambil UID dari URL

const urlParams = new URLSearchParams(
window.location.search
);


let uidToko = urlParams.get("uid");





const namaToko =
document.getElementById("namaToko");

const fotoProfil =
document.getElementById("fotoProfil");

const pemilik =
document.getElementById("pemilik");


const whatsapp =
document.getElementById("whatsapp");


const jumlahProduk =
document.getElementById("jumlahProduk");


const produkToko =
document.getElementById("produkToko");





let nomorWA="";







// Cek login

onAuthStateChanged(auth, async(user)=>{


// Jika tidak ada UID URL
// dan user login = toko sendiri

if(!uidToko && user){


uidToko = user.uid;


}



if(uidToko){


tampilkanToko();

tampilkanProduk();


}



});








// =========================
// DATA TOKO
// =========================

async function tampilkanToko(){


const ref = doc(
db,
"toko",
uidToko
);



const snap = await getDoc(ref);



if(snap.exists()){


const data = snap.data();
// Foto Profil

if(data.fotoProfil){

fotoProfil.src = data.fotoProfil;

}


namaToko.innerHTML =

"🏪 " + 
(data.namaToko || "Toko Gedongombo");



pemilik.innerHTML =

"👤 " +
(data.namaPemilik || "-");



nomorWA = data.whatsapp || "";



nomorWA =
nomorWA.replace(/\D/g,"");



if(nomorWA.startsWith("0")){


nomorWA =
"62"+nomorWA.substring(1);

}



whatsapp.innerHTML =

"📱 "+nomorWA;



}


}









// =========================
// PRODUK TOKO
// =========================

async function tampilkanProduk(){



const q = query(

collection(db,"produk"),

where(
"uidPenjual",
"==",
uidToko
)

);



const hasil = await getDocs(q);



produkToko.innerHTML="";



let jumlah=0;





hasil.forEach((item)=>{


jumlah++;


const produk=item.data();



produkToko.innerHTML += `


<div class="produk-toko">


<img src="${produk.foto || 'https://picsum.photos/600/350'}">


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



<a class="detail"
href="detailproduk.html?id=${item.id}">

👁️ Lihat Produk

</a>


<a class="wa"
href="https://wa.me/${nomorWA}">

💬 Chat WhatsApp

</a>



</div>


`;



});





jumlahProduk.innerHTML =

"📦 Jumlah Produk: "+jumlah;





if(jumlah===0){


produkToko.innerHTML=

"<p>Belum ada produk.</p>";


}


}
