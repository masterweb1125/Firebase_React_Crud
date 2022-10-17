import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyD6UVcBT4uweb49-4iu0u7oOWtJ1gIBKxY",
    authDomain: "ticktok-c67f5.firebaseapp.com",
    projectId: "ticktok-c67f5",
    storageBucket: "ticktok-c67f5.appspot.com",
    messagingSenderId: "960377348627",
    appId: "1:960377348627:web:57740962b5c078a39d15e6",
    measurementId: "G-XF1VWM5VSQ"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;

