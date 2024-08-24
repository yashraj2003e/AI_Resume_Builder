import FormSection from "../components/custom/Form/FormSection";
import { ResumeProvider } from "../contexts/ResumeContext";
import PersonalDetailsPreview from "../components/custom/Resume/PersonalDetailsPreview";
import { useState } from "react";
import Loader2 from "../components/custom/Loader2";
import { ToastContainer, Zoom } from "react-toastify";

function EditResume() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ResumeProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-4 max-h-[100dvh]">
        {isLoading && <Loader2 />}
        <FormSection setIsLoading={setIsLoading} />
        <PersonalDetailsPreview setIsLoading={setIsLoading} />
        <ToastContainer
          transition={Zoom}
          hideProgressBar={true}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          autoClose={1000}
        />
      </div>
    </ResumeProvider>
  );
}

export default EditResume;
