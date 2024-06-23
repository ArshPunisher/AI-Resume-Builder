import React, { useContext, useState } from "react";
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


const prompt = "position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in HTML format"

function RichTextEditor({ onTextEditorChange, index }) {
  const { formData, setFormData } = useContext(ResumeInfo);
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
      
      // Join the experience array into a single HTML string
      const experienceHTML = `<ul>${parsedResult.experience.map(point => `<li>${point}</li>`).join('')}</ul>`;
      
      console.log("Parse result", parsedResult);
      setValue(experienceHTML);
    } catch (error) {
      console.error("Error", error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  

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
