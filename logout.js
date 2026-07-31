import { auth } from "./firebase.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const tombolKeluar = document.getElementById("logout");


if(tombolKeluar){

tombolKeluar.addEventListener("click", async()=>{


try{


await signOut(auth);


alert("Berhasil keluar");


window.location.href="index.html";


}

catch(error){

alert("Gagal keluar: " + error.message);

}


});


}
