import { db } from "./firebase.js";

import {
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Ambil id produk dari URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Jika id tidak ada, kembali ke dashboard
if (!id) {
    alert("Produk tidak ditemukan");
    window.location.href = "dashboard.html";
}

// Ambil data produk
const ref = doc(db, "produk", id);
const snap = await getDoc(ref);

if (snap.exists()) {

    const data = snap.data();

    document.getElementById("namaProduk").value = data.namaProduk || "";
    document.getElementById("kategori").value = data.kategori || "";
    document.getElementById("harga").value = data.harga || "";
    document.getElementById("stok").value = data.stok || "";
    document.getElementById("deskripsi").value = data.deskripsi || "";

}

// Tombol simpan
document.getElementById("updateProduk").addEventListener("click", async () => {

    await updateDoc(ref, {

        namaProduk: document.getElementById("namaProduk").value,

        kategori: document.getElementById("kategori").value,

        harga: Number(document.getElementById("harga").value),

        stok: Number(document.getElementById("stok").value),

        deskripsi: document.getElementById("deskripsi").value

    });

    alert("Produk berhasil diperbarui");

    window.location.href = "dashboard.html";

});
