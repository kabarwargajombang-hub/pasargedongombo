const currentPage = window.location.pathname.split("/").pop();

let menu = `
<footer class="bottom-nav">

<a href="index.html" ${currentPage=="index.html"||currentPage==""?'style="color:#0d6efd"':''}>
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

<a href="tentang.html" ${currentPage=="tentang.html"?'style="color:#0d6efd"':''}>
ℹ️<br>Tentang
</a>

</footer>
`;

document.write(menu);
