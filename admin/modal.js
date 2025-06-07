import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

const db = getFirestore();

// Move linkGmbr to bottom
const orderedFields = [
  "id", "icNum", "noTel", "alamat", "emel", "kelulusan", "namaFirma",
  "noPendaftaranFirma", "alamatFirma", "alamatCawangan", "alamatFirmaIbuPejabat",
  "noTelPejabat", "noFax", "emelFirma", "tarikhDiterima", "tempohSijilAmalan",
  "tarikhBatal", "tindakanTatatertib", "butiranLain", "noResit", "noSiriDaftar",
  "linkGmbr" // placed at the bottom
];

const formalLabels = {
  linkGmbr: "Pautan Gambar",
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
  noSiriDaftar: "No. Siri Daftar"
};

document.addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("butiran-btn")) {
    const docId = e.target.getAttribute("data-doc-id");
    const modal = document.getElementById("butiranModal");

    const profileImageContainer = document.getElementById("profileImageContainer");
    const profileName = document.getElementById("profileName");
    const profileTable = document.getElementById("profileTable");

    // Clear previous content
    profileImageContainer.innerHTML = "";
    profileName.textContent = "";
    profileTable.innerHTML = "";

    try {
      const docRef = doc(db, "peguamsyarie", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Top profile image
        if (data.linkGmbr) {
          const img = document.createElement("img");
          img.src = data.linkGmbr;
          img.alt = "Gambar";
          img.style.maxWidth = "150px";
          img.style.borderRadius = "10px";
          profileImageContainer.style.textAlign = "center";
          profileImageContainer.appendChild(img);
        }

        // Display name in black, bold, and centered
        profileName.textContent = data.nama || "-";
        profileName.style.textAlign = "center";
        profileName.style.fontWeight = "bold";
        profileName.style.color = "black";
        profileName.style.marginTop = "10px";

        // Table: 3 fields per row
        for (let i = 0; i < orderedFields.length; i += 3) {
          const tr = document.createElement("tr");
          const fields = orderedFields.slice(i, i + 3);

          if (fields.includes("linkGmbr")) {
            // Only show if data exists
            if (data.linkGmbr) {
              const td = document.createElement("td");
              td.colSpan = 6;
              td.innerHTML = `<strong>${formalLabels["linkGmbr"]}:</strong> <a href="${data["linkGmbr"]}" target="_blank">${data["linkGmbr"]}</a>`;
              tr.appendChild(td);
              profileTable.appendChild(tr);
            }
          } else {
            for (const field of fields) {
              if (field) {
                const tdLabel = document.createElement("td");
                const tdValue = document.createElement("td");

                tdLabel.innerHTML = `<strong>${formalLabels[field]}</strong>`;
                tdValue.textContent = data[field] || "-";

                tr.appendChild(tdLabel);
                tr.appendChild(tdValue);
              }
            }
            profileTable.appendChild(tr);
          }
        }

        modal.style.display = "block";
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
  document.getElementById("butiranModal").style.display = "none";
});

// Close modal on outside click
document.getElementById("butiranModal").addEventListener("click", function (e) {
  const modalContent = document.getElementById("modalContent");
  if (!modalContent.contains(e.target)) {
    this.style.display = "none";
  }
});

