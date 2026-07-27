import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const tombolDaftar = document.getElementById("daftar");

tombolDaftar.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Email dan Password wajib diisi.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    alert("Pendaftaran berhasil!");

    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }

});
