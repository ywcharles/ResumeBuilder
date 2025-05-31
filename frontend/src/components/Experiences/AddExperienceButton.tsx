import React, { useState } from 'react';
import ExperienceFormModal, { ExperienceFormData } from './ExperienceFormModal';

interface AddExperienceButtonProps {
  onAdd?: (data: ExperienceFormData) => void;
  loading?: boolean;
}

const getInitialFormData = (): ExperienceFormData => ({
  companyName: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  bullets: [{ content: '' }],
});

const AddExperienceButton: React.FC<AddExperienceButtonProps> = ({ onAdd, loading = false }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ExperienceFormData>(getInitialFormData());

  const handleSubmit = async (data: ExperienceFormData) => {
    if (onAdd) {
      await onAdd(data);
    }
    // Reset form after successful submission
    setFormData(getInitialFormData());
  };

  const handleClose = () => {
    setShowForm(false);
    // Reset form when closing
    setFormData(getInitialFormData());
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setShowForm(true)}
        disabled={loading}
        className="cursor-pointer bg-sky-400 text-white font-medium w-[80%] flex flex-col rounded-md justify-center items-center py-5 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Adding Experience...' : 'Add a New Experience'}
      </button>

      <ExperienceFormModal
        isOpen={showForm}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default AddExperienceButton;