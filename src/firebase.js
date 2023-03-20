import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEJs4z6Gq6NNk20RK5F8-lZKR0iNn8ELw",
  authDomain: "v3form.firebaseapp.com",
  projectId: "v3form",
  storageBucket: "v3form.appspot.com",
  messagingSenderId: "1059872482879",
  appId: "1:1059872482879:web:66a875059b536a4771fa8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db } ;