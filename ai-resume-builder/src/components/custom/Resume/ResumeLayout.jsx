import { ResumeProvider } from "../../../contexts/ResumeContext";
import EditResume from "../../../Pages/EditResume";

function ResumeLayout() {
  return (
    <ResumeProvider>
      <EditResume />
    </ResumeProvider>
  );
}

export default ResumeLayout;
