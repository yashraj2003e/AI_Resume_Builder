import PersonalDetails from "./PersonalDetails";
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import Summary from "./Summary";
import Experience from "./Experience";
function FormSection() {
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
          <Button
            className="flex gap-2"
            onClick={() => setActiveFormIndex((value) => value + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/*Personal Details*/}
      {activeFormIndex == 1 && <PersonalDetails />}
      {activeFormIndex == 2 && (
        <Summary
          setAIGeneratedSummary={setAIGeneratedSummary}
          AIGeneratedSummary={AIGeneratedSummary}
        />
      )}
      {activeFormIndex === 3 && <Experience />}
    </div>
  );
}

export default FormSection;
