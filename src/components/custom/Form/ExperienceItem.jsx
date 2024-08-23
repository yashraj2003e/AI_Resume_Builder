import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import TextEditor from "../TextEditor";
import propTypes from "prop-types";
import { convertToArray, reverseDate } from "../../../../service/utils";

ExperienceItem.propTypes = {
  setTotalExperience: propTypes.func.isRequired,
  totalExperience: propTypes.number.isRequired,
  setTabIndex: propTypes.func.isRequired,
  tabIndex: propTypes.number.isRequired,
  data1: propTypes.arrayOf(propTypes.any).isRequired,
  setData1: propTypes.func.isRequired,
  experienceList: propTypes.object.isRequired,
};

function ExperienceItem({
  setTotalExperience,
  totalExperience,
  setTabIndex,
  tabIndex,
  data1,
  setData1,
  experienceList,
}) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workSummary, setWorkSummary] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  useEffect(() => {
    setTitle(experienceList.title || "");
    setCompanyName(experienceList.companyName || "");
    setCity(experienceList.state || "");
    setStartDate(
      experienceList.startDate ? reverseDate(experienceList.startDate) : ""
    );
    setEndDate(
      experienceList.endDate ? reverseDate(experienceList.endDate) : ""
    );
    setWorkSummary(experienceList.workSummaryRaw || "");
    setCurrentlyWorking(experienceList.currentlyWorking || false);
  }, [experienceList]);

  function updateData(operation) {
    if (operation === "next") {
      setTabIndex((index) => index + 1);
    } else if (operation === "back") {
      setTabIndex((index) => (index > 0 ? index - 1 : index));
    } else if (operation === "save") {
      const updatedData = data1.map((item, index) => {
        if (index === tabIndex) {
          return {
            ...item,
            title,
            companyName,
            state: city,
            startDate: reverseDate(startDate),
            endDate: endDate ? reverseDate(endDate) : "",
            workSummaryRaw: workSummary,
            workSummary: convertToArray(workSummary),
            currentlyWorking,
          };
        }
        return item;
      });
      setData1(updatedData);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateData("save");
  }

  function handleAddExperience() {
    const newTabIndex = totalExperience;
    setTotalExperience((value) => value + 1);
    setTabIndex(newTabIndex);
  }

  function handleDeleteExperience() {
    setTotalExperience((value) => (value > 1 ? value - 1 : value));
    const newData = data1.filter((item) => item.id !== tabIndex);
    setData1(newData);
    setTabIndex((value) => (value > 0 ? value - 1 : 0));
  }

  function handleUpdates(e) {
    const { name, value } = e.target;

    const actions = {
      title: setTitle,
      companyName: setCompanyName,
      city: setCity,
      startDate: setStartDate,
      endDate: setEndDate,
    };

    const update = actions[name];
    update(value);
  }

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
        <h2 className="font-bold text-2xl">
          Experience {tabIndex + 1}{" "}
          {tabIndex === 3 ? "(Maximum of 4 Experiences can be added)" : ""}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 mt-2 gap-3">
            <div>
              <label className="text-lg">Job Title</label>
              <Input name="title" value={title} onChange={handleUpdates} />
            </div>
            <div>
              <label className="text-lg">Company Name</label>
              <Input
                name="companyName"
                value={companyName}
                onChange={handleUpdates}
              />
            </div>
            <div className="col-span-2 mt-1">
              <label className="text-lg">Job Location</label>
              <Input name="city" value={city} onChange={handleUpdates} />
            </div>
            <div className="mt-1">
              <label className="text-lg">Start Date</label>
              <Input
                name="startDate"
                type="date"
                value={startDate}
                onChange={handleUpdates}
              />
            </div>
            <div className="mt-1">
              <label className="text-lg">End Date</label>
              <Input
                name="endDate"
                disabled={currentlyWorking}
                type="date"
                value={endDate}
                onChange={handleUpdates}
              />
            </div>
            <div className="col-start-2">
              <span className="space-x-2 ">
                <input
                  onChange={() => setCurrentlyWorking((value) => !value)}
                  type="checkbox"
                  checked={currentlyWorking}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 
                  focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  id="endDateInput"
                />
                <label className="text-lg" htmlFor="endDateInput">
                  Currently Working
                </label>
              </span>
            </div>
            <div className="col-span-2 mt-[-1rem]">
              <label className="text-lg">Job Summary</label>
              <TextEditor value1={workSummary} setValue={setWorkSummary} />
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="space-x-2">
              {tabIndex < 3 && (
                <Button
                  variant="outline"
                  className="text-primary  border-primary"
                  onClick={handleAddExperience}
                  type="button"
                >
                  + Add More Experience
                </Button>
              )}
              {tabIndex > 0 && tabIndex === totalExperience - 1 && (
                <Button
                  variant="outline"
                  className="text-primary  border-primary"
                  onClick={handleDeleteExperience}
                  type="button"
                >
                  - Delete
                </Button>
              )}
            </div>
            <div className="space-x-2">
              {tabIndex > 0 && totalExperience > 1 && (
                <Button
                  type="button"
                  onClick={() => {
                    updateData("back");
                  }}
                >
                  Back
                </Button>
              )}
              {tabIndex < totalExperience - 1 && totalExperience > 1 && (
                <Button
                  type="button"
                  onClick={() => {
                    updateData("next");
                  }}
                >
                  Next
                </Button>
              )}
              <Button>Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperienceItem;
