import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import TextEditor from "../TextEditor";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState(formField);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="max-h-[100dvh]">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        {isLoading && <Loader2 />}
        <h2 className="font-bold text-lg">Experience</h2>
        <form>
          <div className="grid grid-cols-2 mt-2 gap-3">
            <div>
              <label className="text-sm">Job Title</label>
              <Input name="firstName" required />
            </div>
            <div>
              <label className="text-sm">Company Name</label>
              <Input name="lastName" />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Job Location</label>
              <Input name="jobTitle" required />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input name="address" required />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input name="phone" />
            </div>
            <div className="col-span-2">
              <label>Job Summary</label>
              <TextEditor />
            </div>
          </div>
        </form>
        <div className="flex justify-between mt-3">
          <Button variant="outline" className="text-primary  border-primary">
            + Add More Experience
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
