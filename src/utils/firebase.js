// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR2hAKfuzLAQyFUqudr6L9Sh0KGjNQhjs",
  authDomain: "ulcerave.firebaseapp.com",
  projectId: "ulcerave",
  storageBucket: "ulcerave.appspot.com",
  messagingSenderId: "461999149169",
  appId: "1:461999149169:web:0eed1ff9e94f9d84714bd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(app);
