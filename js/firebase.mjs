
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getStorage   } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCiCxXejZ_zs1QnfF-ZoDk4Z5UoYkZKdAE",
    authDomain: "chat-app-aa86d.firebaseapp.com",
    projectId: "chat-app-aa86d",
    storageBucket: "chat-app-aa86d.appspot.com",
    messagingSenderId: "982077547100",
    appId: "1:982077547100:web:d7d7a6eef6b2e99376fc99",
    measurementId: "G-EHVHZ64RKD"
  };

  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);



