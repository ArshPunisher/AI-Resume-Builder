import React, { useContext, useState, useEffect } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useDB } from '@/Context/FirebaseContext'
import { ResumeInfo } from '@/Context/ResumeInfoContext'
import { toast } from '@/components/ui/use-toast'

function FormSkills({ enabledNext }) {

    const { resumeId } = useParams();
    const { saveResumeInfo } = useDB();
    const { formData, setFormData } = useContext(ResumeInfo);
    const [loading, setLoading] = useState(false);

    const [skillList, setSkillList] = useState([{
        name:"",
        rating:0
    }])

    const addMoreSkills = () =>{
        setSkillList([...skillList, {
            name:"",
            rating:0
        }])
    }

    const removeSkills = () =>{
        setSkillList(skillList.slice(0, -1));
    }

    const handleChange = (index, name,value) =>{
        enabledNext(false)
        const newSkillSet = [...skillList]
        newSkillSet[index][name] = value
        setSkillList(newSkillSet)
        console.log("I ran", formData.skills)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          saveResumeInfo(formData, resumeId);
          enabledNext(true);
          toast({
            title: "Added!",
            description: "Skills details updated successfully.",
          });
        } catch (error) {
          toast({
            title: "Error occurred!",
            description: error.message,
          });
        } finally {
          setLoading(false);
        }
      };

      useEffect(()=>{
        if (formData.skills && formData.skills.length > 0) {
          setSkillList(formData.skills);
        }
      },[])

      useEffect(()=>{
        setFormData({
            ...formData,
            skills:skillList
        })
      }, [skillList])

  return (
    <div className="p-5 shadow-md border-t-4 border-t-[#944dfd] rounded-lg mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your education details</p>
      {skillList && skillList.map((item, index)=>(
        <div key={index} className='flex items-center justify-between border rounded-lg p-3 mb-2'>
            <div>
                <label className='text-xs'>Name</label>
                <input
                    className="input"
                    maxLength="14"
                    name="name"
                    placeholder='Ex. JavaScript'
                    value={item.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
            </div>
            <Rating name="rating" style={{ maxWidth: 120 }} value={item.rating} onChange={(e) => handleChange(index, 'rating', e)}/>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={addMoreSkills} variant="outline">
            + Add More Skills
          </Button>
          <Button onClick={removeSkills} variant="outline">
            - Remove
          </Button>
        </div>
        <Button onClick={handleSubmit}>
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  )
}

export default FormSkills
