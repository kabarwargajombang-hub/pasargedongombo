// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v4
// Navbar Global Final
// Pembeli & Penjual
// ==========================================


import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const currentPage = window.location.pathname.split("/").pop();



function active(page){

return currentPage === page ? "active" : "";

}




function tampilkanNavbar(user){



let menuKedua = "";

let menuAkun = "";




// Jika penjual login

if(user){


menuKedua = `

<a href="toko.html" class="${active("toko.html")}">

🛒<br>Toko

</a>

`;



menuAkun = `

<a href="dashboard.html" class="${active("dashboard.html")}">

👤<br>Akun

</a>

`;



}


// Jika pembeli

else{


menuKedua = `

<a href="kategori.html">
📂<br>Kategori
</a>

`;



menuAkun = `

<a href="login.html">

👤<br>Akun

</a>

`;



}






const navbar = `

<footer class="bottom-nav">


<a href="index.html" class="${active("index.html")}">

🏠<br>Beranda

</a>



${menuKedua}




<a href="tambahproduk.html">

➕<br>Jual

</a>




${menuAkun}




<a href="tentang.html" class="${active("tentang.html")}">

ℹ️<br>Tentang

</a>



</footer>

`;





document.body.insertAdjacentHTML(

"beforeend",

navbar

);



}




onAuthStateChanged(auth,(user)=>{


tampilkanNavbar(user);


});
