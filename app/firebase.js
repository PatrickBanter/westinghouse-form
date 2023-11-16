import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0jRUqSN2vK3AjwxksvaRa9YtAyNhlAQk",
  authDomain: "westinghouse-entry.firebaseapp.com",
  projectId: "westinghouse-entry",
  storageBucket: "westinghouse-entry.appspot.com",
  messagingSenderId: "861160858844",
  appId: "1:861160858844:web:8e5b771a27ed6b6a0c0019"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };