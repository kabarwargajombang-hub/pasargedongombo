// ====================================
// Pasar Gedongombo Framework v2
// app.js
// ====================================

document.addEventListener("DOMContentLoaded", () => {

    // Memberi tanda halaman aktif di navbar
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".bottom-nav a").forEach(link => {

        const href = link.getAttribute("href");

        if(href === currentPage){

            link.classList.add("active");

        }

    });

});
