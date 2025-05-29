import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import ExperienceFormModal, { ExperienceFormData } from "./ExperienceFormModal";

type Props = {
  experience_id: number;
  companyName: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  bulletPoints?: string[];
};

const ExperienceCard = (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  const [formData, setFormData] = useState<ExperienceFormData>({
    company_name: props.companyName,
    description: props.description,
    location: props.location,
    start_date: props.startDate,
    end_date: props.endDate,
    bullet_points: props.bulletPoints || [],
  });

  const handleEditSubmit = (data: ExperienceFormData) => {
    console.log("Edit experience:", data);
    // You can close modal here
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete experience with ID:", props.experience_id);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div
      className="relative bg-gray-50 w-full p-4 rounded shadow hover:bg-gray-100 transition"
      onClick={toggleExpand}
    >
      {/* Action Buttons */}
      <div
        className="absolute top-2 right-2 flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-600 hover:text-gray-800"
          title="Edit"
          onClick={() => setIsEditOpen(true)}
        >
          <Pencil size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          title="Delete"
          onClick={() => setIsDeleteConfirmOpen(true)}
        >
          <Trash2 size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          title={expanded ? "Hide details" : "Show details"}
          onClick={toggleExpand}
        >
          {expanded ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Experience Info */}
      <h3 className="text-lg font-semibold">{props.companyName}</h3>
      {props.location && <p className="text-sm text-gray-600">{props.location}</p>}
      {props.startDate && (
        <p className="text-sm text-gray-500">
          {props.startDate} – {props.endDate || "Present"}
        </p>
      )}

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-2">
          {props.description && (
            <p className="text-sm italic">{props.description}</p>
          )}
          {props.bulletPoints?.length ? (
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              {props.bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 mt-2">No bullet points added.</p>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <ExperienceFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Delete Experience</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete {props.companyName} experience?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded text-gray-600 border border-gray-300 hover:bg-gray-100"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
