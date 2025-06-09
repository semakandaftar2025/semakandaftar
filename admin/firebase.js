// Import the functions you need from the SDKs you need
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js'
    import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGo7VyWereRHO4UBXn8VH2z56HUzGoAkM",
  authDomain: "semakan-daftar-c9267.firebaseapp.com",
  databaseURL: "https://semakan-daftar-c9267-default-rtdb.firebaseio.com",
  projectId: "semakan-daftar-c9267",
  storageBucket: "semakan-daftar-c9267.appspot.com",
  messagingSenderId: "1090274861346",
  appId: "1:1090274861346:web:a54aef11652f8dcd82057b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ❗️ Prevent form from submitting and refreshing the page
// document.getElementById("myform").addEventListener("submit", function(e) {
//     e.preventDefault();
//   });

// Function to generate random 8-digit ID
function generateRandomID(length = 8) {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
}

// Handle "Hantar" button click
// document.getElementById('hantarBtn').addEventListener('click', async function(e) {
// Submit Form
    document.getElementById("myform").addEventListener("submit", async function (e) {
      e.preventDefault();

      const hantarBtn = document.getElementById("hantarBtn");
      hantarBtn.disabled = true;
      hantarBtn.textContent = "Sedang Hantar...";
      hantarBtn.style.backgroundColor = "#a5b0a6";

      const noID = generateRandomID();
      const formData = {
        id: noID,
        nama: document.getElementById('nama').value,
        icNum: document.getElementById('icNum').value,
        noTel: document.getElementById('noTel').value,
        alamat: document.getElementById('alamat').value,
        emel: document.getElementById('emel').value,
        kelulusan: document.getElementById('kelulusan').value,
        namaFirma: document.getElementById('namaFirma').value,
        noPendaftaranFirma: document.getElementById('noPendaftaranFirma').value,
        alamatFirma: document.getElementById('alamatFirma').value,
        alamatCawangan: document.getElementById('alamatCawangan').value,
        alamatFirmaIbuPejabat: document.getElementById('alamatFirmaIbuPejabat').value,
        noTelPejabat: document.getElementById('noTelPejabat').value,
        noFax: document.getElementById('noFax').value,
        emelFirma: document.getElementById('emelFirma').value,
        tarikhDiterima: document.getElementById('tarikhDiterima').value,
        tempohSijilAmalan: document.getElementById('tempohSijilAmalan').value,
        tarikhBatal: document.getElementById('tarikhBatal').value,
        infoTatatertib: document.getElementById('tindakanTatatertib').value,
        butiranLain: document.getElementById('butiranLain').value,
        linkGmbr: document.getElementById('linkGmbr').value,
        noResit: document.getElementById('noResit').value,
        noSiriDaftar: document.getElementById('noSiriDaftar').value,
        status: document.getElementById('status').value,
        createdAt: new Date().toISOString()
      };

      try {
        const docRef = await addDoc(collection(db, "peguamsyarie"), formData);
        alert("✅ Maklumat berjaya dihantar! ID: " + docRef.id);
        document.getElementById("myform").reset();
      } catch (error) {
        console.error("❌ Ralat semasa menghantar data:", error);
        alert("❌ Gagal menghantar maklumat: " + error.message);
      } finally {
      // Enable the button again regardless of success or failure
      hantarBtn.disabled = false;
      hantarBtn.textContent = "Hantar";
      hantarBtn.style.backgroundColor = "#4CAF50";
    }
    });