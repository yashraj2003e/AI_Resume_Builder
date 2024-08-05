import { useUser } from "@clerk/clerk-react";
import AddResume from "../components/custom/Resume/AddResume";
import GlobalAPI from "../../service/GlobalAPI";
import { useEffect, useState } from "react";
import ResumeItem from "../components/custom/Resume/ResumeItem";
import Loader2 from "../components/custom/Loader2";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getResumesList() {
      if (user?.primaryEmailAddress?.emailAddress && resumeList.length === 0) {
        setIsLoading(true);
        const response = await GlobalAPI.getUserResumes(
          user.primaryEmailAddress.emailAddress
        );
        setIsLoading(false);
        setResumeList(response.data.data);
      }
    }

    if (user) {
      getResumesList();
    }
  }, [resumeList.length, user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating AI resume to your next Job Role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 mb-2">
        {isLoading && <Loader2 />}
        <AddResume isLoading={isLoading} setIsLoading={setIsLoading} />
        {resumeList.map((resume, index) => (
          <ResumeItem key={index} resume={resume} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
