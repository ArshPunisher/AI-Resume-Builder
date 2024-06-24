import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'
import FormPersonalDetails from './FormPersonalDetails'
import FormSummary from './FormSummary'
import FormExperience from './FormExperience'
import FormEducation from './FormEducation'
import FormSkills from './FormSkills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from '../ThemeColor'

function FormSection() {
  const { resumeId } = useParams();
  const [formIndex, setFormIndex] = useState(1)
  const [enabledNext, setEnabledNext] = useState(false)

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5'>
          <Link to='/dashboard'>
            <Button variant="outline" className='flex gap-2'> <Home/></Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className='flex gap-2'>
          {formIndex>1&&<Button onClick={()=>setFormIndex(formIndex-1)}><ArrowLeft size={20}/> </Button>}
          <Button disabled={!enabledNext} onClick={()=>setFormIndex(formIndex+1)} className="flex gap-2 font-bold bg-[#FF4742] text-white hover:text-[#FF4742] hover:bg-white hover:border-2 border-[#FF4742]">Next <ArrowRight size={20}/></Button>
        </div>
      </div>

      <div>
        {formIndex == 1 && <FormPersonalDetails enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 2 && <FormSummary enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 3 && <FormExperience enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 4 && <FormEducation enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 5 && <FormSkills enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 6 && <Navigate to={`/resume/${resumeId}/view`}/>}

      </div>
    </div>
  )
}

export default FormSection
