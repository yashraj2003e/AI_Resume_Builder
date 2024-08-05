import { createContext, useContext, useEffect, useState } from "react";
import dummy from "../data/dummy";

const resumeContext = createContext();

function ResumeProvider({ children }) {
  const [resumeInfo, setResumeInfo] = useState([]);

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  return (
    <resumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
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
