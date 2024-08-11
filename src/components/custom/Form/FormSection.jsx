import PersonalDetails from "./PersonalDetails";
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Summary from "./Summary";
import Experience from "./Experience";
import PropTypes from "prop-types";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Education from "./Education";
// import toast, { Toaster } from "react-hot-toast";
FormSection.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  visited: PropTypes.shape({
    current: PropTypes.number.isRequired,
  }).isRequired,
};

function FormSection({ setIsLoading, visited }) {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [AIGeneratedSummary, setAIGeneratedSummary] = useState([]);

  const time = useRef(0);

  // useEffect(() => {
  //   console.log(time.current);
  //   if (activeFormIndex === 3 && time.current === 0) {
  //     console.log("LOL");
  //     time.current += 1;
  //     toast.info("Save to view changes !", { position: "top-center" });
  //     // toast("Save to view changes !", { duration: 3000, icon: "🗃️" });
  //   }
  // }, [activeFormIndex]);

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
    </div>
  );
}

export default FormSection;
