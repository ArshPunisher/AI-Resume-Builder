import { useDB } from "@/Context/FirebaseContext";
import { ResumeInfo } from "@/Context/ResumeInfoContext";
import FormSection from "@/components/Custom/FormSection/FormSection";
import Navbar from "@/components/Custom/Navbar";
import PreviewSection from "@/components/Custom/preview/PreviewSection";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { resumeId } = useParams();
  const { fetchResumeInfo } = useDB();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResumeData = async () => {
      try {
        const data = await fetchResumeInfo(resumeId);
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch resume data", error);
      } finally {
        setLoading(false);
        console.log(formData)
      }
    };

    getResumeData();
  }, [fetchResumeInfo, resumeId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar scrolled="sticky shadow-md" notScrolled="sticky shadow-md" />
      <ResumeInfo.Provider value={{formData, setFormData}}>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-10 gap-10">
          <FormSection />
          <PreviewSection />
        </div>
      </ResumeInfo.Provider>
    </>
  );
}

export default Edit;
