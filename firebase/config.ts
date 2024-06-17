import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "###",
  authDomain: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###",
  appId: "###",
  measurementId: "###",
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true
})
export const auth = getAuth(app)
export const authProvider = new GoogleAuthProvider()
<<<<<<< HEAD
export const db = getFirestore(app)
=======
>>>>>>> 3645811cc20d50b0096a0778fad5ade045659ab6
