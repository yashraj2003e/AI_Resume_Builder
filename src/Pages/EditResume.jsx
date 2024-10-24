import FormSection from "../components/custom/Form/FormSection";
import { useResumeContext } from "../contexts/ResumeContext";
import PersonalDetailsPreview from "../components/custom/Resume/PersonalDetailsPreview";
import Loader2 from "../components/custom/Loader2";
import { ToastContainer, Zoom } from "react-toastify";

function EditResume() {
  const { isLoading } = useResumeContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-4  max-h-[100dvh]">
      {isLoading && <Loader2 />}
      <FormSection />
      <PersonalDetailsPreview />
      <ToastContainer
        transition={Zoom}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={1000}
      />
    </div>
  );
}

export default EditResume;
