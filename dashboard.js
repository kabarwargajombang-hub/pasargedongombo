import { auth, db } from "./firebase.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
collection,
getDocs,
deleteDoc,
doc,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const tempatProduk = document.getElementById("produkSaya");

const jumlahProduk = document.getElementById("jumlahProduk");




// Proteksi login

onAuthStateChanged(auth, async(user)=>{


if(!user){

alert("Silakan login terlebih dahulu");

window.location.href="login.html";

return;

}



tampilkanProduk(user.uid);



});





// Tampilkan produk milik user

async function tampilkanProduk(uid){


try{


const q = query(

collection(db,"produk"),

where("uidPenjual","==",uid)

);



const hasil = await getDocs(q);



tempatProduk.innerHTML="";



let jumlah = 0;




hasil.forEach((item)=>{


jumlah++;


const produk = item.data();



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



<button 
class="hapusProduk"
data-id="${item.id}">

🗑️ Hapus Produk

</button>


</div>


`;



});




jumlahProduk.innerHTML = jumlah;



if(jumlah==0){


tempatProduk.innerHTML=

`
<p class="info">

Belum ada produk.

</p>
`;


}




// tombol hapus

const tombolHapus = document.querySelectorAll(".hapusProduk");



tombolHapus.forEach((btn)=>{


btn.addEventListener("click",async()=>{


const id = btn.dataset.id;



const yakin = confirm("Hapus produk ini?");



if(!yakin){

return;

}



await deleteDoc(doc(db,"produk",id));



alert("Produk berhasil dihapus");



location.reload();



});



});





}

catch(error){


console.log(error);


tempatProduk.innerHTML=

"Gagal mengambil data";


}



}
