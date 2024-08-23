import PersonalDetails from "./PersonalDetails";
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Summary from "./Summary";
import Experience from "./Experience";
import PropTypes from "prop-types";
import Education from "./Education";
import Skills from "./Skills";
import GlobalAPI from "../../../../service/GlobalAPI";
import { getNewArray } from "../../../../service/utils";
import { useParams } from "react-router-dom";
import { useResumeContext } from "../../../contexts/ResumeContext";

FormSection.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  visited: PropTypes.shape({
    current: PropTypes.number.isRequired,
  }).isRequired,
};

function FormSection({ setIsLoading, visited }) {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [AIGeneratedSummary, setAIGeneratedSummary] = useState([]);
  const { setResumeInfo } = useResumeContext();
  const { resumeId } = useParams();
  const isFirstMount = useRef();
  isFirstMount.current = true;

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await GlobalAPI.getUserResumeData(resumeId);
        const result = data.data.data;
        if (result.length > 0) {
          let {
            firstName,
            lastName,
            jobTitle,
            phone,
            address,
            email,
            summary,
            userEducation: education,
            userExperience: experience,
            userSkills: skills,
          } = result[0];

          skills = getNewArray(skills);

          setResumeInfo((prevInfo) => ({
            ...prevInfo,
            firstName,
            lastName,
            jobTitle,
            phone,
            address,
            email,
            summary,
            education,
            experience,
            skills,
          }));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    if (isFirstMount.current == true) {
      getData();
      isFirstMount.current = false;
      console.log(isFirstMount.current + " 65");
    }
  }, []);

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="outline" className="flex gap-2">
            <LayoutGrid /> Theme
          </Button>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              onClick={() => setActiveFormIndex((value) => value - 1)}
              variant="ringHover"
            >
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex <= 4 && (
            <Button
              className="flex gap-2"
              onClick={() => setActiveFormIndex((value) => value + 1)}
              variant="ringHover"
            >
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/*Personal Details*/}
      {activeFormIndex == 1 && <PersonalDetails setIsLoading={setIsLoading} />}
      {activeFormIndex == 2 && (
        <Summary
          setAIGeneratedSummary={setAIGeneratedSummary}
          AIGeneratedSummary={AIGeneratedSummary}
        />
      )}
      {activeFormIndex === 3 && (
        <Experience setIsLoading={setIsLoading} visited={visited} />
      )}
      {activeFormIndex === 4 && <Education setIsLoading={setIsLoading} />}
      {activeFormIndex === 5 && <Skills setIsLoading={setIsLoading} />}
    </div>
  );
}

export default FormSection;
