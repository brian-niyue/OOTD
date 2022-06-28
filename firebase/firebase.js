// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2kS0FmV23chgufapxK9ulWgI5fPaPJd0",
  authDomain: "ootd-54c2e.firebaseapp.com",
  projectId: "ootd-54c2e",
  storageBucket: "ootd-54c2e.appspot.com",
  messagingSenderId: "432502100164",
  appId: "1:432502100164:web:ca0dd45816f4f53c61b991",
  measurementId: "G-FCS6LLRX8D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase();
