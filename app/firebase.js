// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6tD9Z4lvf_B3mqQ9enEi9EVQX2xWpSCU",
  authDomain: "westinghouse-form.firebaseapp.com",
  projectId: "westinghouse-form",
  storageBucket: "westinghouse-form.appspot.com",
  messagingSenderId: "412027548032",
  appId: "1:412027548032:web:c28ee37bb8e014be94d165",
  measurementId: "G-KJ96EKK150"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };