import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Trash2, X, Plus } from 'lucide-react';
import { ExperienceItem } from '../../types';
import { Tag, tagsApi } from '../../api/tagsApi';

export interface ExperienceFormData {
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: Array<{ content: string; tags: Tag[] }>;
}

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  formData: ExperienceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ExperienceFormData>>;
}

const formatDateForDateInput = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      return `${dateString}-01`;
    }
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date for date input:', error);
    return '';
  }
};

export const transformExperienceItemToFormData = (item: ExperienceItem): ExperienceFormData => ({
  companyName: item.company,
  position: item.position,
  location: item.location,
  startDate: formatDateForDateInput(item.startDate),
  endDate: formatDateForDateInput(item.endDate),
  current: item.current,
  bullets: item.bullets.map(bullet => ({ 
    content: bullet.content, 
    tags: bullet.tags.map(tag => ({ ...tag })) // Deep clone tags to prevent reference sharing
  }))
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
    .filter(bullet => bullet.content.trim().length > 0)
    .map(bullet => ({
      content: bullet.content.trim(),
      tags: bullet.tags.map(tag => ({ ...tag })) // Deep clone tags for consistency
    }))
});

const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (isOpen) {
      fetchTags();
    }
  }, [isOpen]);

  const fetchTags = async () => {
    try {
      const tags = await tagsApi.getAllTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

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
    newBullets[index] = { ...newBullets[index], content: value };
    setFormData(prev => ({ ...prev, bullets: newBullets }));
  };

  const addBulletPoint = () => {
    setFormData(prev => ({ ...prev, bullets: [...prev.bullets, { content: '', tags: [] }] }));
  };

  const removeBulletPoint = (index: number) => {
    if (formData.bullets.length > 1) {
      const updatedBullets = [...formData.bullets];
      updatedBullets.splice(index, 1);
      setFormData(prev => ({ ...prev, bullets: updatedBullets }));
    }
  };

  const addTagToBullet = (bulletIndex: number, tag: Tag) => {
    const newBullets = [...formData.bullets];
    const existingTags = newBullets[bulletIndex].tags;
    
    // Check if tag is already added
    if (!existingTags.some(existingTag => existingTag.id === tag.id)) {
      newBullets[bulletIndex] = {
        ...newBullets[bulletIndex],
        tags: [...existingTags, tag]
      };
      setFormData(prev => ({ ...prev, bullets: newBullets }));
    }
  };

  const removeTagFromBullet = (bulletIndex: number, tagId: number) => {
    const newBullets = [...formData.bullets];
    newBullets[bulletIndex] = {
      ...newBullets[bulletIndex],
      tags: newBullets[bulletIndex].tags.filter(tag => tag.id !== tagId)
    };
    setFormData(prev => ({ ...prev, bullets: newBullets }));
  };

  const createNewTag = async (bulletIndex: number) => {
    if (newTagName.trim()) {
      try {
        const newTag = await tagsApi.createTag(newTagName.trim());
        setAvailableTags(prev => [...prev, newTag]);
        addTagToBullet(bulletIndex, newTag);
        setNewTagName('');
        setShowNewTagInput(prev => ({ ...prev, [bulletIndex]: false }));
      } catch (error) {
        console.error('Failed to create tag:', error);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-2xl rounded-lg p-6 shadow-lg max-h-[90vh] overflow-y-auto">
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
              <div key={i} className="border border-gray-200 rounded p-3 mb-3 bg-gray-50">
                <div className="flex gap-2 items-start mb-2">
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
                
                {/* Current tags for this bullet */}
                {bullet.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {bullet.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => removeTagFromBullet(i, tag.id)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Available tags to add */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {availableTags
                    .filter(tag => !bullet.tags.some(bulletTag => bulletTag.id === tag.id))
                    .map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => addTagToBullet(i, tag)}
                        className="px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        + {tag.name}
                      </button>
                    ))}
                </div>

                {/* New tag input */}
                {showNewTagInput[i] ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      className="flex-1 p-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-sky-500"
                      placeholder="New tag name"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          createNewTag(i);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => createNewTag(i)}
                      className="px-2 py-1 text-xs bg-sky-500 text-white rounded hover:bg-sky-600"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewTagInput(prev => ({ ...prev, [i]: false }))}
                      className="px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowNewTagInput(prev => ({ ...prev, [i]: true }))}
                    className="text-xs text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={12} />
                    Add new tag
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