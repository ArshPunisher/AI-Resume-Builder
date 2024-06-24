import { useDB } from "@/Context/FirebaseContext";
import { ResumeInfo } from "@/Context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RichTextEditor from "../RichTextEditor";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function FormExperience({ enabledNext }) {
  const { resumeId } = useParams();
  const { saveResumeInfo } = useDB();
  const { formData, setFormData } = useContext(ResumeInfo);

  const [loading, setLoading] = useState(false);
  const [experienceList, setExperiencedList] = useState([{ ...formField }]);

  const handleChange = (index, e) => {
    enabledNext(false)
    const newEnteries = experienceList.slice();
    const { name, value } = e.target;
    newEnteries[index][name] = value;
    setExperiencedList(newEnteries);
  };

  const addMoreExperience = () => {
    setExperiencedList([...experienceList, { ...formField }]);
  };

  const removeExperience = () => {
    setExperiencedList(experienceList.slice(0, -1));
  };

  const handleEditorChange = (e, name, index) => {
    enabledNext(false)
    const newEnteries = experienceList.slice();
    newEnteries[index][name] = e.target.value;
    setExperiencedList(newEnteries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      saveResumeInfo(formData, resumeId);
      enabledNext(true);
      toast({
        title: "Added!",
        description: "Experience details updated successfully.",
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
    if (formData.experience && formData.experience.length > 0) {
      setExperiencedList(formData.experience);
    }
  },[])

  useEffect(() => {
    setFormData({
      ...formData,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div className="p-5 shadow-md border-t-4 border-t-[#944dfd] rounded-lg mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add Your previous Job experience</p>
      <div>
        {experienceList &&
          experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <input
                    className="input"
                    name="title"
                    defaultValue={item.title}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <input
                    className="input"
                    name="companyName"
                    defaultValue={item.companyName}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <input
                    className="input"
                    name="city"
                    defaultValue={item.city}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <input
                    className="input"
                    name="state"
                    defaultValue={item.state}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <input
                    className="input"
                    type="date"
                    name="startDate"
                    defaultValue={item.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <input
                    className="input"
                    type="date"
                    name="endDate"
                    defaultValue={item.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor onTextEditorChange={(event) => handleEditorChange(event, 'workSummary', index)} index={index} />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={addMoreExperience} variant="outline">+ Add More Experience</Button>
          <Button onClick={removeExperience} variant="outline">- Remove</Button>
        </div>
        <Button onClick={handleSubmit}>
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default FormExperience;
