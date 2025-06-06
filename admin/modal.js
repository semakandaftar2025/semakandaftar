import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

const db = getFirestore();

document.addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("butiran-btn")) {
    const docId = e.target.getAttribute("data-doc-id");
    const modal = document.getElementById("butiranModal");
    const tableBody = document.getElementById("modalTableBody");

    // Clear previous content
    tableBody.innerHTML = "";

    try {
      const docRef = doc(db, "peguamsyarie", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        for (const key in data) {
          const row = document.createElement("tr");
          row.innerHTML = `<td><strong>${key}</strong></td><td>${data[key]}</td>`;
          tableBody.appendChild(row);
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
