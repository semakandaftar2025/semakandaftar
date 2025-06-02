  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBGo7VyWereRHO4UBXn8VH2z56HUzGoAkM",
    authDomain: "semakan-daftar-c9267.firebaseapp.com",
    projectId: "semakan-daftar-c9267",
    storageBucket: "semakan-daftar-c9267.firebasestorage.app",
    messagingSenderId: "1090274861346",
    appId: "1:1090274861346:web:a54aef11652f8dcd82057b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Get a list of cities from your database
    async function getCities(db) {
        const citiesCol = collection(db, 'cities');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
    }
