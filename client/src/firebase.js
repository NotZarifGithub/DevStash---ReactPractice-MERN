// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "devstash-aaee7.firebaseapp.com",
  projectId: "devstash-aaee7",
  storageBucket: "devstash-aaee7.appspot.com",
  messagingSenderId: "280811487280",
  appId: "1:280811487280:web:75c09174a330e2b9526df5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);