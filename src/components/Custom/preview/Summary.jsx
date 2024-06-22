import { ResumeInfo } from '@/Context/ResumeInfoContext';
import React, { useContext } from 'react'

function Summary() {
  const {formData} = useContext(ResumeInfo);
  return (
    <div>
      <p className='text-xs'>{formData?.summary}</p>
    </div>
  )
}

export default Summary
