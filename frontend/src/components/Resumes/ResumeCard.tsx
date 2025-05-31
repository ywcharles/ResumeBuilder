import React from "react";
import { Resume } from "../../api/resumeApi";
import { ResumeFormData } from "./ResumeFormModal";

interface ResumeCardProp {
  resume: Resume
  onUpdate?: (id: string, data: ResumeFormData) => void;
  onDelete?: (id: string) => void;
  openResume: (id : number) => void;
  loading?: boolean;
}

const ResumeCard: React.FC<ResumeCardProp> = ({ resume, openResume }) => {
  return (
    //when click open resume in resume builder
    <div onClick={() => openResume(resume.id)} className="bg-gray-50 w-full p-4 rounded shadow hover:bg-gray-100 transition-colors">
      <h3 className="text-lg font-semibold">{resume.title}</h3>
      <p className="text-sm text-gray-500">
        Created:{new Date(resume.created_at).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        Last Updated: {new Date(resume.updated_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ResumeCard;