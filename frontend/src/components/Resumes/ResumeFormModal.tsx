import React, { ChangeEvent, FormEvent } from "react";

export interface ResumeFormData {
  resumeName: string;
}

interface ResumeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ResumeFormData) => void;
  formData: ResumeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
}

const ResumeFormModal: React.FC<ResumeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, resumeName: e.target.value }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Resume Name</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="resumeName"
            placeholder="Resume Name"
            value={formData.resumeName}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:bg-red-400 hover:text-white rounded px-4 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeFormModal;