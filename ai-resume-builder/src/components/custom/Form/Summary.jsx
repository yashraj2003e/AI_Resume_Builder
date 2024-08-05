/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useResumeContext } from "../../../contexts/ResumeContext";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { AIModel } from "../../../../service/AIModel";
import { toast, Toaster } from "react-hot-toast";
import Loader2 from "../Loader2";
import { Brain } from "lucide-react";
import PropTypes from "prop-types";

const Summary = ({ AIGeneratedSummary, setAIGeneratedSummary }) => {
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e) {
    setResumeInfo({ ...resumeInfo, ["summary"]: e.target.value });
  }

  const GenerateSummaryFromAI = async () => {
    if (resumeInfo.summary.length < 100) {
      toast.error("Job summary must be of at least 100 words!", {
        style: {
          minWidth: "26vw",
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = AIModel.sendMessage(
        `Modify this job summary to put in resume and return multiple job summaries like this in json format of this type {summary:[multiple job summaries delimited with comma]}, here is the original job summary => ${resumeInfo.summary}`
      );

      const AIResponse = await result;
      const responseText = AIResponse.response.text();
      const parsedResponse = JSON.parse(responseText);
      setAIGeneratedSummary(parsedResponse.summary);
    } catch (e) {
      console.error(e);
      toast.error("Some Error Occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  function onSave(e) {
    e.preventDefault();
  }

  return (
    <div className="max-h-[100dvh]">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        {isLoading && <Loader2 />}
        <h2 className="font-bold text-lg">Summary</h2>
        <form onSubmit={onSave}>
          <div>
            <div className="flex justify-between items-center">
              <label>Add Summary for your job title</label>
              <Button
                className="border-primary text-primary gap-2"
                size="sm"
                variant="outline"
                onClick={GenerateSummaryFromAI}
              >
                <Brain /> Modify with AI
              </Button>
            </div>
            <Textarea
              className="mt-2"
              defaultValue={resumeInfo.summary}
              onChange={handleInputChange}
            />
            <div className="mt-2 text-right">
              <Button>Save</Button>
            </div>
          </div>
        </form>
        <Toaster />
      </div>
      {AIGeneratedSummary.length > 0 && (
        <div className="p-5 shadow-lg rounded-lg border-b-primary border-b-4 mt-5 overflow-scroll text-justify max-h-[30dvh]">
          {AIGeneratedSummary.map((item, index) => (
            <div key={index}>
              <p>{item}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Summary.propTypes = {
  AIGeneratedSummary: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAIGeneratedSummary: PropTypes.func.isRequired,
};

export default Summary;
