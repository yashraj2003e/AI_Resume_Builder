import { useResumeContext } from "../../../contexts/ResumeContext";

function EducationalPreview() {
  const { resumeInfo } = useResumeContext();
  const theme = resumeInfo?.themeColor;
  return (
    <div>
      <h2
        className="text-center font-bold text-2xl mb-2"
        style={{ color: `${theme}` }}
      >
        Education
      </h2>
      <hr className="border-2 my-2" style={{ borderColor: `${theme}` }} />

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className="my-3">
          <h2
            className="text-xl font-bold text-left"
            style={{ color: `${theme}` }}
          >
            {education.universityName}
          </h2>
          <div className="justify-between flex my-1 text-sm sm:text-md flex-wrap">
            {education.degree && (
              <h2>
                {education.degree} in {education.major}
              </h2>
            )}
            {education.startDate && (
              <span className="text-md">
                {education.startDate} - {education.endDate}
              </span>
            )}
          </div>
          <p className="text-justify text-sm">{education.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
