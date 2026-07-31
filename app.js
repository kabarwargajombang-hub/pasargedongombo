// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v2
// app.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const menuJual = document.getElementById("menuJual");
    const menuAkun = document.getElementById("menuAkun");

    if(menuJual){
        menuJual.addEventListener("click", function(e){
            e.preventDefault();
            window.location.href = "login.html";
        });
    }

    if(menuAkun){
        menuAkun.addEventListener("click", function(e){
            e.preventDefault();
            window.location.href = "login.html";
        });
    }

});
