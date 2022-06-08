// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGIh2QKGW3NWbN8dHFAigvBD7kDfhfEvI",
  authDomain: "keyboard-project-99647.firebaseapp.com",
  projectId: "keyboard-project-99647",
  storageBucket: "keyboard-project-99647.appspot.com",
  messagingSenderId: "549585944374",
  appId: "1:549585944374:web:dea0ae8426dd1698a77d97",
  measurementId: "G-SHBH75Y2XY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();
const analytics = getAnalytics(app);

export { app, storage }