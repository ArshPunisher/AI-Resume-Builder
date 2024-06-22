import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'
import FormPersonalDetails from './FormPersonalDetails'
import FormSummary from './FormSummary'
import FormExperience from './FormExperience'

function FormSection() {
  const [formIndex, setFormIndex] = useState(1)
  const [enabledNext, setEnabledNext] = useState(false)

  return (
    <div>
      <div className='flex items-center justify-between'>
        <Button variant="outline" className='flex gap-2'> <LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {formIndex>1&&<Button onClick={()=>setFormIndex(formIndex-1)}><ArrowLeft size={20}/> </Button>}
          <Button disabled={!enabledNext} onClick={()=>setFormIndex(formIndex+1)} className="flex gap-2 font-bold bg-[#FF4742] text-white hover:text-[#FF4742] hover:bg-white hover:border-2 border-[#FF4742]">Next <ArrowRight size={20}/></Button>
        </div>
      </div>

      <div>
        {formIndex == 1 && <FormPersonalDetails enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 2 && <FormSummary enabledNext={(v)=>setEnabledNext(v)}/>}

        {formIndex == 3 && <FormExperience enabledNext={(v)=>setEnabledNext(v)}/>}

      </div>
    </div>
  )
}

export default FormSection
