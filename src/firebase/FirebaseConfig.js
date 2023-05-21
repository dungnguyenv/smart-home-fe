// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwwFGgDv-IplfIzjzxnnaGX77pr0_Hpag",
    authDomain: "smart-home-db-8db49.firebaseapp.com",
    databaseURL: "https://smart-home-db-8db49-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-home-db-8db49",
    storageBucket: "smart-home-db-8db49.appspot.com",
    messagingSenderId: "779615527002",
    appId: "1:779615527002:web:279aea78d3b19dcde9b863",
    measurementId: "G-MBL1N02KGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


function writeDataToPath(path, value) {
    set(ref(database, path), value)
        .then(() => {
            console.log("Write data successfully: ", value)
        })
        .catch((error) => {
            console.log("Failed to write data: ", value)
        });
}

function sendLog(value) {
    set(ref(database, "/smart-home/logs/content/" + value.time), value)
        .then(() => {
            console.log("Send log data successfully: ", value)
        })
        .catch((error) => {
            console.log("Failed to send log data: ", value)
        });
}

export { database, writeDataToPath, sendLog };