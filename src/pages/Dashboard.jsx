import { useDB } from "@/Context/FirebaseContext";
import AddResume from "@/components/Custom/AddResume";
import Navbar from "@/components/Custom/Navbar";
import ResumeCard from "@/components/Custom/ResumeCard";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { getResumes } = useDB();
  const { user, isLoaded, isSignedIn } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const getResumesList = async () => {
    try {
      const response = await getResumes(user.primaryEmailAddress.emailAddress);
      setResumeList(response);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Finally", resumeList);
    }
  };

  useEffect(() => {
    if (user) getResumesList();
  }, [user]);

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <Navbar scrolled="sticky shadow-md" notScrolled="sticky shadow-md" />

      <div className="min-h-screen p-4 md:p-8 lg:p-10">
        <div>
          <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold">
            My Resume
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-slate-900 font-semibold mt-2">
            Elevate your professional profile with an AI-enhanced resume
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-6">
          <AddResume />
          {resumeList &&
            resumeList.map((resume, index) => (
              <ResumeCard resume={resume} key={index} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
