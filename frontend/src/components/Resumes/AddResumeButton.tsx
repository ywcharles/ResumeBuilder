import React, { useState } from "react";
import ResumeFormModal, { ResumeFormData } from "./ResumeFormModal";

interface AddResumeButtonProps {
  onAdd?: (data: ResumeFormData) => void;
  loading?: boolean;
}

const getInitialFormData = (): ResumeFormData => ({
  resumeName: "",
});

const AddResumeButton: React.FC<AddResumeButtonProps> = ({ onAdd, loading = false }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ResumeFormData>(getInitialFormData());

  const handleSubmit = async (data: ResumeFormData) => {
    if (onAdd) {
      await onAdd(data);
    }
    setFormData(getInitialFormData());
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
    setFormData(getInitialFormData());
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setShowForm(true)}
        disabled={loading}
        className="cursor-pointer bg-sky-400 text-white font-medium w-[80%] flex flex-col rounded-md justify-center items-center py-5 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Adding Resume..." : "Add a New Resume"}
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

export default AddResumeButton;