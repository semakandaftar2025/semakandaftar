import { getFirestore, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

const db = getFirestore();

const orderedFields = [
  "id", "icNum", "noTel", "alamat", "emel", "kelulusan", "namaFirma",
  "noPendaftaranFirma", "alamatFirma", "alamatCawangan", "alamatFirmaIbuPejabat",
  "noTelPejabat", "noFax", "emelFirma", "tarikhDiterima", "tempohSijilAmalan",
  "tarikhBatal", "tindakanTatatertib", "butiranLain", "noResit", "noSiriDaftar"
];

const formalLabels = {
  id: "ID",
  nama: "Nama",
  icNum: "No. Kad Pengenalan",
  noTel: "No. Telefon",
  alamat: "Alamat",
  emel: "Emel",
  kelulusan: "Kelulusan",
  namaFirma: "Nama Firma",
  noPendaftaranFirma: "No. Pendaftaran Firma",
  alamatFirma: "Alamat Firma",
  alamatCawangan: "Alamat Cawangan",
  alamatFirmaIbuPejabat: "Alamat Ibu Pejabat",
  noTelPejabat: "No. Telefon Pejabat",
  noFax: "No. Faks",
  emelFirma: "Emel Firma",
  tarikhDiterima: "Tarikh Diterima",
  tempohSijilAmalan: "Tempoh Sijil Amalan",
  tarikhBatal: "Tarikh Pembatalan",
  tindakanTatatertib: "Tindakan Tatatertib",
  butiranLain: "Butiran Lain",
  noResit: "No. Resit",
  noSiriDaftar: "No. Siri Daftar",
  linkGmbr: "Pautan Gambar"
};

// Elements
const modal = document.getElementById("butiranModal");
const overlay = document.getElementById("modalOverlay");
const profileImageContainer = document.getElementById("profileImageContainer");
const profileName = document.getElementById("profileName");
const profileTable = document.getElementById("profileTable");

// Remove modal elements
const removeModal = document.getElementById("removeModal");
const overlayRemove = document.getElementById("modalOverlayRemove");
const closeRemoveModalBtn = document.getElementById("closeRemoveModalBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

const modalEditBtn = document.getElementById('modalEditBtn');

// Open modal and fetch data
document.addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("butiran-btn")) {
    const docId = e.target.getAttribute("data-doc-id");

    // Clear previous content
    profileImageContainer.innerHTML = "";
    profileName.textContent = "";
    profileTable.innerHTML = "";

    try {
      const docRef = doc(db, "peguamsyarie", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Show image if available
        if (data.linkGmbr) {
          const img = document.createElement("img");
          img.src = data.linkGmbr;
          img.alt = "Gambar";
          img.style.maxWidth = "150px";
          img.style.borderRadius = "10px";
          profileImageContainer.style.textAlign = "center";
          profileImageContainer.appendChild(img);

          const linkRow = document.createElement("tr");
          const td = document.createElement("td");
          td.colSpan = 6;
          td.innerHTML = `<strong>${formalLabels["linkGmbr"]}:</strong> <a href="${data["linkGmbr"]}" target="_blank">${data["linkGmbr"]}</a>`;
          linkRow.appendChild(td);
          profileTable.appendChild(linkRow);
        }

        // Show name
        profileName.textContent = data.nama || "-";
        profileName.style.textAlign = "center";
        profileName.style.fontWeight = "bold";
        profileName.style.color = "black";
        profileName.style.marginTop = "10px";

        // Build table rows
        for (let i = 0; i < orderedFields.length; i += 3) {
          const tr = document.createElement("tr");
          const fields = orderedFields.slice(i, i + 3);

          fields.forEach((field) => {
            const tdLabel = document.createElement("td");
            const tdValue = document.createElement("td");

            tdLabel.innerHTML = `<strong>${formalLabels[field] || field}</strong>`;
            tdValue.textContent = data.hasOwnProperty(field) ? data[field] || "-" : "-";

            tr.appendChild(tdLabel);
            tr.appendChild(tdValue);
          });

          profileTable.appendChild(tr);
        }

        document.getElementById("modalRemoveBtn").setAttribute("data-doc-id", docId);
        document.getElementById("modalEditBtn").setAttribute("data-doc-id", docId);


        // Show modal
        modal.style.display = "block";
        overlay.style.display = "block";
      } else {
        alert("Maklumat tidak dijumpai.");
      }
    } catch (error) {
      console.error("Ralat semasa memuat data:", error);
    }
  }
});

// Close modal
document.getElementById("closeModalBtn").addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

// Show remove modal
function showRemoveModal(docId, nama) {
  removeModal.setAttribute("data-doc-id", docId);
  document.getElementById("removeNamaDisplay").textContent = nama;
  document.getElementById("removeDocIdDisplay").textContent = docId;

  removeModal.style.display = "block";
  overlayRemove.style.display = "block";
}

function closeRemoveModal() {
  removeModal.style.display = "none";
  overlayRemove.style.display = "none";
  removeModal.removeAttribute("data-doc-id");
  document.getElementById("removeNamaDisplay").textContent = "";
  document.getElementById("removeDocIdDisplay").textContent = "";
}

closeRemoveModalBtn.addEventListener("click", closeRemoveModal);
cancelDeleteBtn.addEventListener("click", closeRemoveModal);
overlayRemove.addEventListener("click", closeRemoveModal);

// Confirm delete
confirmDeleteBtn.addEventListener("click", async () => {
  const docId = removeModal.getAttribute("data-doc-id");
  if (docId) {
    try {
      await deleteDoc(doc(db, "peguamsyarie", docId));
      alert("Maklumat peguam berjaya dipadam.");
      location.reload();
    } catch (error) {
      console.error("Gagal memadam dokumen:", error);
      alert("Gagal memadam dokumen.");
    }
    closeRemoveModal();
  }
});

// Open remove modal on button click
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const docId = e.target.getAttribute("data-doc-id");

    if (!docId) {
      alert("ID dokumen tidak sah.");
      return;
    }

    try {
      const docRef = doc(db, "peguamsyarie", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const nama = data.nama || "-";
        showRemoveModal(docId, nama);
      } else {
        alert("Maklumat peguam tidak dijumpai.");
      }
    } catch (error) {
      console.error("Ralat semasa mengambil maklumat peguam:", error);
      alert("Ralat semasa mengambil maklumat.");
    }
  }
});

modalEditBtn.addEventListener('click', function () {
  const docId = this.getAttribute('data-doc-id');
  if (!docId) {
    alert('❗ Doc ID tidak tersedia untuk suntingan.');
    return;
  }
  // Redirect to your edit page with docId in URL query parameter
  window.location.href = `edit_form.html?docId=${docId}`;
});

// // Handle close button click
// document.querySelector(".close-edit-form").addEventListener("click", () => {
//   history.back();
// });

// document.querySelector(".close-form").addEventListener("click", () => {
//   history.back();
// });
