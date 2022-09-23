// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from '@firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5uNOE-gkzu9ef2Ty9VX_UeFr-b0MaXao",
  authDomain: "aplicativo-projete.firebaseapp.com",
  projectId: "aplicativo-projete",
  storageBucket: "aplicativo-projete.appspot.com",
  messagingSenderId: "794833324829",
  appId: "1:794833324829:web:b1b4217575171554466ff4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const firebaseAuth = getAuth(app)
