// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v2
// Navbar Global
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

const currentPage = window.location.pathname.split("/").pop();

const nav = `
<footer class="bottom-nav">

<a href="index.html" class="${currentPage==="index.html"||currentPage===""?"active":""}">
🏠<br>Beranda
</a>

<a href="index.html#kategori">
📂<br>Kategori
</a>

<a href="#" id="menuJual">
➕<br>Jual
</a>

<a href="#" id="menuAkun">
👤<br>Akun
</a>

<a href="tentang.html" class="${currentPage==="tentang.html"?"active":""}">
ℹ️<br>Tentang
</a>

</footer>
`;

const container = document.getElementById("bottom-nav");

if(container){

container.innerHTML = nav;

}

});
