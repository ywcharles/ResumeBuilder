import { Plus, Trash2, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, SkillsSection } from '../../../types';
import Button from '../../../ui/Button';
import { useSkills } from '../../../hooks/useSkills';
import useUser from '../../../Store/useUserStore';

interface SkillsEditorProps {
  section: ResumeSection;
}

const SkillsEditor = ({ section }: SkillsEditorProps) => {
  const [user] = useUser();
  const { updateSectionContent, isLoadingResume } = useResumeStore();
  const { skillsBank, isLoading, error, fetchSkillsBank } = useSkills();
  const [showBank, setShowBank] = useState(false);
  const skillsData = section.content as SkillsSection;
  
  const addSkill = () => {
    const updatedSkills = [...skillsData.skills, ''];
    const updatedContent: SkillsSection = {
      skills: updatedSkills
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const updateSkill = (index: number, value: string) => {
    const updatedSkills = [...skillsData.skills];
    updatedSkills[index] = value;
    
    const updatedContent: SkillsSection = {
      skills: updatedSkills
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = [...skillsData.skills];
    updatedSkills.splice(index, 1);
    
    const updatedContent: SkillsSection = {
      skills: updatedSkills
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  const addFromBank = () => {
    setShowBank(true);
    if (user?.id) {
      fetchSkillsBank();
    }
  };

  const addSkillFromBank = (skill: string) => {
    if (skillsData.skills.includes(skill)) {
      return;
    }
    
    const updatedSkills = [...skillsData.skills, skill];
    const updatedContent: SkillsSection = {
      skills: updatedSkills
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  const isSkillAlreadyAdded = (skill: string): boolean => {
    return skillsData.skills.includes(skill);
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading skills...</div>
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
            onClick={addSkill}
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            Add New Skill
          </Button>
          
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={addFromBank}
            className="bg-white hover:bg-gray-50 border-gray-300"
            disabled={!user}
            title={!user ? "Please log in to use skills bank" : "Add from your skills bank"}
          >
            From Bank
          </Button>
        </div>

        {/* Skills Bank Modal/Dropdown */}
        {showBank && (
          <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium text-blue-900">Skills Bank</h4>
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
                Loading skills bank...
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">
                {error}
              </div>
            ) : skillsBank && skillsBank.skills.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skillsBank.skills.map((skill, index) => {
                  const isAlreadyAdded = isSkillAlreadyAdded(skill);
                  return (
                    <div key={index} className="flex items-center justify-between p-2 bg-white border border-blue-200 rounded">
                      <span className="text-sm text-gray-700 flex-1">{skill}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addSkillFromBank(skill)}
                        disabled={isAlreadyAdded}
                        className={`ml-2 text-xs ${
                          isAlreadyAdded 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100'
                        }`}
                      >
                        {isAlreadyAdded ? <Check size={12} /> : <Plus size={12} />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : skillsBank && skillsBank.skills.length === 0 ? (
              <div className="text-center py-4 text-blue-700">
                No skills found in your bank. Add some skills first!
              </div>
            ) : null}
          </div>
        )}
        
        <h4 className="text-md font-medium text-gray-700 mb-3">Selected Skills:</h4>
      </div>

      <div className="space-y-4">
        <div>
          <div className="space-y-2">
            {skillsData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a skill..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto w-auto text-red-500 hover:text-red-700"
                  onClick={() => removeSkill(index)}
                  disabled={skillsData.skills.length <= 1}
                  title="Remove skill"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {skillsData.skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No skills selected. Use the buttons above to add your skills.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsEditor;