import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYnnKUKl2Rc6hq9Ldks3UvBZUXPiKeGVg",
  authDomain: "curso-78fda.firebaseapp.com",
  projectId: "curso-78fda",
  storageBucket: "curso-78fda.firebasestorage.app",
  messagingSenderId: "176609008833",
  appId: "1:176609008833:web:84984b7de14132fe1ec840",
  measurementId: "G-3RGJSNN0CN",
};

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const auth = getAuth(firebaseapp);

export { db, auth };
