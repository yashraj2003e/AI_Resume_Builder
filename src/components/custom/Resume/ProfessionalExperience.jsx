import { useResumeContext } from "../../../contexts/ResumeContext";

function ProfessionalExperience() {
  const { resumeInfo } = useResumeContext();

  const theme = resumeInfo?.themeColor;
  return (
    <div className="mt-3">
      <h2
        className="text-center font-bold text-2xl mb-2"
        style={{ color: `${theme}` }}
      >
        Professional Experience
      </h2>
      <hr className="border-2 my-2" style={{ borderColor: `${theme}` }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="mt-5">
          <h2 className="text-xl font-bold text-left">{experience?.title}</h2>
          <h2 className="text-md flex justify-between my-1">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              <span className="text-md">{experience?.startDate} To </span>
              <span className="text-md">
                {experience?.currentlyWorking ? "Present" : experience.endDate}{" "}
              </span>
            </span>
          </h2>
          <div className="text-left text-sm ml-2 mt-2">
            <ul className="list-disc space-y-1">
              {experience?.workSummary?.map((item, index) => (
                <li key={index}>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfessionalExperience;
