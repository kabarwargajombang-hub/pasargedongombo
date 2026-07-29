import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const tombolJual = document.getElementById("menuJual");

const tombolAkun = document.getElementById("menuAkun");


let sudahLogin = false;



onAuthStateChanged(auth,(user)=>{


if(user){

sudahLogin = true;

}else{

sudahLogin = false;

}


});




// Tombol Jual

tombolJual.addEventListener("click",(e)=>{


e.preventDefault();



if(sudahLogin){

window.location.href="tambahproduk.html";


}else{


window.location.href="login.html";


}



});





// Tombol Akun

tombolAkun.addEventListener("click",(e)=>{


e.preventDefault();



if(sudahLogin){


window.location.href="dashboard.html";


}else{


window.location.href="login.html";


}



});
