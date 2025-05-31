import { Resume } from "../../api/resumeApi";
import { Trash2, Copy} from "lucide-react";
import EditResumeTitleButton from "./EditResumeTitleButton";


interface ResumeCardProp {
  resume: Resume
  onUpdate: (id: number, newTitle: string) => Promise<void>;
  onDelete: (id: number) => void;
  onDuplicate:(id:number, name: string) => void;
  openResume: (id : number) => void;
  loading?: boolean;
}

const ResumeCard: React.FC<ResumeCardProp> = ({ resume, openResume, onDelete, onDuplicate, onUpdate }) => {
  return (
    //when click open resume in resume builder
    <div onClick={() => openResume(resume.id)} className="relative bg-gray-50 w-full p-4 rounded shadow hover:bg-gray-100 transition-colors">
      
      {/* Action Buttons */}
      <div
        className="absolute top-2 right-2 flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <EditResumeTitleButton
         onAdd={(data) => onUpdate(resume.id, data.resumeName)}
         resumeName={resume.title}/>
        <button
          className="text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete"
          onClick={() => {
            onDelete(resume.id);
          }}
        >
          <Trash2 size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-gray-800 transition-colors"
          title="Duplicate"
          onClick={()=>{
            onDuplicate(resume.id, resume.title);
          }}
        >
          {<Copy size={18} />}
        </button>
      </div>
      
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