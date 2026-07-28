import { auth, db } from "./firebase.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const tempatProduk = document.getElementById("produkSaya");



onAuthStateChanged(auth, async(user)=>{


if(!user){

alert("Silakan login terlebih dahulu");

window.location.href="login.html";

return;

}



try{


const q = query(

collection(db,"produk"),

where("uidPenjual","==",user.uid)

);



const hasil = await getDocs(q);



tempatProduk.innerHTML="";



if(hasil.empty){


tempatProduk.innerHTML=

`
<p class="info">
Belum ada produk.
</p>
`;


return;


}



hasil.forEach((doc)=>{


const produk = doc.data();



tempatProduk.innerHTML += `


<div class="card">


<h3>
${produk.namaProduk}
</h3>


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



}

catch(error){


console.log(error);


tempatProduk.innerHTML =
"<p>Gagal mengambil produk</p>";


}



});
