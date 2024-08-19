import { useEffect, useState } from "react";
import EducationItem from "./EducationItem";
import { useResumeContext } from "../../../contexts/ResumeContext";

const data2 = [
  {
    id: 0,
    universityName: "",
    startDate: "",
    endDate: "",
    degree: "",
    description: [],
  },
];

const emptyData = {
  id: 0,
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  description: [],
};

function Education() {
  const { setResumeInfo } = useResumeContext();
  const [totalExperience, setTotalExperience] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [data1, setData1] = useState(data2);
  const [experienceList, setExperienceList] = useState(data1[tabIndex]);

  useEffect(() => {
    if (tabIndex < data1.length) {
      setExperienceList(data1[tabIndex]);
    } else {
      const newExperience = { ...emptyData, id: totalExperience - 1 };
      setData1((prev) => [...prev, newExperience]);
      setExperienceList(newExperience);
    }
  }, [tabIndex, totalExperience, data1]);

  useEffect(() => {
    setResumeInfo((resumeInfo) => ({ ...resumeInfo, education: data1 }));
  }, [data1, setResumeInfo]);

  return (
    <div>
      <EducationItem
        setTotalExperience={setTotalExperience}
        totalExperience={totalExperience}
        setTabIndex={setTabIndex}
        tabIndex={tabIndex}
        experienceList={experienceList}
        data1={data1}
        setData1={setData1}
      />
    </div>
  );
}

export default Education;
