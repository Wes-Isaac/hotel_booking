import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAd0kWlno-TjsCVAsQQUMyy7KkNvWib0tU",
  authDomain: "booking-40104.firebaseapp.com",
  projectId: "booking-40104",
  storageBucket: "booking-40104.appspot.com",
  messagingSenderId: "1071906902201",
  appId: "1:1071906902201:web:ae2d39436f4e87d14b8b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)


export default { storage, db }
