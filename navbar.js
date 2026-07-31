// ==========================================
// PASAR GEDONGOMBO FRAMEWORK v4
// Navbar Global
// ==========================================

const currentPage = window.location.pathname.split("/").pop();

const navbar = `
<footer class="bottom-nav">

<a href="index.html" class="${currentPage === "index.html" || currentPage === "" ? "active" : ""}">
🏠<br>Beranda
</a>

<a href="index.html#kategori">
📂<br>Kategori
</a>

<a href="tambahproduk.html">
➕<br>Jual
</a>

<a href="dashboard.html">
👤<br>Akun
</a>

<a href="tentang.html" class="${currentPage === "tentang.html" ? "active" : ""}">
ℹ️<br>Tentang
</a>

</footer>
`;

document.body.insertAdjacentHTML("beforeend", navbar);
