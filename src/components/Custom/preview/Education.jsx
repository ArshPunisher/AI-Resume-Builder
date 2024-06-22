import { ResumeInfo } from '@/Context/ResumeInfoContext';
import React, { useContext } from 'react'

function Education() {
  const {formData} = useContext(ResumeInfo);
  return (
    <div className='my-4'>
      <h2
        className="text-center text-[1rem] font-semibold"
        style={{ color: formData?.themeColor }}
      >
        Education
      </h2>
      <hr
        className="border-[2px] my-2"
        style={{ borderColor: formData?.themeColor }}
      />
      {formData?.education?.map((education, index)=>(
        <div className='my-5' key={index}>
          <h2 className="text-sm font-bold">{education?.universityName}</h2>
          <h2 className="flex justify-between text-xs">{education?.degree} in {education?.major}
            <span>{education?.startDate} - {education?.endDate}</span>
          </h2>
          <p className="text-xs my-2">{education?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Education
