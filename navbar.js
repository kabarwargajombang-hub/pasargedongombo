// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v4
// Navbar Global
// ==========================================

const currentPage = window.location.pathname.split("/").pop();

function active(page){
    return currentPage === page ? "active" : "";
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

<a href="dashboard.html" class="${active("dashboard.html")}">
👤<br>Akun
</a>

<a href="tentang.html" class="${active("tentang.html")}">
ℹ️<br>Tentang
</a>

</footer>
`;

document.body.insertAdjacentHTML("beforeend", navbar);
