import { useEffect, useState } from "react";
import ExperienceItem from "./ExperienceItem";
import { useResumeContext } from "../../../contexts/ResumeContext";
import "react-toastify/dist/ReactToastify.css";
import GlobalAPI from "../../../../service/GlobalAPI";
import { useParams } from "react-router-dom";
import propTypes from "prop-types";

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
};

Experience.propTypes = {
  setIsLoading: propTypes.func.isRequired,
};

function Experience({ setIsLoading }) {
  const { resumeId } = useParams();
  const { setResumeInfo } = useResumeContext();
  const [data1, setData1] = useState(data2);
  const [totalExperience, setTotalExperience] = useState(data1.length);
  const [tabIndex, setTabIndex] = useState(0);
  const [experienceList, setExperienceList] = useState(data1[tabIndex]);

  useEffect(() => {
    if (tabIndex < data1.length) {
      setExperienceList(data1[tabIndex]);
    } else {
      const newExperience = { ...formField, id: totalExperience - 1 };
      setData1((prev) => [...prev, newExperience]);
      setExperienceList(newExperience);
    }
  }, [tabIndex, data1, totalExperience]);

  useEffect(() => {
    setResumeInfo((resumeInfo) => ({ ...resumeInfo, experience: data1 }));
    async function saveData() {
      try {
        if (data2.length === 1) {
          setIsLoading(true);
          const data = {
            data: {
              userExperience: JSON.stringify(data1),
            },
          };
          const updatePromise = GlobalAPI.UpdateResumeDetails(resumeId, data);
          await updatePromise;
          console.log(1);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    saveData();
  }, [data1, setResumeInfo, setIsLoading, resumeId]);

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
