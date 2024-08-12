import { useEffect, useState } from "react";
import ExperienceItem from "./ExperienceItem";
import { useResumeContext } from "../../../contexts/ResumeContext";
import "react-toastify/dist/ReactToastify.css";

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

// Experience.propTypes = {
//   visited: PropTypes.shape({
//     current: PropTypes.number.isRequired,
//   }).isRequired,
// };

function Experience() {
  const { setResumeInfo } = useResumeContext();
  const [totalExperience, setTotalExperience] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [data1, setData1] = useState(data2);
  const [experienceList, setExperienceList] = useState(data1[tabIndex]);

  // console.log(visited.current);
  // if (visited.current === 0) {
  //   //   console.log("YES");
  //   visited.current++;
  // }
  // console.log(visited.current);
  // console.log(visited);
  // useEffect(() => {
  //   if (visited.current === 0) {
  //     visited.current++;
  //   }
  // }, []);

  // useEffect(() => {
  //   // if (activeFormIndex === 3) {
  //   toast.info("Save to view changes !", { position: "top-center" });
  //   // }
  // }, []);

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
  }, [data1, setResumeInfo]);

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
