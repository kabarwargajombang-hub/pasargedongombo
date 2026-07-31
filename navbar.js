// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v4
// Navbar Global Dinamis
// ==========================================


const currentPage = window.location.pathname.split("/").pop();


function active(page){

return currentPage === page ? "active" : "";

}



// Cek status login Firebase

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





function buatNavbar(user){


let menuAkun = "";



if(user){


// Penjual sudah login

menuAkun = `

<a href="dashboard.html" class="${active("dashboard.html")}">

👤<br>Akun

</a>

`;



}

else{


// Konsumen belum login

menuAkun = `

<a href="login.html" class="${active("login.html")}">

🔐<br>Login

</a>

`;



}





const navbar = `

<footer class="bottom-nav">


<a href="index.html" class="${active("index.html")}">

🏠<br>Beranda

</a>



<a href="toko.html" class="${active("toko.html")}">

🛒<br>Toko

</a>




<a href="tambahproduk.html" class="${active("tambahproduk.html")}">

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


buatNavbar(user);


});
