import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAYjUr1m79-YaYGga7or8ZpauT85Su86OM",
  authDomain: "scalam-fire.firebaseapp.com",
  projectId: "scalam-fire",
  storageBucket: "scalam-fire.appspot.com",
  messagingSenderId: "791843387602",
  appId: "1:791843387602:web:aaf1e54ea9478b285b550b",
  measurementId: "G-N6E2HXZKL8"
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true
})
export const auth = getAuth(app)
export const authProvider = new GoogleAuthProvider()
export const db = getFirestore(app)