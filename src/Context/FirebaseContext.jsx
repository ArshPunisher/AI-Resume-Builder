import { createContext, useContext } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  serverTimestamp,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

const FirebaseContext = createContext(null);

export const useDB = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {

  const getResumes = async (email) => {
    try {
      const q = query(
        collection(db, "user-data"),
        where("email", "==", email)
      );
      const docsSnap = await getDocs(q);
  
      // Initialize an empty array to hold resume data
      const resumes = [];
      
      // Loop through the documents snapshot and push each document's data to the resumes array
      docsSnap.forEach(doc => {
        resumes.push(doc.data());
      });
  
      return resumes;
    } catch (error) {
      throw error;
    }
  };
  
  const fetchResumeInfo = async (resumeId) => {
    try {
      const resumeDoc = await getDoc(doc(db, "resumes-data", resumeId));
      if (resumeDoc.exists()) {
        return resumeDoc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching resume information:", error);
      throw new Error("Failed to fetch resume information");
    }
  };

  const saveResumeInfo = async (formData, resumeId) => {
    try {
      const response = await setDoc(doc(db, "resumes-data", resumeId), {
        ...formData,
        createdAt: serverTimestamp(),
      }, { merge: true });
      console.log("Resume information saved successfully!");
      return response;
    } catch (error) {
      throw new Error
    }
  };

  const addResume = async (title, name, email, resumeId) => {
    try {
      await addDoc(collection(db, "user-data"), {
        title: title,
        name: name,
        email: email,
        resumeId: resumeId,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider value={{ getResumes, fetchResumeInfo, saveResumeInfo, addResume }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
