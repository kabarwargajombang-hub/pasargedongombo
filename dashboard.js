import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tempatProduk = document.getElementById("produkSaya");
const jumlahProduk = document.getElementById("jumlahProduk");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    // Ambil hanya produk milik penjual yang sedang login
    const q = query(
      collection(db, "produk"),
      where("uidPenjual", "==", user.uid)
    );

    const hasil = await getDocs(q);

    tempatProduk.innerHTML = "";

    jumlahProduk.textContent = hasil.size;

    if (hasil.empty) {

      tempatProduk.innerHTML = `
      <p class="info">
      Belum ada produk.
      </p>
      `;

      return;
    }

    hasil.forEach((item) => {

      const produk = item.data();

      tempatProduk.innerHTML += `

      <div class="card">

      <h3>${produk.namaProduk}</h3>

      <p><b>Harga :</b> Rp${Number(produk.harga).toLocaleString("id-ID")}</p>

      <p><b>Stok :</b> ${produk.stok}</p>

      <p><b>Kategori :</b> ${produk.kategori}</p>

      <p><b>Nama Toko :</b> ${produk.namaToko}</p>

      <a
href="editproduk.html?id=${item.id}"
style="
display:block;
text-decoration:none;
background:#0d6efd;
color:white;
padding:12px;
border-radius:10px;
text-align:center;
font-weight:bold;
margin-top:10px;
">

✏️ Edit Produk

</a>

<button
class="hapusProduk"
data-id="${item.id}"
style="
width:100%;
margin-top:10px;
background:#dc3545;
color:white;
padding:12px;
border:none;
border-radius:10px;
font-weight:bold;
">

🗑️ Hapus Produk

</button>

      </div>

      `;

    });

    // Event tombol hapus
    document.querySelectorAll(".hapusProduk").forEach((btn) => {

      btn.addEventListener("click", async () => {

        const yakin = confirm("Yakin ingin menghapus produk ini?");

        if (!yakin) return;

        try {

          await deleteDoc(doc(db, "produk", btn.dataset.id));

          alert("Produk berhasil dihapus");

          location.reload();

        } catch (error) {

          alert("Gagal menghapus produk");

          console.log(error);

        }

      });

    });

  } catch (error) {

    console.log(error);

    tempatProduk.innerHTML = `
    <p class="info">
    Gagal mengambil data produk.
    </p>
    `;

  }

});
