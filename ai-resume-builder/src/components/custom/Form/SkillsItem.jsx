import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Star from "../StarRating/Star";
import { Button } from "../../ui/button";

function SkillItem({
  tabIndex,
  totalExperience,
  setTabIndex,
  setTotalExperience,
  setData1,
  data1,
  experienceList,
}) {
  const [skillDetails, setSkillDetails] = useState({
    name: "",
    proficiency: 5,
  });

  useEffect(() => {
    setSkillDetails({
      name: experienceList.name || "",
      proficiency: experienceList.proficiency || 5,
    });
  }, [experienceList]);

  function updateData(operation) {
    if (operation === "next") {
      setTabIndex((index) => index + 1);
    } else if (operation === "back") {
      setTabIndex((index) => index - 1);
    } else if (operation === "save") {
      return;
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

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
        <h2 className="font-bold text-2xl">
          Skill {tabIndex + 1}{" "}
          {tabIndex === 3
            ? "(Maximum of 4 Educational Details can be added)"
            : ""}
        </h2>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <div>
            <label className="text-md">Name</label>
          </div>
          <div>
            <label className="text-md">Proficiency</label>
          </div>
          <div>
            <Input />
          </div>
          <div>
            <Star
              rating={skillDetails.proficiency}
              setRating={setSkillDetails}
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
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillItem;
