import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCPrvNoybroxdVw5VvHFNg7gYle0QFIkCY",
  authDomain: "familyreunion-c1429.firebaseapp.com",
  databaseURL: "https://familyreunion-c1429-default-rtdb.firebaseio.com",
  projectId: "familyreunion-c1429",
  storageBucket: "familyreunion-c1429.appspot.com",
  messagingSenderId: "63849449746",
  appId: "1:63849449746:web:ef45144459b76fdfd0cbcb"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);