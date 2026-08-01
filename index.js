// ==========================================
// PASAR GEDONGOMBO
// index.js Framework v1
// Search Produk
// ==========================================

// Ambil elemen
const cariProduk = document.getElementById("cariProduk");
const btnCari = document.getElementById("btnCari");

// Jalankan pencarian
function jalankanPencarian(){

const keyword =
cariProduk.value.toLowerCase().trim();

const semuaProduk =
document.querySelectorAll(".card");

semuaProduk.forEach((card)=>{

const teks =
card.innerText.toLowerCase();

if(teks.includes(keyword)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

// Klik tombol Search
btnCari.addEventListener("click",()=>{

jalankanPencarian();

});

// Ketik langsung
cariProduk.addEventListener("input",()=>{

jalankanPencarian();

});

// Tekan Enter
cariProduk.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

jalankanPencarian();

}

});
