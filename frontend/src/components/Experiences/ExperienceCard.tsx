import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import ExperienceFormModal, { ExperienceFormData } from "./ExperienceFormModal";

type Props = {
  experience_id: number;
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets?: string[];
  onUpdate?: (id: number, data: ExperienceFormData) => void;
  onDelete?: (id: number) => void;
  // Add these props to pass the raw dates
  rawStartDate?: string;
  rawEndDate?: string;
};

const ExperienceCard = (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  // Helper function to convert formatted date back to YYYY-MM-DD format
  const convertToDateInputFormat = (formattedDate: string): string => {
    if (!formattedDate || formattedDate === "Present") return "";
    
    try {
      // Parse the formatted date (e.g., "January 2024")
      const date = new Date(formattedDate + " 1"); // Add day for parsing
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}-01`; // Default to first day of month
    } catch (error) {
      console.warn("Could not parse date:", formattedDate);
      return "";
    }
  };

  const [formData, setFormData] = useState<ExperienceFormData>({
    companyName: props.companyName,
    position: props.position,
    location: props.location,
    // Use raw dates if available, otherwise convert formatted dates
    startDate: props.rawStartDate || convertToDateInputFormat(props.startDate),
    endDate: props.rawEndDate || convertToDateInputFormat(props.endDate),
    bullets: (props.bullets || []).map(bullet => ({ content: bullet })),
  });

  const handleEditSubmit = (data: ExperienceFormData) => {
    if (props.onUpdate) {
      props.onUpdate(props.experience_id, data);
    }
    console.log("Edit experience:", data);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.experience_id);
    }
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
      <p className="text-md font-medium text-gray-700">{props.position}</p>
      {props.location && <p className="text-sm text-gray-600">{props.location}</p>}
      {props.startDate && (
        <p className="text-sm text-gray-500">
          {props.startDate} – {props.endDate || "Present"}
        </p>
      )}

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-2">
          {props.bullets?.length ? (
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              {props.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
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