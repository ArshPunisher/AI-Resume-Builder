import { useDB } from "@/Context/FirebaseContext";
import { ResumeInfo } from "@/Context/ResumeInfoContext";
import { chatSession } from "@/Service/gemeniApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

function FormSummary({ enabledNext }) {
  const prompt =
    "Job Title: {jobTitle}, Provide a summary for my resume within 4-5 lines in JSON format as an array of objects. Each object should contain fields 'experienceLevel' and 'summary' for the experience levels: Fresher, Intermediate, Experienced. Example: [{experienceLevel: 'Fresher', summary: '...'}, {experienceLevel: 'Intermediate', summary: '...'}, {experienceLevel: 'Experienced', summary: '...'}]";
  const { resumeId } = useParams();
  const { saveResumeInfo } = useDB();
  const { formData, setFormData } = useContext(ResumeInfo);
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState([]);

  const GenerateSummaryFromAI = async () => {
    try {
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", formData?.jobTitle);
      const result = await chatSession.sendMessage(PROMPT);
      const parsedResult = JSON.parse(result.response.text());
      setAiGeneratedSummary(parsedResult);
    } catch (error) {
      console.error("Error", error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveResumeInfo(formData, resumeId);
      enabledNext(true);
      toast({
        title: "Details Updated!",
        description: "Your resume summary has been updated successfully.",
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

  const handleClick = (summary) => {
    setFormData({
      ...formData,
      summary: summary,
    });
  };

  return (
    <div>
      <div className="p-5 shadow-md border-t-4 border-t-[#944dfd] rounded-lg mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job profile</p>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex items-center justify-between">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummaryFromAI}
              type="button"
              className="flex gap-2"
            >
              <Brain /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            value={formData?.summary}
            className="mt-5"
            required
            onChange={handleInput}
          />

          <div className="mt-3 flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummary.length > 0 && (
        <div className="mt-[2rem]">
          <h2 className="text-center text-xl font-bold">Suggestions With AI</h2>
          {aiGeneratedSummary.map((item, index) => (
            <div
              className="p-6 my-4 shadow-lg rounded-md cursor-pointer hover:scale-105 transition-all"
              key={index}
              onClick={() => handleClick(item.summary)}
            >
              <h2 className="text-lg font-semibold text-indigo-500">
                Level: {item.experienceLevel}
              </h2>
              <p className="font-medium">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormSummary;
