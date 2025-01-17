// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");

// const firebaseConfig = {
//   apiKey: "AIzaSyDv_xqiIOUZRZQRvw-wUQ7mzfdb-tRgpDU",
//   authDomain: "social-media-task-1cfad.firebaseapp.com",
//   projectId: "social-media-task-1cfad",
//   storageBucket: "social-media-task-1cfad.appspot.com",
//   messagingSenderId: "35194442655",
//   appId: "1:35194442655:web:6be9ce293179cec7e3a3aa",
//   measurementId: "G-PSHRFXBFDH",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// module.exports = db; // Export Firestore instance for use in server.js



// backend/firebaseConfig.js
// const { initializeApp, getApps } = require("firebase/app");

// // Firebase configuration object
// const firebaseConfig = {
//   apiKey: "AIzaSyDv_xqiIOUZRZQRvw-wUQ7mzfdb-tRgpDU",
//   authDomain: "social-media-task-1cfad.firebaseapp.com",
//   projectId: "social-media-task-1cfad",
//   storageBucket: "social-media-task-1cfad.appspot.com",
//   messagingSenderId: "35194442655",
//   appId: "1:35194442655:web:6be9ce293179cec7e3a3aa",
//   measurementId: "G-PSHRFXBFDH",
// };

// // Initialize Firebase only if no apps are initialized
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// module.exports = app;



// firebaseConfig.js
// module.exports = {
    // apiKey: "AIzaSyDv_xqiIOUZRZQRvw-wUQ7mzfdb-tRgpDU",
    // authDomain: "social-media-task-1cfad.firebaseapp.com",
    // projectId: "social-media-task-1cfad",
    // storageBucket: "social-media-task-1cfad.appspot.com",
    // messagingSenderId: "35194442655",
    // appId: "1:35194442655:web:6be9ce293179cec7e3a3aa",
    // measurementId: "G-PSHRFXBFDH",
//   };
  








import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv_xqiIOUZRZQRvw-wUQ7mzfdb-tRgpDU",
  authDomain: "social-media-task-1cfad.firebaseapp.com",
  projectId: "social-media-task-1cfad",
  storageBucket: "social-media-task-1cfad.appspot.com",
  messagingSenderId: "35194442655",
  appId: "1:35194442655:web:6be9ce293179cec7e3a3aa",
  measurementId: "G-PSHRFXBFDH",
  databaseURL: "https://social-media-task-1cfad-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const firebaseApplication = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase();

export {firebaseDatabase };