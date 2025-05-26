import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, ExperienceSection, ExperienceItem } from '../../../types';
import Button from '../../../ui/Button';
import { generateId } from '../../../utils/utils';

interface ExperienceEditorProps {
  section: ResumeSection;
}

const ExperienceEditor = ({ section }: ExperienceEditorProps) => {
  const { updateSectionContent } = useResumeStore();
  const experienceData = section.content as ExperienceSection;
  
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: generateId(),
      company: 'New Company',
      position: 'Position Title',
      location: 'City, State',
      startDate: '',
      endDate: '',
      current: true,
      description: [],
      bullets: ['']
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: [...experienceData.items, newItem]
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updatedItems = [...experienceData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // If "current" is checked, clear the end date
    if (field === 'current' && value === true) {
      updatedItems[index].endDate = '';
    }
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const updateBullet = (experienceIndex: number, bulletIndex: number, value: string) => {
    const updatedItems = [...experienceData.items];
    const updatedBullets = [...updatedItems[experienceIndex].bullets];
    updatedBullets[bulletIndex] = value;
    
    updatedItems[experienceIndex] = {
      ...updatedItems[experienceIndex],
      bullets: updatedBullets
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const addBullet = (experienceIndex: number) => {
    const updatedItems = [...experienceData.items];
    updatedItems[experienceIndex] = {
      ...updatedItems[experienceIndex],
      bullets: [...updatedItems[experienceIndex].bullets, '']
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const removeBullet = (experienceIndex: number, bulletIndex: number) => {
    const updatedItems = [...experienceData.items];
    const updatedBullets = [...updatedItems[experienceIndex].bullets];
    updatedBullets.splice(bulletIndex, 1);
    
    updatedItems[experienceIndex] = {
      ...updatedItems[experienceIndex],
      bullets: updatedBullets
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const removeExperience = (index: number) => {
    if (experienceData.items.length <= 1) return;
    
    const updatedItems = [...experienceData.items];
    updatedItems.splice(index, 1);
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="space-y-6">
        {experienceData.items.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Experience {index + 1}</h4>
              {experienceData.items.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto w-auto text-red-500 hover:text-red-700"
                  onClick={() => removeExperience(index)}
                  title="Remove experience"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
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
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {!item.current && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={item.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.current}
                  onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Current Position
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bullet Points
                </label>
                {item.bullets.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-start mb-2">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add accomplishment..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 p-1 h-auto w-auto text-red-500 hover:text-red-700"
                      onClick={() => removeBullet(index, bulletIndex)}
                      disabled={item.bullets.length <= 1}
                      title="Remove bullet"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => addBullet(index)}
                  className="mt-2"
                >
                  Add Bullet
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          leftIcon={<Plus size={16} />}
          onClick={addExperience}
          className="w-full"
        >
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceEditor;