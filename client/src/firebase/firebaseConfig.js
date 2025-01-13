import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgK557BcZzBYp-Cn0-gi05eY39GKt2qR0",
  authDomain: "wolbee-444d9.firebaseapp.com",
  projectId: "wolbee-444d9",
  storageBucket: "wolbee-444d9.appspot.com",
  messagingSenderId: "1064143583383",
  appId: "1:1064143583383:web:aa549711fa993c366091d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider()
export const storage = getStorage(app); 