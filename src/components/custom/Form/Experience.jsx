import { useEffect, useRef, useState } from "react";
import ExperienceItem from "./ExperienceItem";
import { useResumeContext } from "../../../contexts/ResumeContext";
import "react-toastify/dist/ReactToastify.css";
import GlobalAPI from "../../../../service/GlobalAPI";
import { useParams } from "react-router-dom";

const data2 = [
  {
    id: 0,
    title: "",
    companyName: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummaryRaw: "",
    workSummary: [],
    currentlyWorking: false,
  },
];

const formField = {
  id: 0,
  title: "",
  companyName: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummaryRaw: "",
  workSummary: [],
  currentlyWorking: false,
};

function Experience() {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo, setIsLoading } = useResumeContext();
  const [data1, setData1] = useState(
    resumeInfo?.experience?.length > 0 ? resumeInfo?.experience : data2
  );
  const [totalExperience, setTotalExperience] = useState(data1.length);
  const [tabIndex, setTabIndex] = useState(0);
  const [experienceList, setExperienceList] = useState(data1[tabIndex]);
  const firstMount = useRef(true);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       if (resumeInfo.experience.length === 0) {
  //         console.log("Fetching experience data");
  //         setIsLoading(true);
  //         const data = await GlobalAPI.getUserResumeData(resumeId);
  //         const result = data.data.data;
  //         console.log(result);
  //         if (result[0].userExperience.length > 0) {
  //           setData1(result[0].userExperience);
  //           setResumeInfo((prevInfo) => ({
  //             ...prevInfo,
  //             experience: result[0].userExperience,
  //           }));
  //         }
  //       } else {
  //         console.log("Setting data from resmeInfo");
  //         console.log(resumeInfo.experience);
  //         setData1(resumeInfo.experience);
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
    setTotalExperience(data1.length);
    if (tabIndex < data1.length) {
      setExperienceList(data1[tabIndex]);
    } else {
      const newExperience = { ...formField, id: totalExperience - 1 };
      setData1((prev) => [...prev, newExperience]);
      setExperienceList(newExperience);
    }
  }, [tabIndex, data1, totalExperience]);

  useEffect(() => {
    async function setData() {
      try {
        setIsLoading(true);
        const data = {
          data: {
            userExperience: JSON.stringify(data1),
          },
        };
        console.log(data);
        const updatePromise = GlobalAPI.UpdateResumeDetails(resumeId, data);
        const response = await updatePromise;
        console.log("Setting Experience Data", response.status);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      console.log(resumeInfo.experience != data1);
      setResumeInfo((resumeInfo) => ({ ...resumeInfo, experience: data1 }));
      if (data1[0]?.title != "" && resumeInfo.experience != data1) setData();
    }
  }, [data1, setResumeInfo, setIsLoading, resumeId, resumeInfo.experience]);

  return (
    <div>
      <ExperienceItem
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

export default Experience;
