import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSu3F6XCw2D9ahnZn3Ysyjrej4tFDuzSo",
    authDomain: "chat-app-4e31d.firebaseapp.com",
    projectId: "chat-app-4e31d",
    storageBucket: "chat-app-4e31d.appspot.com",
    messagingSenderId: "994980075175",
    appId: "1:994980075175:web:ba5af2a58e22463925ad82",
    measurementId: "G-TMBGZSXV1G"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };