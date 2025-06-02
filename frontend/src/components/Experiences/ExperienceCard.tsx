import { useState, useEffect } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import ExperienceFormModal, { 
  ExperienceFormData,
  transformExperienceItemToFormData 
} from "./ExperienceFormModal";
import { ExperienceItem } from "../../types";
import { formatDate } from "../../utils/utils";

interface ExperienceCardProps {
  experience: ExperienceItem;
  onUpdate?: (id: string, data: ExperienceFormData) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  onUpdate, 
  onDelete, 
  loading = false 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  // Deep clone the experience object for initial form data to prevent reference sharing
  const getInitialFormData = () => {
    const clonedExperience: ExperienceItem = {
      ...experience,
      bullets: experience.bullets.map(bullet => ({
        ...bullet,
        tags: bullet.tags.map(tag => ({ ...tag }))
      }))
    };
    return transformExperienceItemToFormData(clonedExperience);
  };
  
  const [formData, setFormData] = useState<ExperienceFormData>(() => getInitialFormData());

  // Update form data when experience prop changes
  useEffect(() => {
    const clonedExperience: ExperienceItem = {
      ...experience,
      bullets: experience.bullets.map(bullet => ({
        ...bullet,
        tags: bullet.tags.map(tag => ({ ...tag }))
      }))
    };
    setFormData(transformExperienceItemToFormData(clonedExperience));
  }, [experience]);

  const toggleExpand = () => setExpanded(!expanded);

  const handleEditSubmit = async (data: ExperienceFormData) => {
    if (onUpdate) {
      await onUpdate(experience.id, data);
    }
    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(experience.id);
    }
    setIsDeleteConfirmOpen(false);
  };

  const handleEditOpen = () => {
    // Deep clone the experience object to ensure no reference sharing
    const clonedExperience: ExperienceItem = {
      ...experience,
      bullets: experience.bullets.map(bullet => ({
        ...bullet,
        tags: bullet.tags.map(tag => ({ ...tag }))
      }))
    };
    
    // Transform the deeply cloned experience to form data
    setFormData(transformExperienceItemToFormData(clonedExperience));
    setIsEditOpen(true);
  };

  const displayStartDate = formatDate(experience.startDate);
  const displayEndDate = experience.current ? "Present" : formatDate(experience.endDate);

  return (
    <div className="relative bg-gray-50 w-full p-4 rounded shadow hover:bg-gray-100 transition-colors">
      {/* Action Buttons */}
      <div
        className="absolute top-2 right-2 flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          title="Edit"
          onClick={handleEditOpen}
          disabled={loading}
        >
          <Pencil size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete"
          onClick={() => setIsDeleteConfirmOpen(true)}
          disabled={loading}
        >
          <Trash2 size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-gray-800 transition-colors"
          title={expanded ? "Hide details" : "Show details"}
          onClick={toggleExpand}
        >
          {expanded ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Experience Info */}
      <div onClick={toggleExpand} className="cursor-pointer pr-20">
        <h3 className="text-lg font-semibold">{experience.company}</h3>
        <p className="text-md font-medium text-gray-700">{experience.position}</p>
        {experience.location && (
          <p className="text-sm text-gray-600">{experience.location}</p>
        )}
        {displayStartDate && (
          <p className="text-sm text-gray-500">
            {displayStartDate} – {displayEndDate}
          </p>
        )}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 border-t pt-3">
          {experience.bullets.length > 0 ? (
            <ul className="list-disc pl-5 text-sm space-y-3">
              {experience.bullets.map((bullet, index) => (
                <li key={index} className="text-gray-700">
                  <div className="space-y-2">
                    <span>{bullet.content}</span>
                    {bullet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {bullet.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No bullet points added.</p>
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
              Are you sure you want to delete the experience at <strong>{experience.company}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors"
                onClick={() => setIsDeleteConfirmOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;