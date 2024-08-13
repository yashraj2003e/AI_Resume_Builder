import PersonalDetails from "./PersonalDetails";
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import Summary from "./Summary";
import Experience from "./Experience";
import PropTypes from "prop-types";
import Education from "./Education";
import Skills from "./Skills";

FormSection.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  visited: PropTypes.shape({
    current: PropTypes.number.isRequired,
  }).isRequired,
};

function FormSection({ setIsLoading, visited }) {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [AIGeneratedSummary, setAIGeneratedSummary] = useState([]);

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="outline" size="sm" className="flex gap-2">
            <LayoutGrid /> Theme
          </Button>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button onClick={() => setActiveFormIndex((value) => value - 1)}>
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex <= 4 && (
            <Button
              className="flex gap-2"
              onClick={() => setActiveFormIndex((value) => value + 1)}
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
