// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v3
// app.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

const menuJual = document.getElementById("menuJual");
const menuAkun = document.getElementById("menuAkun");

// cek status login
const statusLogin = localStorage.getItem("statusLogin");

// =============================
// MENU JUAL
// =============================
if(menuJual){

menuJual.addEventListener("click", function(e){

e.preventDefault();

if(statusLogin==="login"){

window.location.href="dashboard.html";

}else{

window.location.href="login.html";

}

});

}

// =============================
// MENU AKUN
// =============================
if(menuAkun){

menuAkun.addEventListener("click", function(e){

e.preventDefault();

if(statusLogin==="login"){

window.location.href="dashboard.html";

}else{

window.location.href="login.html";

}

});

}

});
