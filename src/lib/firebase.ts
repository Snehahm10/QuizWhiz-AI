// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "quizwhiz-ai-55j1g",
  "appId": "1:597947709281:web:403ed6a46f2d12d350b720",
  "storageBucket": "quizwhiz-ai-55j1g.firebasestorage.app",
  "apiKey": "AIzaSyA5gd7OT8NFhxIGG6O-AEz29ndqp-urJAM",
  "authDomain": "quizwhiz-ai-55j1g.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "597947709281"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export default app;
