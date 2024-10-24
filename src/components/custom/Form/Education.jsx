import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useResumeContext } from "../../../contexts/ResumeContext";
import EducationItem from "./EducationItem";
import GlobalAPI from "../../../../service/GlobalAPI";

const data2 = [
  {
    id: 0,
    universityName: "",
    location: "",
    major: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
  },
];

const emptyData = {
  id: 0,
  universityName: "",
  location: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education() {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo, setIsLoading } = useResumeContext();
  const [totalExperience, setTotalExperience] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [data1, setData1] = useState(
    resumeInfo?.education?.length > 0 ? resumeInfo?.education : data2
  );
  const [experienceList, setExperienceList] = useState(data1[tabIndex]);

  useEffect(() => {
    setTotalExperience(data1.length);
  }, [data1.length]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       if (!resumeInfo.education) {
  //         console.log("fetching education data");
  //         setIsLoading(true);
  //         const data = await GlobalAPI.getUserResumeData(resumeId);
  //         const result = data.data.data;
  //         if (result[0].userEducation.length > 0) {
  //           setData1(result[0].userEducation);
  //         }
  //       } else {
  //         console.log("Setting data from resumeInfo");
  //         setData1(resumeInfo.education);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [resumeId, setIsLoading]);

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
    async function saveData() {
      try {
        setIsLoading(true);
        const data = {
          data: {
            userEducation: JSON.stringify(data1),
          },
        };
        const updatePromise = GlobalAPI.UpdateResumeDetails(resumeId, data);
        await updatePromise;
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (data1[0]?.universityName != "" && resumeInfo.education != data1)
      saveData();
  }, [data1, resumeId, setIsLoading, setResumeInfo, resumeInfo.education]);

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
