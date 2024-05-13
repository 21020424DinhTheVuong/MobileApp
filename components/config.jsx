// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhMzmTktqV6LLK4uvk1NwdrAyLkBG6Mpw",
    authDomain: "weather-28a3a.firebaseapp.com",
    projectId: "weather-28a3a",
    storageBucket: "weather-28a3a.appspot.com",
    messagingSenderId: "666693287962",
    appId: "1:666693287962:web:8ec11032fc11fbc63f11a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);