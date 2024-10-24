import { createContext, useContext, useEffect, useState } from "react";
import dummy from "../data/dummy";
import propTypes from "prop-types";

const resumeContext = createContext();

ResumeProvider.propTypes = {
  children: propTypes.any.isRequired,
};

function ResumeProvider({ children }) {
  const [resumeInfo, setResumeInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  return (
    <resumeContext.Provider
      value={{ resumeInfo, setResumeInfo, isLoading, setIsLoading }}
    >
      {children}
    </resumeContext.Provider>
  );
}

function useResumeContext() {
  const data = useContext(resumeContext);
  if (data === undefined) {
    throw new Error("Context is being used outside of Context API !");
  }
  return data;
}

export { useResumeContext, ResumeProvider };
