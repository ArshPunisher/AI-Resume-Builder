import { useDB } from "@/Context/FirebaseContext";
import { ResumeInfo } from "@/Context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FormEducation({ enabledNext }) {
    const { resumeId } = useParams();
    const { saveResumeInfo } = useDB();
    const { formData, setFormData } = useContext(ResumeInfo);
    const [loading, setLoading] = useState(false);

  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const addMoreEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationList(educationList.slice(0, -1));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEducationList = [...educationList];
    newEducationList[index][name] = value;
    setEducationList(newEducationList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      saveResumeInfo(formData, resumeId);
      enabledNext(true);
      toast({
        title: "Added!",
        description: "Education details updated successfully.",
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
    setFormData({
        ...formData,
        education:educationList
    })
  }, [educationList])

  return (
    <div className="p-5 shadow-md border-t-4 border-t-[#944dfd] rounded-lg mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your education details</p>
      <div>
        {educationList &&
          educationList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label className="text-xs">University Name</label>
                  <input
                    className="input"
                    name="universityName"
                    value={item.universityName}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Degree</label>
                  <input
                    className="input"
                    name="degree"
                    value={item.degree}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Major</label>
                  <input
                    className="input"
                    name="major"
                    value={item.major}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <input
                    type="Date"
                    className="input"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <input
                    type="Date"
                    className="input"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Description</label>
                  <Textarea
                    name="description"
                    value={item.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={addMoreEducation} variant="outline">
            + Add More Education
          </Button>
          <Button onClick={removeEducation} variant="outline">
            - Remove
          </Button>
        </div>
        <Button onClick={handleSubmit}>
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default FormEducation;
