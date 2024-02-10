// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhaXqKgzCVTTjbbm2BnXDRKHqQT-yU28o",
  authDomain: "b-entp.firebaseapp.com",
  projectId: "b-entp",
  storageBucket: "b-entp.appspot.com",
  messagingSenderId: "407487388969",
  appId: "1:407487388969:web:fcdd855324207f7c342b38",
  measurementId: "G-BEEGLFK9EX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth();

const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://b-entp.appspot.com");

export { db, analytics, app, auth, storage };
