import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "##############################",
  authDomain: "scalam-fire.firebaseapp.com",
  projectId: "scalam-fire",
  storageBucket: "scalam-fire.appspot.com",
  messagingSenderId: "791843387602",
  appId: "###############################",
  measurementId: "G-N6E2HXZKL8"
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, { 
  ignoreUndefinedProperties: true
 } )
export const auth = getAuth(app)
export const authProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
