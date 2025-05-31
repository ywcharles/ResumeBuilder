import React, { useState } from "react";
import ResumeFormModal, { ResumeFormData } from "./ResumeFormModal";
import { Pencil} from "lucide-react";

interface EditResumeTitleButtonProps {
  onAdd: (data: ResumeFormData) => void;
  loading?: boolean;
  resumeName: string;
}

const EditResumeTitleButton: React.FC<EditResumeTitleButtonProps> = ({ onAdd, loading = false , resumeName}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ResumeFormData>({resumeName:resumeName});

  const handleSubmit = async (data: ResumeFormData) => {
    if (onAdd) {
      await onAdd(data);
    }
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setShowForm(true)}
        disabled={loading}
        className="text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        <Pencil size={18} />
      </button>

      <ResumeFormModal
        isOpen={showForm}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default EditResumeTitleButton;