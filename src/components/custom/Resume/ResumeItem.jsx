import { Notebook } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ResumeItem = ({ resume }) => {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className="text-center">
        <div className="mt-10 p-14 bg-secondary h-[280px] flex items-center justify-center hover:scale-105 transition-all hover:shadow-md hover:cursor-pointer border-dotted border-4 mb-2">
          <Notebook />
        </div>
        <h2>{resume.title}</h2>
      </div>
    </Link>
  );
};

ResumeItem.propTypes = {
  resume: PropTypes.shape({
    documentId: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ResumeItem;
