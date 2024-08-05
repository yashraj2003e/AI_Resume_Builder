import { useResumeContext } from "../../../contexts/ResumeContext";

function SummaryPreview() {
  const { resumeInfo } = useResumeContext();
  return <p className="text-justify text-sm">{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
