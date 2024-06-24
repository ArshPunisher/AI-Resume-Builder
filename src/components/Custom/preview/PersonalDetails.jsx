import { ResumeInfo } from '@/Context/ResumeInfoContext'
import React, { useContext } from 'react'

function PersonalDetails() {
  const {formData} = useContext(ResumeInfo);
  return (
    <div>
      <h2 className='text-center text-[1.4rem] font-bold'>{formData?.firstName} {formData?.lastName}</h2>
      <h2 className='text-center text-[1rem] font-medium'>{formData?.jobTitle}</h2>
      <h2 className='text-center text-[0.8rem] font-normal'>{formData?.address}</h2>
      <div className='flex justify-between mt-5'>
        <h2 className='text-[1rem] font-medium'>{formData?.phone}</h2>
        <h2 className='text-[1rem] font-medium'>{formData?.email}</h2>
      </div>
      <hr className='border-[2px] my-2' style={{borderColor:formData?.themeColor}}/>
    </div>
  )
}

export default PersonalDetails
