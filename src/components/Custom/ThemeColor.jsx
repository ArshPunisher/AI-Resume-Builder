import React, { useContext } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfo } from "@/Context/ResumeInfoContext";

function ThemeColor() {
  const colors = [
    "#FF5733","#33FFA1","#33FF71","#5733FF","#33FF57","#FF7133","#3371FF","#33FF5A","#3357FF","#71FF33","#A1FF33","#5A33FF","#FF33A1","#7133FF","#33A1FF","#FF335A","#A133FF","#FF3371","#FF5733","#335AFF",
  ];

  const { formData, setFormData } = useContext(ResumeInfo);

  const handleColor = (color) =>{
    setFormData({
        ...formData,
        themeColor: color
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="text-sm font-semibold mb-3">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
            onClick={()=>handleColor(item)}
              className="h-5 w-5 cursor-pointer border hover:border-black rounded-full"
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
