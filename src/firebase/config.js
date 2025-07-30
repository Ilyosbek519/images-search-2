
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtbFRRjUh6luSe65hlh1BqsMisCD-68UM",
  authDomain: "my-project-2c946.firebaseapp.com",
  projectId: "my-project-2c946",
  storageBucket: "my-project-2c946.firebasestorage.app",
  messagingSenderId: "504508818338",
  appId: "1:504508818338:web:0c2a48367c55ab817648fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
