// // backend/server.js
// // import { initializeApp } from 'firebase/app';
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// // let db = require("./firebase");
// const { getFirestore } = require("firebase/firestore");
// const { initializeApp } = require("firebase/app");

// const app = initializeApp(firebaseConfig);
// app = express();
// app.use(cors());
// app.use(bodyParser.json());
// const db = getFirestore(app);

// // Endpoint to save user data
// app.post("/submit", async (req, res) => {
//   const { name, socialHandle, images } = req.body;
//   try {
//     const newUserRef = db.collection("users").doc();
//     await newUserRef.set({
//       name,
//       socialHandle,
//       images,
//     });
//     res.status(200).send("Data submitted successfully.");
//   } catch (error) {
//     res.status(500).send("Error submitting data.");
//   }
// });

// // Endpoint to get all user data
// app.get("/users", async (req, res) => {
//   try {
//     const snapshot = await db.collection("users").get();
//     const users = snapshot.docs.map(doc => doc.data());
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).send("Error fetching data.");
//   }
// });

// // Start server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { initializeApp } = require("firebase/app");
// const { getFirestore, collection, addDoc, getDocs } = require("firebase/firestore");

// // Import Firebase configuration
// const firebaseConfig = require("./firebaseConfig");

// // Initialize Firebase and Firestore
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint to save user data
// app.post("/submit", async (req, res) => {
//   const { name, socialHandle, images } = req.body;

//   try {
//     const usersCollection = collection(db, "users");
//     await addDoc(usersCollection, {
//       name,
//       socialHandle,
//       images,
//     });

//     res.status(200).send("Data submitted successfully.");
//   } catch (error) {
//     console.error("Error submitting data:", error);
//     res.status(500).send("Error submitting data.");
//   }
// });

// // Endpoint to get all user data
// app.get("/users", async (req, res) => {
//   try {
//     const usersCollection = collection(db, "users");
//     const snapshot = await getDocs(usersCollection);

//     const users = snapshot.docs.map((doc) => doc.data());
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data.");
//   }
// });

// // Start the server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const { initializeApp } = require("firebase/app");
// const { getFirestore, collection, addDoc, getDocs } = require("firebase/firestore");

// // Import Firebase configuration
// const firebaseConfig = require("./firebaseConfig");

// // Initialize Firebase and Firestore
// const firebaseApp = initializeApp(firebaseConfig); // Properly initialize with config
// const db = getFirestore(firebaseApp);

// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint to save user data
// app.post("/submit", async (req, res) => {
//   const { name, socialHandle, images } = req.body;

//   try {
//     const usersCollection = collection(db, "users");
//     await addDoc(usersCollection, {
//       name,
//       socialHandle,
//       images,
//     });

//     res.status(200).send("Data submitted successfully.");
//   } catch (error) {
//     console.error("Error submitting data:", error);
//     res.status(500).send("Error submitting data.");
//   }
// });

// // Endpoint to get all user data
// app.get("/users", async (req, res) => {
//   try {
//     const usersCollection = collection(db, "users");
//     const snapshot = await getDocs(usersCollection);

//     const users = snapshot.docs.map((doc) => doc.data());
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data.");
//   }
// });

// // Start the server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
// const { initializeApp } = require("firebase/app");
// const { getFirestore, collection, addDoc, getDocs } = require("firebase/firestore");

// Import Firebase configuration
// const firebaseConfig = require("./firebaseConfig");

// Initialize Firebase and Firestore
// const firebaseApp = initializeApp(firebaseConfig); // Properly initialize with config
// const db = getFirestore(firebaseApp);

const { firebaseDatabase } = require("./firebaseConfig");


const { v2 } = require('cloudinary');
const { ref, set, child, get } = require("firebase/database");

const {v4} = require('uuid')



// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up Multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid duplicates
//   }
// });
const upload = multer();

// Create the 'uploads' directory if it doesn't exist
// const fs = require("fs");
// const uploadsDir = "uploads";
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// Configuration
v2.config({
  cloud_name: 'dpnggb1nr',
  api_key: '826974797752421',
  api_secret: 'wu_mFrnzgLRibr485bFQvHgd1SQ' // Click 'View API Keys' above to copy your API secret
});

async function handleUpload(file) {
  const res = await v2.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

// Endpoint to save user data with image upload
app.post("/submit", upload.single("images"), async (req, res) => {
  const { name, socialHandle } = req.body;
  // const images = req.files ? req.files.map(file => file.path) : []; // Save file paths  

  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
  
    const profileData = {
      uuid: v4(),
      name,
      socialHandle,
      imageURL: cldRes.url
    }
  
    const reference = ref(firebaseDatabase, "users/" + profileData.uuid)
    set(reference, profileData)

    console.log("profile saved successfully")

    res.status(200).send({message: "User profile saved successfully."})
  } catch(e){
    console.log(e)
    res.status(500).send({message: "Something went wrong. Please, contact Yashmit Raj."})
  }
});

// Endpoint to get all user data
app.get("/users", async (req, res) => {
  try {
    dbRef = ref(firebaseDatabase)
    let allUsers = []
    const snapshots = await get(child(dbRef, "users/"));
    
    if (snapshots.exists()) {
      snapshots.forEach((user) => {
        allUsers.push(user.val());
      });
    }
    console.log("fetched all users")    
    res.status(200).send(allUsers)
  } catch (error) {
    console.log(error)
    res.status(500).send({message: "Something went wrong. Please, contact Yashmit Raj."})
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
