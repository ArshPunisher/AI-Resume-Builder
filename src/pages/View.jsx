import { useDB } from '@/Context/FirebaseContext'
import { ResumeInfo } from '@/Context/ResumeInfoContext'
import Navbar from '@/components/Custom/Navbar'
import PreviewSection from '@/components/Custom/preview/PreviewSection'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function View() {

  const { resumeId } = useParams();
  const { fetchResumeInfo } = useDB();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleDownload = () =>{
    window.print()
  }

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
    <ResumeInfo.Provider value={{formData, setFormData}}>
    <div id='no-print'>
      <Navbar scrolled="sticky shadow-md" notScrolled="sticky shadow-md" />
      <div className="my-10 mx-10 md:mx-20 lg:mx-30">
        <h2 className='text-center text-2xl font-medium'>Congratulations! Your AI-powered resume is ready to showcase your skills and experience!</h2>
        <p className='text-center text-gray-500'>You can download your resume or you can share your resume url</p>
        <div className='flex justify-around my-10'>
          <Button onClick={handleDownload}>Download</Button>
          <Button>Share</Button>
        </div>
      </div>
    </div>
    <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-30">
      <PreviewSection/>
    </div>
    </ResumeInfo.Provider>
  )
}

export default View
