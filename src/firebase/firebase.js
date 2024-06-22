import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbHKwSrZM-MWACea9CbyMhyNBlQ6xfHPM",
    authDomain: "ai-resume-builder-2dfcc.firebaseapp.com",
    projectId: "ai-resume-builder-2dfcc",
    storageBucket: "ai-resume-builder-2dfcc.appspot.com",
    messagingSenderId: "561356865596",
    appId: "1:561356865596:web:7d56b82fca54e700388339"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
