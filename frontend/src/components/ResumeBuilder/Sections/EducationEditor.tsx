import { Plus, Trash2, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, EducationSection, EducationItem } from '../../../types';
import Button from '../../../ui/Button';
import { generateId } from '../../../utils/utils';
import { useEducation } from '../../../hooks/useEducation';
import useUser from '../../../Store/useUserStore';

interface EducationEditorProps {
  section: ResumeSection;
}

const EducationEditor = ({ section }: EducationEditorProps) => {
  const [user] = useUser();
  const { updateSectionContent } = useResumeStore();
  const { educationBank, isLoading, error, fetchEducationBank } = useEducation();
  const [showBank, setShowBank] = useState(false);
  const educationData = section.content as EducationSection;

  useEffect(() => {
    if (educationData.items.length === 0 && user?.id) {
      setShowBank(true);
      fetchEducationBank();
    }
  }, [educationData.items.length, user?.id, fetchEducationBank]);
  
  const addEducation = () => {
    const newItem: EducationItem = {
      id: generateId(),
      institution: 'University Name',
      degree: 'Degree Type',
      field: 'Field of Study',
      location: 'City, State',
      startDate: '',
      endDate: '',
    };
    
    const updatedContent: EducationSection = {
      ...educationData,
      items: [...educationData.items, newItem]
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  const addFromBank = () => {
    setShowBank(true);
    if (user?.id) {
      fetchEducationBank();
    }
  };

  const addEducationFromBank = (bankEducation: EducationItem) => {
    const newItem: EducationItem = {
      ...bankEducation,
      id: generateId(),
    };
    
    const updatedContent: EducationSection = {
      ...educationData,
      items: [...educationData.items, newItem]
    };
    
    updateSectionContent(section.id, updatedContent);
    setShowBank(false);
  };

  const isEducationAlreadyAdded = (education: EducationItem): boolean => {
    return educationData.items.some(item => 
      item.institution === education.institution && 
      item.degree === education.degree &&
      item.field === education.field
    );
  };
  
  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updatedItems = [...educationData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    const updatedContent: EducationSection = {
      ...educationData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const removeEducation = (index: number) => {
    if (educationData.items.length <= 1) return;
    
    const updatedItems = [...educationData.items];
    updatedItems.splice(index, 1);
    
    const updatedContent: EducationSection = {
      ...educationData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading education...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex gap-3 mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={addEducation}
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            Add New Education
          </Button>
          
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={addFromBank}
            className="bg-white hover:bg-gray-50 border-gray-300"
            disabled={!user}
            title={!user ? "Please log in to use education bank" : "Add from your education bank"}
          >
            From Bank
          </Button>
        </div>

        {/* Education Bank Modal/Dropdown */}
        {showBank && (
          <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium text-blue-900">Education Bank</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBank(false)}
                className="text-blue-700 hover:text-blue-900"
              >
                <X size={16} />
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-4 text-blue-700">
                Loading education bank...
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">
                {error}
              </div>
            ) : educationBank && educationBank.items.length > 0 ? (
              <div className="space-y-3">
                {educationBank.items.map((education, index) => {
                  const isAlreadyAdded = isEducationAlreadyAdded(education);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{education.institution}</div>
                        <div className="text-sm text-gray-600">
                          {education.degree}{education.field ? `, ${education.field}` : ''}
                        </div>
                        <div className="text-xs text-gray-500">
                          {education.startDate} - {education.endDate}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addEducationFromBank(education)}
                        disabled={isAlreadyAdded}
                        className={`ml-2 ${
                          isAlreadyAdded 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100'
                        }`}
                      >
                        {isAlreadyAdded ? <Check size={16} /> : <Plus size={16} />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : educationBank && educationBank.items.length === 0 ? (
              <div className="text-center py-4 text-blue-700">
                No education found in your bank. Add some education first!
              </div>
            ) : null}
          </div>
        )}

        <div className="space-y-6">
          {educationData.items.map((item, index) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Education {index + 1}</h4>
                {educationData.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto w-auto text-red-500 hover:text-red-700"
                    onClick={() => removeEducation(index)}
                    title="Remove education"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Bachelor of Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={item.field}
                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => updateEducation(index, 'location', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City, State"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={item.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={item.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3.8"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional information about your education..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          
          {educationData.items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No education selected. Use the buttons above to add your education.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationEditor;