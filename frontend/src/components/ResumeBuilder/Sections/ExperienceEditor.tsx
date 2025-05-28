import { Plus, Trash2, Check, X } from 'lucide-react';
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

  const addFromBank = () => {
    // TODO: Implement experience bank functionality
    console.log('Add from bank - not implemented yet');
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
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex gap-3 mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={addExperience}
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            Add New Experience
          </Button>
          
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={addFromBank}
            className="bg-white hover:bg-gray-50 border-gray-300"
            disabled
            title="Experience bank feature coming soon"
          >
            From Bank
          </Button>
        </div>
        
        <h4 className="text-md font-medium text-gray-700 mb-3">Selected Experiences:</h4>
      </div>

      <div className="space-y-4">
        {experienceData.items.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-800">{item.position} – {item.company}</h5>
                  {item.location && (
                    <p className="text-sm text-gray-600">{item.location}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.bullets.some(bullet => bullet.trim() === '') && (
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    (unused)
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto w-auto text-red-500 hover:text-red-700"
                  onClick={() => removeExperience(index)}
                  title="Remove experience"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              
              <div className="flex flex-col sm:flex-row gap-3">
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
                
                <div className="flex items-end">
                  <div className="flex items-center h-10">
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
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bullet Points
                </label>
                <div className="space-y-2">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-2.5 text-xs">•</span>
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
                        className="p-1 h-auto w-auto text-red-500 hover:text-red-700 mt-1"
                        onClick={() => removeBullet(index, bulletIndex)}
                        disabled={item.bullets.length <= 1}
                        title="Remove bullet"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Plus size={14} />}
                    onClick={() => addBullet(index)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2"
                  >
                    Add Bullet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {experienceData.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No experiences selected. Use the buttons above to add your work experience.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceEditor;