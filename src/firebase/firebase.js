
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCAIBGDgRq5CRFme1_aLDUEe-_RlgyaaZ8",
  authDomain: "pump-pals.firebaseapp.com",
  projectId: "pump-pals",
  storageBucket: "pump-pals.appspot.com",
  messagingSenderId: "276288538984",
  appId: "1:276288538984:web:c88dc1e7fc72e634d0aedd",
  measurementId: "G-B72K4M4J12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth}
