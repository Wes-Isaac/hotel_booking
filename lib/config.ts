import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAd0kWlno-TjsCVAsQQUMyy7KkNvWib0tU",
  authDomain: "booking-40104.firebaseapp.com",
  projectId: "booking-40104",
  storageBucket: "booking-40104.appspot.com",
  messagingSenderId: "1071906902201",
  appId: "1:1071906902201:web:ae2d39436f4e87d14b8b68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth()
export const googleAuthProvider = new GoogleAuthProvider();
export const signWithPopup =  signInWithPopup

export const timestamp = serverTimestamp;
