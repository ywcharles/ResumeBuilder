import React, { ChangeEvent, FormEvent } from 'react';
import { Trash2 } from 'lucide-react';

export interface ExperienceFormData {
  company_name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  bullet_points: string[];
}

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  formData: ExperienceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ExperienceFormData>>;
}

const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBulletPointChange = (index: number, value: string) => {
    const newBullets = [...formData.bullet_points];
    newBullets[index] = value;
    setFormData(prev => ({ ...prev, bullet_points: newBullets }));
  };

  const addBulletPoint = () => {
    setFormData(prev => ({ ...prev, bullet_points: [...prev.bullet_points, ''] }));
  };

  const removeBulletPoint = (index: number) => {
    const updatedBullets = [...formData.bullet_points];
    updatedBullets.splice(index, 1);
    setFormData(prev => ({ ...prev, bullet_points: updatedBullets }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-xl rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Experience Form</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <label className="block font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <label className="block font-medium mb-1">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <div className="mb-4">
            <label className="block font-medium mb-2">Bullet Points</label>
            {formData.bullet_points.map((point, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handleBulletPointChange(i, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={`Bullet Point ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeBulletPoint(i)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Trash2/>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBulletPoint}
              className="text-sky-600 text-sm mt-1"
            >
              + Add Bullet Point
            </button>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:bg-red-400 hover:text-white rounded px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceFormModal;
