import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBp9D9LuAq-JjlQp6wnmJelU1evAlYse30",
  authDomain: "todo-list-34c0e.firebaseapp.com",
  databaseURL: "https://todo-list-34c0e-default-rtdb.firebaseio.com",
  projectId: "todo-list-34c0e",
  storageBucket: "todo-list-34c0e.firebasestorage.app",
  messagingSenderId: "606649541626",
  appId: "1:606649541626:web:b5365c13834cca6538fa43"
};
//menginisialisasi
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);

export { auth, firestore };