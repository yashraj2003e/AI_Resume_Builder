import { useResumeContext } from "../../../contexts/ResumeContext";
import EducationalPreview from "./EducationalPreview";
import ProfessionalExperience from "./ProfessionalExperience";
import SkillsPreview from "./SkillsPreview";
import SummaryPreview from "./SummaryPreview";

function PersonalDetailsPreview() {
  const { resumeInfo } = useResumeContext();
  const theme = resumeInfo?.themeColor;
  return (
    <div
      className={`text-center shadow-2xl border-t-[2.5dvh] px-4 overflow-scroll rounded-t-2xl h-[85dvh]`}
      style={{ borderColor: `${theme}` }}
    >
      <h2 className={`font-bold text-3xl`} style={{ color: `${theme}` }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className=" text-md font-medium">{resumeInfo?.jobTitle}</h2>
      <h2 className="font-normal text-sm">{resumeInfo?.address}</h2>
      <div className="flex justify-between">
        <h2 className="font-normal text-sm">{resumeInfo?.phone}</h2>
        <h2 className="font-normal text-sm">{resumeInfo?.email}</h2>
      </div>
      <hr className="border-2 my-2" style={{ borderColor: `${theme}` }} />
      <SummaryPreview />
      <ProfessionalExperience />
      <EducationalPreview />
      <SkillsPreview />
    </div>
  );
}

export default PersonalDetailsPreview;
