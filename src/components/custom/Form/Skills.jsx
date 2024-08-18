import PropTypes from "prop-types";
import SkillItem from "./SkillsItem";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Star from "../StarRating/Star";
import { Button } from "../../ui/button";
import { useResumeContext } from "../../../contexts/ResumeContext";

const data2 = [
  {
    id: 0,
    name: "",
    proficiency: 0,
  },
];

const emptyData = {
  id: 0,
  name: "",
  proficiency: 0,
};

function getNewArray(resumeInfo) {
  let newData = [...resumeInfo.skills];
  newData = newData.map((obj) => ({ ...obj, rating: obj.rating / 20 }));
  return newData;
}

function Skills() {
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [totalSkills, setTotalSkills] = useState(
    resumeInfo.skills.length > 0 ? resumeInfo.skills.length : 1
  );
  const [data, setData] = useState(
    resumeInfo.skills.length > 0 ? getNewArray(resumeInfo) : []
  );

  useEffect(() => {
    if (data.length === 0 && resumeInfo.skills.length > 0) {
      let newData = [...resumeInfo.skills];
      newData = newData.map((obj) => ({ ...obj, rating: obj.rating / 20 }));
      console.log(newData);
      setData(newData);
      setTotalSkills(resumeInfo.skills.length);
    }
  }, [resumeInfo, data]);

  function handleSave(e) {
    e.preventDefault();
    const newData = data.map((obj) => ({ ...obj, rating: obj.rating * 20 }));
    setResumeInfo((resume) => ({ ...resume, skills: newData }));
  }

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
        <h2 className="font-bold text-2xl">Skills</h2>
        <div>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-2 text-center text-lg">
              <label>Name</label>
              <label>Proficiency</label>
            </div>
            {Array.from({ length: totalSkills }, (_, i) => (
              <div key={i} className="grid grid-cols-2 mt-5">
                <div className="">
                  <Input
                    required
                    onChange={(e) => {
                      const existingEntry = data.find((obj) => obj.id === i);
                      if (!existingEntry) {
                        setData((prevData) => [
                          ...prevData,
                          { id: i, name: e.target.value },
                        ]);
                      } else {
                        const updatedData = data.map((obj) =>
                          obj.id === i ? { ...obj, name: e.target.value } : obj
                        );
                        setData(updatedData);
                      }
                    }}
                    value={data.find((obj) => obj.id === i)?.name || ""}
                  />
                </div>
                <div className="">
                  <Star
                    data={data}
                    setData={setData}
                    rating={data.find((obj) => obj.id === i)?.rating | 0}
                    starId={i}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center mt-3 w-full justify-between col-span-2">
              <Button
                variant="outline"
                className="border-primary text-primary"
                onClick={() => setTotalSkills((prev) => prev + 1)}
              >
                + Add More
              </Button>
              <Button variant="gooeyRight">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Skills;

/*

{Array.from({ length: totalSkills }, (_, i) => (
                <div key={i}>
                  <div>
                    <div className="mt-3">
                      <Input
                        required
                        onChange={(e) => {
                          const existingEntry = data.find(
                            (obj) => obj.id === i
                          );
                          if (!existingEntry) {
                            setData((prevData) => [
                              ...prevData,
                              { id: i, name: e.target.value },
                            ]);
                          } else {
                            const updatedData = data.map((obj) =>
                              obj.id === i
                                ? { ...obj, name: e.target.value }
                                : obj
                            );
                            setData(updatedData);
                          }
                        }}
                        value={data.find((obj) => obj.id === i)?.name || ""}
                      />
                    </div>
                    <div className="mt-3">
                      <Star
                        data={data}
                        setData={setData}
                        rating={data.find((obj) => obj.id === i)?.rating | 0}
                        starId={i}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              */
