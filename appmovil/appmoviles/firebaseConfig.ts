// firebaseConfig.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA3s0sQ9Zo5nI9JjG0jrHCMBa1bwz5ao6M',
  authDomain: 'app-moviles-3715a.firebaseapp.com',
  projectId: 'app-moviles-3715a',
  storageBucket: 'app-moviles-3715a.appspot.com',
  messagingSenderId: '1042004322946',
  appId: '1:1042004322946:web:250ba9cde057c5211ea29b',
  measurementId: 'G-3DCMCLR1T9',
};

const app = initializeApp(firebaseConfig);

export { app };
