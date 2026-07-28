import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const tempatProduk = document.getElementById("produkSaya");

const jumlahProduk = document.getElementById("jumlahProduk");



onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="login.html";

return;

}


try{


const hasil = await getDocs(collection(db,"produk"));


tempatProduk.innerHTML="";


let jumlah = 0;



hasil.forEach((doc)=>{


const produk = doc.data();


// tampilkan semua produk dulu untuk pengecekan

jumlah++;


tempatProduk.innerHTML += `

<div class="card">

<h3>${produk.namaProduk}</h3>

<p>
Harga:
<b>
Rp${Number(produk.harga).toLocaleString("id-ID")}
</b>
</p>

<p>
Stok:
${produk.stok}
</p>

<p>
Kategori:
${produk.kategori}
</p>


</div>

`;


});



jumlahProduk.innerHTML = jumlah;



if(jumlah==0){

tempatProduk.innerHTML =

`
<p class="info">
Belum ada produk.
</p>
`;

}



}


catch(error){

console.log(error);

tempatProduk.innerHTML =
"Gagal mengambil data";

}


});
