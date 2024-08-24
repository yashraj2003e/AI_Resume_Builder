import { useResumeContext } from "../../../contexts/ResumeContext";

function SkillsPreview() {
  const { resumeInfo } = useResumeContext();
  const theme = resumeInfo?.themeColor;
  return (
    <div>
      <h2
        className="text-center font-bold text-3xl mb-2 mt-[-0.75rem]"
        style={{ color: `${theme}` }}
      >
        Technical Skills
      </h2>
      <hr className="border-2" style={{ borderColor: `${theme}` }} />
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-md">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[50%]">
              <div
                className="h-2"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SkillsPreview;
