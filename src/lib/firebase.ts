import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA9h-2Fyt6W8oqrOm4OlnFg5ig9XpCgKQo",
    authDomain: "app-data-1d033.firebaseapp.com",
    projectId: "app-data-1d033",
    storageBucket: "app-data-1d033.firebasestorage.app",
    messagingSenderId: "668866652969",
    appId: "1:668866652969:web:5383ec3fc2e83e0020a538",
    measurementId: "G-BP6KC0Q0KS",
    databaseURL: "https://app-data-1d033-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
