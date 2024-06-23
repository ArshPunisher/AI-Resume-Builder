import { ResumeInfo } from "@/Context/ResumeInfoContext";
import React, { useContext } from "react";

function Experience() {
  const { formData } = useContext(ResumeInfo);
  return (
    <div className="my-4">
      <h2
        className="text-center text-[1rem] font-semibold"
        style={{ color: formData?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr
        className="border-[2px] my-2"
        style={{ borderColor: formData?.themeColor }}
      />
      {formData?.experience?.map((experience, index) => (
        <div className="my-5" key={index}>
          <h2 className="text-sm font-bold">{experience?.title}</h2>
          <h2 className="flex justify-between text-xs">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
}

export default Experience;
