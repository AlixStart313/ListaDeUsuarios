// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUq-ir4EKTRQBL_dHwnKux2q2t2_TlmbU",
  authDomain: "repasodsm.firebaseapp.com",
  projectId: "repasodsm",
  storageBucket: "repasodsm.appspot.com",
  messagingSenderId: "137037412791",
  appId: "1:137037412791:web:d4ea703d71780fea181032"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
