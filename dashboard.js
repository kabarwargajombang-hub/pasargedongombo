import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
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

    const hasil = await getDocs(collection(db, "produk"));

    tempatProduk.innerHTML = "";

    let jumlah = 0;

    hasil.forEach((item) => {

      const produk = item.data();

      jumlah++;

      tempatProduk.innerHTML += `

      <div class="card">

      <h3>${produk.namaProduk}</h3>

      <p><b>Harga :</b> Rp${Number(produk.harga).toLocaleString("id-ID")}</p>

      <p><b>Stok :</b> ${produk.stok}</p>

      <p><b>Kategori :</b> ${produk.kategori}</p>

      <button class="hapusProduk" data-id="${item.id}">
      🗑️ Hapus Produk
      </button>

      </div>

      `;

    });

    jumlahProduk.innerHTML = jumlah;

    if (jumlah === 0) {

      tempatProduk.innerHTML = `
      <p class="info">Belum ada produk.</p>
      `;

    }

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

          console.log(error);

          alert("Gagal menghapus produk");

        }

      });

    });

  } catch (error) {

    console.log(error);

    tempatProduk.innerHTML = "Gagal mengambil data.";

  }

});
