// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKCnWH73K_oiZ6hn3vp6kUqgs6fC5lO2w",
    authDomain: "esp32-learning.firebaseapp.com",
    databaseURL: "https://esp32-learning-default-rtdb.firebaseio.com",
    projectId: "esp32-learning",
    storageBucket: "esp32-learning.appspot.com",
    messagingSenderId: "228548875525",
    appId: "1:228548875525:web:d95b021e66e7e57028d36c",
    measurementId: "G-N37BCWEFWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };