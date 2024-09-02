import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import PropTypes from "prop-types";

EducationItem.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  totalExperience: PropTypes.number.isRequired,
  setTabIndex: PropTypes.func.isRequired,
  setTotalExperience: PropTypes.func.isRequired,
  setData1: PropTypes.func.isRequired,
  data1: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      universityName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      major: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      description: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  experienceList: PropTypes.object.isRequired,
};

function EducationItem({
  tabIndex,
  totalExperience,
  setTabIndex,
  setTotalExperience,
  setData1,
  data1,
  experienceList,
}) {
  const [educationalDetails, setEducationalDetails] = useState({
    universityName: "",
    location: "",
    major: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    setEducationalDetails({
      universityName: experienceList.universityName || "",
      location: experienceList.location || "",
      major: experienceList.major || "",
      degree: experienceList.degree || "",
      startDate: experienceList.startDate || "",
      endDate: experienceList.endDate || "",
      description: experienceList.description || "",
    });
  }, [experienceList]);

  function updateData(operation) {
    if (operation === "next") {
      setTabIndex((index) => index + 1);
    } else if (operation === "back") {
      setTabIndex((index) => index - 1);
    } else if (operation === "save") {
      const updatedData = data1.map((item, index) => {
        if (index === tabIndex) {
          return {
            ...item,
            universityName: educationalDetails.universityName,
            location: educationalDetails.location,
            major: educationalDetails.major,
            degree: educationalDetails.degree,
            startDate: educationalDetails.startDate,
            endDate: educationalDetails.endDate,
            description: educationalDetails.description,
          };
        }
        return item;
      });
      setData1(updatedData);
    }
  }

  function handleAppExperience() {
    const newTabIndex = totalExperience;
    setTotalExperience((value) => value + 1);
    setTabIndex(newTabIndex);
  }

  function handleDeleteExperience() {
    setTotalExperience((value) => (value > 1 ? value - 1 : value));
    setTabIndex((value) => (value > 0 ? value - 1 : 0));
  }

  function handleUpdate(e) {
    const { name, value } = e.target;
    setEducationalDetails((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(educationalDetails);
    updateData("save");
  }

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
        <h2 className="font-bold text-2xl">
          Education {tabIndex + 1}{" "}
          {tabIndex === 3
            ? "(Maximum of 4 Educational Details can be added)"
            : ""}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 mt-2 gap-3">
            <div>
              <label className="text-lg">Institute Name</label>
              <Input
                name="universityName"
                value={educationalDetails.universityName}
                onChange={handleUpdate}
              />
            </div>
            <div>
              <label className="text-lg">Location</label>
              <Input
                name="location"
                value={educationalDetails.location}
                onChange={handleUpdate}
              />
            </div>
            <div className="mt-1">
              <label className="text-lg">Degree</label>
              <Input
                name="degree"
                value={educationalDetails.degree}
                onChange={handleUpdate}
              />
            </div>
            <div className="mt-1">
              <label className="text-lg">Major</label>
              <Input
                name="major"
                value={educationalDetails.major}
                onChange={handleUpdate}
              />
            </div>
            <div className="mt-1">
              <label className="text-lg">Start Date</label>
              <Input
                name="startDate"
                type="date"
                value={educationalDetails.startDate}
                onChange={handleUpdate}
              />
            </div>
            <div className="mt-1">
              <label className="text-lg">End Date</label>
              <Input
                type="date"
                name="endDate"
                value={educationalDetails.endDate}
                onChange={handleUpdate}
              />
            </div>
            <div className="col-span-2 mt-1">
              <label className="text-lg">Add description</label>
              <Textarea
                name="description"
                value={educationalDetails.description}
                onChange={handleUpdate}
              />
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="space-x-2">
              {tabIndex < 3 && (
                <Button
                  variant="outline"
                  className="text-primary border-primary"
                  type="button"
                  onClick={handleAppExperience}
                >
                  + Add More{" "}
                </Button>
              )}
              {tabIndex > 0 && tabIndex === totalExperience - 1 && (
                <Button
                  variant="outline"
                  className="text-primary border-primary"
                  type="button"
                  onClick={handleDeleteExperience}
                >
                  - Delete
                </Button>
              )}
            </div>
            <div className="space-x-2">
              {tabIndex > 0 && totalExperience > 1 && (
                <Button type="button" onClick={() => updateData("back")}>
                  Back
                </Button>
              )}
              {tabIndex < totalExperience - 1 && totalExperience > 1 && (
                <Button type="button" onClick={() => updateData("next")}>
                  Next
                </Button>
              )}
              <Button variant="gooeyRight">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EducationItem;
