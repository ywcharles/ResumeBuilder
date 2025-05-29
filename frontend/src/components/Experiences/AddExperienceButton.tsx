import React, { useState } from 'react';
import ExperienceFormModal, { ExperienceFormData } from './ExperienceFormModal';

const AddExperienceButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ExperienceFormData>({
    company_name: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    bullet_points: [''],
  });

  const handleSubmit = (data: ExperienceFormData) => {
    console.log('Submitted experience:', data);
    // Optionally reset form here
    setFormData({
      company_name: '',
      description: '',
      location: '',
      start_date: '',
      end_date: '',
      bullet_points: [''],
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
