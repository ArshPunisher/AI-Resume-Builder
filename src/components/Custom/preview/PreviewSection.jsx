import React, { useContext } from 'react'
import PersonalDetails from './PersonalDetails'
import Summary from './Summary';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import { ResumeInfo } from '@/Context/ResumeInfoContext';

function PreviewSection() {
  const {formData} = useContext(ResumeInfo);
  return (
    <div className='shadow-xl h-full p-14 border-t-[14px] border-red-600' style={{borderColor:formData?.themeColor}}>
      <PersonalDetails />
      <Summary />
      <Experience />
      <Education />
      <Skills />
    </div>
  )
}

export default PreviewSection
