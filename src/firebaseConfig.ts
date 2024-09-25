// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhLBW2KtA-pWQCBd-7lNmn0cMrMo6LmHI",
  authDomain: "leaderboard-4c74e.firebaseapp.com",
  projectId: "leaderboard-4c74e",
  storageBucket: "leaderboard-4c74e.appspot.com",
  messagingSenderId: "1000632850492",
  appId: "1:1000632850492:web:25a26386fde469db618b39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
