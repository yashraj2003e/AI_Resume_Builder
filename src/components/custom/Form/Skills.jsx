import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Star from "../StarRating/Star";
import { Button } from "../../ui/button";
import { useResumeContext } from "../../../contexts/ResumeContext";
import GlobalAPI from "../../../../service/GlobalAPI";
import { useParams } from "react-router-dom";
import { getNewArray } from "../../../../service/utils";

function Skills() {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo, setIsLoading } = useResumeContext();
  const [totalSkills, setTotalSkills] = useState(0);
  const [data, setData] = useState(
    resumeInfo?.skills?.length > 0 ? resumeInfo?.skills : []
  );

  useEffect(() => setTotalSkills(data.length), [data.length]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       if (data.length === 0 && resumeInfo.skills.length === 0) {
  //         console.log("fetching skills data");
  //         setIsLoading(true);
  //         const data1 = await GlobalAPI.getUserResumeData(resumeId);
  //         const result = data1.data.data;
  //         if (result[0].userSkills.length > 0) {
  //           setData(result[0].userSkills);
  //           setResumeInfo((prev) => ({
  //             ...prev,
  //             skills: getNewArray(result[0].userSkills),
  //           }));
  //         }
  //       } else if (data.length === 0) {
  //         console.log("setting from resumeInfo Skills");
  //         console.log(resumeInfo.skills);
  //         setData(resumeInfo.skills);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getData();
  // }, [data, resumeId, resumeInfo.skills, setIsLoading, setResumeInfo]);

  // useEffect(() => {
  //   if (
  //     data.length === 0 &&
  //     resumeInfo.skills &&
  //     resumeInfo.skills.length > 0
  //   ) {
  //     let newData = [...resumeInfo.skills];
  //     newData = newData.map((obj) => ({ ...obj, rating: obj.rating }));
  //     console.log(newData);
  //     setData(newData);
  //     setTotalSkills(resumeInfo.skills.length);
  //   }
  // }, [resumeInfo, data]);

  function handleSave(e) {
    e.preventDefault();
    const newData = data.map((obj) => ({ ...obj, rating: obj.rating }));
    setResumeInfo((resume) => ({ ...resume, skills: getNewArray(newData) }));
    async function saveData() {
      try {
        console.log("Saving Data");
        setIsLoading(true);
        const data = {
          data: {
            userSkills: JSON.stringify(newData),
          },
        };
        const updatePromise = GlobalAPI.UpdateResumeDetails(resumeId, data);
        await updatePromise;
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    saveData();
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
                type="button"
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
