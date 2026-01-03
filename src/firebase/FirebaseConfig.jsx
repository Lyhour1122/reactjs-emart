import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG91ovbnLP8YqAfK9YSn7xJldux2NmNmE",
  authDomain: "lyhour-59b06.firebaseapp.com",
  projectId: "lyhour-59b06",
  storageBucket: "lyhour-59b06.firebasestorage.app",
  messagingSenderId: "329973569180",
  appId: "1:329973569180:web:1d2f3fda032077cacc7f59",
  measurementId: "G-C7Q4QZ6YMT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const fireDB = getFirestore(app); // ✅ FIXED
