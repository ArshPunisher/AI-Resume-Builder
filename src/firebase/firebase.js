import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA4TWk8qDJ-AjyHPEFc82wbVUQWE11y0M",
  authDomain: "ai-resume-builder-23eb4.firebaseapp.com",
  projectId: "ai-resume-builder-23eb4",
  storageBucket: "ai-resume-builder-23eb4.appspot.com",
  messagingSenderId: "906245144511",
  appId: "1:906245144511:web:21f78399d455906af36b0a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
