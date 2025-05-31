import React, { ChangeEvent, FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { ExperienceItem } from '../../types';

export interface ExperienceFormData {
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: Array<{ content: string }>;
}

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  formData: ExperienceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ExperienceFormData>>;
}

// Helper functions for data transformation
export const transformExperienceItemToFormData = (item: ExperienceItem): ExperienceFormData => ({
  companyName: item.company,
  position: item.position,
  location: item.location,
  startDate: item.startDate,
  endDate: item.endDate,
  current: item.current,
  bullets: item.bullets.map(bullet => ({ content: bullet }))
});

export const transformFormDataToExperienceItem = (formData: ExperienceFormData, id?: string): ExperienceItem => ({
  id: id || '',
  company: formData.companyName,
  position: formData.position,
  location: formData.location,
  startDate: formData.startDate,
  endDate: formData.current ? '' : formData.endDate,
  current: formData.current,
  bullets: formData.bullets
    .map(bullet => bullet.content.trim())
    .filter(content => content.length > 0)
});

const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: checked,
        // Clear end date if marking as current
        ...(name === 'current' && checked ? { endDate: '' } : {})
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBulletPointChange = (index: number, value: string) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = { content: value };
    setFormData(prev => ({ ...prev, bullets: newBullets }));
  };

  const addBulletPoint = () => {
    setFormData(prev => ({ ...prev, bullets: [...prev.bullets, { content: '' }] }));
  };

  const removeBulletPoint = (index: number) => {
    if (formData.bullets.length > 1) {
      const updatedBullets = [...formData.bullets];
      updatedBullets.splice(index, 1);
      setFormData(prev => ({ ...prev, bullets: updatedBullets }));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-xl rounded-lg p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Experience Form</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position/Job Title"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="mb-3">
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={handleInputChange}
                className="rounded"
              />
              <span className="font-medium">I currently work here</span>
            </label>
          </div>

          {!formData.current && (
            <div className="mb-3">
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                required={!formData.current}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block font-medium mb-2">Bullet Points</label>
            {formData.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={bullet.content}
                  onChange={(e) => handleBulletPointChange(i, e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder={`Bullet Point ${i + 1}`}
                />
                {formData.bullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(i)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    title="Remove bullet point"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addBulletPoint}
              className="text-sky-600 text-sm mt-1 hover:text-sky-700 transition-colors"
            >
              + Add Bullet Point
            </button>
          </div>

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

export default ExperienceFormModal;