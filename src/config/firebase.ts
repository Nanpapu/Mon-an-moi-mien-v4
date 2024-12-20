import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDrPleO8BaXwOwvCn8qlbORdG7SggOFnCg',
  authDomain: 'mon-an-moi-mien-v2.firebaseapp.com',
  projectId: 'mon-an-moi-mien-v2',
  storageBucket: 'mon-an-moi-mien-v2.firebasestorage.app',
  messagingSenderId: '977479607170',
  appId: '1:977479607170:android:a3d2c3cb4927a9ec49e59b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
