import FormSection from "../components/custom/Form/FormSection";
import { ResumeProvider } from "../contexts/ResumeContext";
import PersonalDetailsPreview from "../components/custom/Resume/PersonalDetailsPreview";

function EditResume() {
  return (
    <ResumeProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 py-4 max-h-[100dvh]">
        <FormSection />
        <PersonalDetailsPreview />
      </div>
    </ResumeProvider>
  );
}

export default EditResume;
