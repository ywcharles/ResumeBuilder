import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, EducationSection, EducationItem } from '../../../types';
import Button from '../../../ui/Button';
import { generateId } from '../../../utils/utils';

interface EducationEditorProps {
  section: ResumeSection;
}

const EducationEditor = ({ section }: EducationEditorProps) => {
  const { updateSectionContent } = useResumeStore();
  const educationData = section.content as EducationSection;
  
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

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-6">
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
          
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={addEducation}
            className="w-full"
          >
            Add Education
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationEditor;