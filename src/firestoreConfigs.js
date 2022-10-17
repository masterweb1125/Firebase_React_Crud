import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyD6UVcBT4uweb49-4iu0u7oOWtJ1gIBKxY",
    authDomain: "ticktok-c67f5.firebaseapp.com",
    projectId: "ticktok-c67f5",
    storageBucket: "ticktok-c67f5.appspot.com",
    messagingSenderId: "960377348627",
    appId: "1:960377348627:web:57740962b5c078a39d15e6",
    measurementId: "G-XF1VWM5VSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;
