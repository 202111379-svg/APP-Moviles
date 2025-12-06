// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3s0sQ9Zo5nI9JjG0jrHCMBa1bwz5ao6M",
  authDomain: "app-moviles-3715a.firebaseapp.com",
  projectId: "app-moviles-3715a",
  storageBucket: "app-moviles-3715a.appspot.com",
  messagingSenderId: "1042004322946",
  appId: "1:1042004322946:web:250ba9cde057c5211ea29b"
};

// INICIALIZA
export const app = initializeApp(firebaseConfig);

// EXPORTA AUTH
export const auth = getAuth(app);
