import { ResumeInfo } from '@/Context/ResumeInfoContext';
import React, { useContext } from 'react'

function Skills() {
  const {formData} = useContext(ResumeInfo);
  return (
    <div className='my-4'>
    <h2
      className="text-center text-[1rem] font-semibold"
      style={{ color: formData?.themeColor }}
    >
      Skills
    </h2>
    <hr
      className="border-[2px] my-2"
      style={{ borderColor: formData?.themeColor }}
    />

    <div className='grid grid-cols-2 gap-3 my-2'>
      {formData?.skills?.map((skill, index)=>(
        <div className='flex items-center justify-between' key={index}>
          <h2 className='text-sm'>{skill.name}</h2>
          <div className='h-2 bg-gray-200 w-[10rem]'>
            <div className='h-2' style={{backgroundColor:formData?.themeColor, width:skill?.rating*20+"%"}}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Skills
