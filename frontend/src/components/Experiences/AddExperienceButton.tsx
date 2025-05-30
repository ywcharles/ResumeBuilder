import React, { useState } from 'react';
import ExperienceFormModal, { ExperienceFormData } from './ExperienceFormModal';

interface AddExperienceButtonProps {
  onAdd?: (data: ExperienceFormData) => void;
}

const AddExperienceButton: React.FC<AddExperienceButtonProps> = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ExperienceFormData>({
    companyName: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    bullets: [{ content: '' }],
  });

  const handleSubmit = (data: ExperienceFormData) => {
    if (onAdd) {
      onAdd(data);
    }
    console.log('Submitted experience:', data);
    // Reset form
    setFormData({
      companyName: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: [{ content: '' }],
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        onClick={() => setShowForm(true)}
        className="cursor-pointer bg-sky-400 text-white font-medium w-[80%] flex flex-col rounded-md justify-start items-center py-5 hover:bg-sky-500"
      >
        Add a New Experience
      </div>

      <ExperienceFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default AddExperienceButton;