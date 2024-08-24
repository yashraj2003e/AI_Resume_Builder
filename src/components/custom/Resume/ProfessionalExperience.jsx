import { useResumeContext } from "../../../contexts/ResumeContext";

function ProfessionalExperience() {
  const { resumeInfo } = useResumeContext();

  const theme = resumeInfo?.themeColor;
  return (
    <div className="mt-3">
      <h2
        className="text-center font-bold text-3xl mb-2"
        style={{ color: `${theme}` }}
      >
        Professional Experience
      </h2>
      <hr className="border-2 my-2" style={{ borderColor: `${theme}` }} />

      {resumeInfo?.experience?.map(
        (experience, index) =>
          experience.title &&
          experience.companyName &&
          experience.state &&
          experience.startDate && (
            <div key={index} className="mt-5">
              <h2
                className={"text-2xl font-bold text-left"}
                style={{ color: `${theme}` }}
              >
                {experience?.title}
              </h2>
              <h2 className="text-sm flex justify-between my-1">
                {experience?.companyName}, {experience?.state}
                <span>
                  <span className="text-sm">{experience?.startDate} To </span>
                  <span className="text-sm">
                    {!experience?.endDate ? "Present" : experience.endDate}{" "}
                  </span>
                </span>
              </h2>
              <div className="text-left text-md ml-2 mt-2">
                <ul className="list-disc space-y-1">
                  {experience?.workSummary?.length > 0 &&
                    experience?.workSummary[0] != "" &&
                    experience?.workSummary?.map((item, index) => (
                      <li key={index}>
                        <p>{item}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default ProfessionalExperience;
