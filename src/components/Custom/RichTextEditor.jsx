import React, { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { ResumeInfo } from "@/Context/ResumeInfoContext";
import { toast } from "../ui/use-toast";
import { chatSession } from "@/Service/gemeniApi";


const prompt = `
position title: {positionTitle}
Based on the above position title, provide 5-7 bullet points for job experience that can be included in a resume. Each bullet point should be a concise, impactful statement. Please provide the result in JSON format as follows:
{
  "experience": [
    {"summary": "First bullet point"},
    {"summary": "Second bullet point"},
    {"summary": "Third bullet point"},
    {"summary": "Fourth bullet point"},
    {"summary": "Fifth bullet point"},
    {"summary": "Sixth bullet point"},
    {"summary": "Seventh bullet point"}
  ]
}
`;

function RichTextEditor({ onTextEditorChange, index }) {
  const { formData } = useContext(ResumeInfo);
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState();

  const GenerateExperienceWithAI = async () => {
    try {
      if (!formData.experience[index].title) {
        toast({
          title: "Please Fill Details",
          description: "Please Add Position Title",
        });
        return;
      }
      setLoading(true);
      const PROMPT = prompt.replace("{positionTitle}", formData.experience[index].title);
      const result = await chatSession.sendMessage(PROMPT);
      
      console.log("Result", result);
      
      const responseText = await result.response.text();
      console.log("responseText", responseText);
      const parsedResult = JSON.parse(responseText);
      console.log("Parse result", parsedResult);
      
      // Join the experience array into a single HTML string
      const experienceHTML = `<ul>${parsedResult.experience.map(point => `<li>${point.summary}</li>`).join('')}</ul>`;
      
      setValue(experienceHTML);
    } catch (error) {
      console.error("Error", error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if (formData.experience && formData.experience.length > 0) {
      setValue(formData.experience[index]?.workSummary);
    }
  },[])
  

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label>Summary</label>
        
        <Button variant="outline" className="flex gap-2" onClick={GenerateExperienceWithAI}>{loading ? <LoaderCircle className="animate-spin"/>: <Brain/>}Generate with AI</Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <HtmlButton />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
