import PropTypes from "prop-types";
import SkillItem from "./SkillsItem";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Star from "../StarRating/Star";
import { Button } from "../../ui/button";

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

function Skills({ setIsLoading }) {
  const [totalSkills, setTotalSkills] = useState(5);
  const [data, setData] = useState([]);

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
        <h2 className="font-bold text-lg">Skills</h2>
        <div>
          <div className="grid grid-cols-2 mt-3 gap-y-2 gap-x-7">
            <label>Name</label>
            <label>Proficiency</label>
            {Array.from({ length: totalSkills }, (_, i) => (
              <>
                <div key={(i + 1) * 50} className="mt-3">
                  <Input />
                </div>
                <div className="mt-3" key={(i + 1) * 20}>
                  <Star
                    data={data}
                    setData={setData}
                    rating={data.find((obj) => obj.id === i)?.rating | 0}
                    starId={i}
                  />
                </div>
              </>
            ))}
          </div>
          <div className="flex items-center mt-3 w-full justify-center">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Skills.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default Skills;
