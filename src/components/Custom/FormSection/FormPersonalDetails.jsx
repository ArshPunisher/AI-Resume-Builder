import { useDB } from '@/Context/FirebaseContext'
import { ResumeInfo } from '@/Context/ResumeInfoContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

function FormPersonalDetails({enabledNext}) {

    const {resumeId} = useParams()
    const {saveResumeInfo} = useDB()
    const {formData, setFormData} = useContext(ResumeInfo)
    const [loading, setLoading] = useState(false)

    const handleInput = (e) =>{
        enabledNext(false);
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        console.log("I ran")
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)

        try {
            saveResumeInfo(formData, resumeId)
            enabledNext(true)
            toast({
                title: "Details Updated!",
                description: "Personal Details has been updated successfully.",
              });
        } catch (error) {
            toast({
                title: "Error occurred!",
                description: error.message,
              })
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='p-5 shadow-md border-t-4 border-t-[#944dfd] rounded-lg mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get started with basic information</p>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-3 mt-5'>
            <div>
                <label className='text-sm'>First Name</label>
                <Input name="firstName" defaultValue={formData?.firstName} onChange={handleInput} required/>
            </div>
            <div>
                <label className='text-sm'>Last Name</label>
                <input className="input" name="lastName" defaultValue={formData?.lastName} onChange={handleInput} required/>
            </div>
            <div className='col-span-2'>
                <label className='text-sm'>Job Title</label>
                <input className="input" name="jobTitle" defaultValue={formData?.jobTitle} onChange={handleInput} required/>
            </div>
            <div className='col-span-2'>
                <label className='text-sm'>Address</label>
                <input className="input" name="address" defaultValue={formData?.address} onChange={handleInput} required/>
            </div>
            <div>
                <label className='text-sm'>Phone</label>
                <input className="input" name="phone" type="tel" defaultValue={formData?.phone} onChange={handleInput} required/>
            </div>
            <div>
                <label className='text-sm'>Email</label>
                <input className="input" name="email" type="email" defaultValue={formData?.email} onChange={handleInput} required/>
            </div>
        </div>

        <div className='mt-3 flex justify-end'>
            <Button type="submit">{loading ? <Loader2 className='animate-spin'/> : "Save"}</Button>
        </div>
      </form>
    </div>
  )
}

export default FormPersonalDetails
