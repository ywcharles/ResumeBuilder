import { Plus, Trash2, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, ExperienceSection, ExperienceItem } from '../../../types';
import Button from '../../../ui/Button';
import { generateId } from '../../../utils/utils';
import { useExperiences } from '../../../hooks/useExperiences';
import useUser from '../../../Store/useUserStore';

interface ExperienceEditorProps {
  section: ResumeSection;
}

const formatDateForMonthInput = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString.substring(0, 7);
    }
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

const ExperienceEditor = ({ section }: ExperienceEditorProps) => {
  const [user] = useUser();
  const { updateSectionContent, isLoadingResume, currentResumeId } = useResumeStore();
  const { 
    experienceBank, 
    isLoading, 
    error, 
    fetchExperienceBank, 
    saveExperience, 
    addExistingExperienceToResume,
    updateExperience: updateExperienceInDb, 
    removeExperienceFromResume,
    deleteExperience 
  } = useExperiences();
  const [showBank, setShowBank] = useState(false);
  const experienceData = section.content as ExperienceSection;
  

  const addExperience = async () => {
    if (!user?.id || !currentResumeId) return;

    const newItem: ExperienceItem = {
      id: generateId(),
      company: 'New Company',
      position: 'Position Title',
      location: 'City, State',
      startDate: '',
      endDate: '',
      current: true,
      bullets: [{ content: '', tags: [] }]
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: [...experienceData.items, newItem]
    };
    
    updateSectionContent(section.id, updatedContent);

    try {
      const savedId = await saveExperience(newItem, currentResumeId);
      const finalContent: ExperienceSection = {
        ...updatedContent,
        items: updatedContent.items.map(item => 
          item.id === newItem.id ? { ...item, id: savedId } : item
        )
      };
      updateSectionContent(section.id, finalContent);
    } catch (error) {
      console.error('Failed to save experience:', error);
      updateSectionContent(section.id, experienceData);
    }
  };

  const addFromBank = () => {
    setShowBank(true);
    if (user?.id) {
      fetchExperienceBank();
    }
  };

  const addExperienceFromBank = async (bankExperience: ExperienceItem) => {
    if (!user?.id || !currentResumeId) return;

    // Add the experience to the current resume view immediately
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: [...experienceData.items, {
        ...bankExperience,
        fromBank: true,
        startDate: formatDateForMonthInput(bankExperience.startDate),
        endDate: formatDateForMonthInput(bankExperience.endDate),
      }]
    };
    
    updateSectionContent(section.id, updatedContent);
    setShowBank(false);

    try {
      // Link existing experience to this resume
      await addExistingExperienceToResume(bankExperience.id, currentResumeId);
    } catch (error) {
      console.error('Failed to add experience from bank:', error);
      // Rollback on error
      updateSectionContent(section.id, experienceData);
    }
  };
  
  const updateExperience = async (index: number, field: keyof ExperienceItem, value: any) => {
    if (experienceData.items[index].fromBank) {
      return;
    }

    const updatedItems = [...experienceData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    if (field === 'current' && value === true) {
      updatedItems[index].endDate = '';
    }
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);

    const item = updatedItems[index];
    if (item.id && !item.id.startsWith('new-') && !item.id.startsWith('temp-')) {
      try {
        await updateExperienceInDb(item.id, item);
      } catch (error) {
        console.error('Failed to update experience:', error);
      }
    }
  };
  
  const updateBullet = async (experienceIndex: number, bulletIndex: number, value: string) => {
    if (experienceData.items[experienceIndex].fromBank) {
      return;
    }

    const updatedItems = [...experienceData.items];
    const updatedBullets = [...updatedItems[experienceIndex].bullets];
    updatedBullets[bulletIndex] = {
      ...updatedBullets[bulletIndex],
      content: value
    };
    
    updatedItems[experienceIndex] = {
      ...updatedItems[experienceIndex],
      bullets: updatedBullets
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);

    const item = updatedItems[experienceIndex];
    if (item.id && !item.id.startsWith('new-') && !item.id.startsWith('temp-')) {
      try {
        await updateExperienceInDb(item.id, item);
      } catch (error) {
        console.error('Failed to update experience:', error);
      }
    }
  };
  
  const addBullet = async (experienceIndex: number) => {
    if (experienceData.items[experienceIndex].fromBank) {
      return;
    }

    const updatedItems = [...experienceData.items];
    updatedItems[experienceIndex] = {
      ...updatedItems[experienceIndex],
      bullets: [...updatedItems[experienceIndex].bullets, { content: '', tags: [] }]
    };
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);

    const item = updatedItems[experienceIndex];
    if (item.id && !item.id.startsWith('new-') && !item.id.startsWith('temp-')) {
      try {
        await updateExperienceInDb(item.id, item);
      } catch (error) {
        console.error('Failed to update experience:', error);
      }
    }
  };
  
  const removeBullet = async (experienceIndex: number, bulletIndex: number) => {
    if (experienceData.items[experienceIndex].fromBank) {
      return;
    }

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

    const item = updatedItems[experienceIndex];
    if (item.id && !item.id.startsWith('new-') && !item.id.startsWith('temp-')) {
      try {
        await updateExperienceInDb(item.id, item);
      } catch (error) {
        console.error('Failed to update experience:', error);
      }
    }
  };
  
  const removeExperience = async (index: number) => {
    const itemToRemove = experienceData.items[index];
    
    const updatedItems = [...experienceData.items];
    updatedItems.splice(index, 1);
    
    const updatedContent: ExperienceSection = {
      ...experienceData,
      items: updatedItems
    };
    
    updateSectionContent(section.id, updatedContent);

    if (itemToRemove.id && !itemToRemove.id.startsWith('new-') && !itemToRemove.id.startsWith('temp-')) {
      try {
        if (currentResumeId) {
          // Remove from resume but keep in bank
          await removeExperienceFromResume(currentResumeId, itemToRemove.id);
        }
      } catch (error) {
        console.error('Failed to remove experience from resume:', error);
      }
    }
  };

  const deleteExperienceFromBank = async (experienceId: string) => {
    try {
      await deleteExperience(experienceId);
      // Remove from current resume view if it's there
      const updatedContent: ExperienceSection = {
        ...experienceData,
        items: experienceData.items.filter(item => item.id !== experienceId)
      };
      updateSectionContent(section.id, updatedContent);
    } catch (error) {
      console.error('Failed to delete experience from bank:', error);
    }
  };

  const isExperienceAlreadyAdded = (bankExperience: ExperienceItem): boolean => {
    return experienceData.items.some(item => 
      item.id === bankExperience.id
    );
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
            disabled={!user}
            title={!user ? "Please log in to use experience bank" : "Add from your experience bank"}
          >
            From Bank
          </Button>
        </div>

        {/* Experience Bank Modal/Dropdown */}
        {showBank && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-700">Your Experience Bank</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBank(false)}
                className="p-1 h-auto w-auto text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </Button>
            </div>

            {isLoading && (
              <div className="text-center py-4 text-gray-500">
                Loading your experiences...
              </div>
            )}

            {error && (
              <div className="text-center py-4 text-red-500">
                {error}
              </div>
            )}

            {experienceBank && experienceBank.items.length > 0 ? (
              <div className="space-y-3">
                {experienceBank.items.map((experience) => (
                  <div key={experience.id} className="p-3 bg-white border border-gray-200 rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">
                          {experience.position} at {experience.company}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                        </p>
                        <div className="mt-2">
                          {experience.bullets.slice(0, 2).map((bullet, index) => (
                            <p key={index} className="text-sm text-gray-600">• {bullet.content}</p>
                          ))}
                          {experience.bullets.length > 2 && (
                            <p className="text-xs text-gray-400">
                              +{experience.bullets.length - 2} more bullet points
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {(() => {
                          const isAlreadyAdded = isExperienceAlreadyAdded(experience);
                          return (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addExperienceFromBank(experience)}
                              disabled={isAlreadyAdded}
                              className={`${
                                isAlreadyAdded 
                                  ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
                                  : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
                              }`}
                            >
                              {isAlreadyAdded ? 'Added' : 'Add'}
                            </Button>
                          );
                        })()}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteExperienceFromBank(experience.id)}
                          className="bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
                          title="Delete from bank (will remove from all resumes)"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : experienceBank && experienceBank.items.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No experiences found in your bank. Add some experiences first!
              </div>
            ) : null}
          </div>
        )}
        
        <h4 className="text-md font-medium text-gray-700 mb-3">Selected Experiences:</h4>
      </div>

      <div className="space-y-4">
        {experienceData.items.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium text-gray-800">{item.position} – {item.company}</h5>
                    {item.fromBank && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        From Bank (Read-only)
                      </span>
                    )}
                  </div>
                  {item.location && (
                    <p className="text-sm text-gray-600">{item.location}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.bullets.some(bullet => bullet.content.trim() === '') && (
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    (unused)
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto w-auto text-red-500 hover:text-red-700"
                  onClick={() => removeExperience(index)}
                  title="Remove from resume"
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
                    disabled={item.fromBank}
                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      item.fromBank ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                    }`}
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
                    disabled={item.fromBank}
                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      item.fromBank ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                    }`}
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
                  disabled={item.fromBank}
                  className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    item.fromBank ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                  }`}
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
                    disabled={item.fromBank}
                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      item.fromBank ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                    }`}
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
                      disabled={item.fromBank}
                      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        item.fromBank ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                )}
                
                <div className="flex items-end">
                  <div className="flex items-center h-10">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                      disabled={item.fromBank}
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                        item.fromBank ? 'cursor-not-allowed' : ''
                      }`}
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
                        value={bullet.content}
                        onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                        disabled={item.fromBank}
                        className={`flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          item.fromBank ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                        placeholder="Add accomplishment..."
                      />
                      {!item.fromBank && (
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
                      )}
                    </div>
                  ))}
                  {!item.fromBank && (
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Plus size={14} />}
                      onClick={() => addBullet(index)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2"
                    >
                      Add Bullet
                    </Button>
                  )}
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