import { PlusSquare } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import GlobalAPI from "../../../../service/GlobalAPI";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useKey } from "../../../../service/useKey";
import propType from "prop-types";

AddResume.propTypes = {
  isLoading: propType.bool.isRequired,
  setIsLoading: propType.func.isRequired,
};

function AddResume({ isLoading, setIsLoading }) {
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  async function createResume() {
    setIsLoading(true);
    // const data = {
    //   data: {
    //     title: resumeTitle,
    //     resumeId: crypto.randomUUID(),
    //     userEmail: user?.primaryEmailAddress?.emailAddress,
    //     userName: user?.fullName,
    //   },
    // };
    // const response = await GlobalAPI.CreateNewResume(data);
    setIsLoading(false);
    navigate(`/dashboard/resume/${123}/edit`);
  }

  useKey("enter", createResume);

  if (isLoading) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="p-14 py-24 items-center flex justify-center bg-secondary rounded-lg mt-10 h-[280px] hover:scale-105 transition-all hover:shadow-md hover:cursor-pointer border-dotted border-4">
            <PlusSquare />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              <p>Add title for your new resume:</p>
              <Input
                className="my-2"
                placeholder="Frontend Engineer Resume..."
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="text-right space-x-2">
              <DialogTrigger asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogTrigger>
              <Button
                disabled={!resumeTitle || isLoading}
                onClick={() => createResume()}
              >
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
