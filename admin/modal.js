import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

const db = getFirestore();

// Ordered fields and corresponding formal labels
const orderedFields = [
  "id", "nama", "icNum", "noTel", "alamat", "emel", "kelulusan", "namaFirma",
  "noPendaftaranFirma", "alamatFirma", "alamatCawangan", "alamatFirmaIbuPejabat",
  "noTelPejabat", "noFax", "emelFirma", "tarikhDiterima", "tempohSijilAmalan",
  "tarikhBatal", "tindakanTatatertib", "butiranLain", "linkGmbr", "noResit", "noSiriDaftar"
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
  linkGmbr: "Gambar",
  noResit: "No. Resit",
  noSiriDaftar: "No. Siri Daftar"
};

document.addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("butiran-btn")) {
    const docId = e.target.getAttribute("data-doc-id");
    const modal = document.getElementById("butiranModal");

    // Clear previous content
    const tableHead = document.getElementById("modalTableHead");
    const tableBody = document.getElementById("modalTableBody");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    try {
      const docRef = doc(db, "peguamsyarie", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Create header row with formal labels
        const headerRow = document.createElement("tr");
        orderedFields.forEach(field => {
          const th = document.createElement("th");
          th.textContent = formalLabels[field] || field;
          headerRow.appendChild(th);
        });
        tableHead.appendChild(headerRow);

        // Create value row
        const valueRow = document.createElement("tr");
        orderedFields.forEach(field => {
          const td = document.createElement("td");

          // If field is a URL for image, render image
          if (field === "linkGmbr" && data[field]) {
            const img = document.createElement("img");
            img.src = data[field];
            img.alt = "Gambar";
            img.style.maxWidth = "100px";
            td.appendChild(img);
          } else {
            td.textContent = data[field] || "-";
          }

          valueRow.appendChild(td);
        });
        tableBody.appendChild(valueRow);

        modal.style.display = "block";
      } else {
        alert("Maklumat tidak dijumpai.");
      }
    } catch (error) {
      console.error("Ralat semasa memuat data:", error);
    }
  }
});
