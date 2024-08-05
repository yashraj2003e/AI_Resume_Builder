import { useParams } from "react-router-dom";
import { useResumeContext } from "../../../contexts/ResumeContext";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import GlobalAPI from "../../../../service/GlobalAPI";
import { useEffect, useState } from "react";
import Loader2 from "../Loader2";
import toast, { Toaster } from "react-hot-toast";

function PersonalDetails() {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useResumeContext();

  useEffect(() => {
    async function fetchData() {
      const response = await GlobalAPI.getUserResumeData(resumeId);
      const data = response.data.data[0];
      console.log(data);
    }
    fetchData();
  }, [resumeId]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setResumeInfo({ ...resumeInfo, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        data: {
          firstName: resumeInfo.firstName,
          lastName: resumeInfo.lastName,
          jobTitle: resumeInfo.jobTitle,
          address: resumeInfo.address,
          phone: resumeInfo.phone,
          email: resumeInfo.email,
        },
      };

      const updatePromise = GlobalAPI.UpdateResumeDetails(resumeId, data);

      toast.promise(updatePromise, {
        loading: "Loading",
        success: "Saved Successfully",
        error: "Error Saving Data",
      });

      await updatePromise;
    } catch (e) {
      toast.error("Error While Saving");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading && <Loader2 />}
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Personal Details</h2>
        <p>Get started with the basic information</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <label className="text-sm">First Name</label>
              <Input
                name="firstName"
                required
                value={resumeInfo.firstName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <Input
                name="lastName"
                value={resumeInfo.lastName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Job Title</label>
              <Input
                name="jobTitle"
                required
                value={resumeInfo.jobTitle || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Address</label>
              <Input
                name="address"
                required
                value={resumeInfo.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm">Phone</label>
              <Input
                name="phone"
                value={resumeInfo.phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input
                name="email"
                value={resumeInfo.email || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default PersonalDetails;
