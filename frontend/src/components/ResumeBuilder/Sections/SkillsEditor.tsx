import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, SkillsSection } from '../../../types';
import Button from '../../../ui/Button';
import { generateId } from '../../../utils/utils';

interface SkillsEditorProps {
  section: ResumeSection;
}

const SkillsEditor = ({ section }: SkillsEditorProps) => {
  const { updateSectionContent } = useResumeStore();
  const skillsData = section.content as SkillsSection;
  
  const addCategory = () => {
    const newCategory = {
      id: generateId(),
      name: 'New Category',
      skills: ['']
    };
    
    const updatedContent: SkillsSection = {
      ...skillsData,
      categories: [...skillsData.categories, newCategory]
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const updateCategory = (index: number, name: string) => {
    const updatedCategories = [...skillsData.categories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      name
    };
    
    const updatedContent: SkillsSection = {
      ...skillsData,
      categories: updatedCategories
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const removeCategory = (index: number) => {
    const updatedCategories = [...skillsData.categories];
    updatedCategories.splice(index, 1);
    
    const updatedContent: SkillsSection = {
      ...skillsData,
      categories: updatedCategories
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const updateSkill = (categoryIndex: number, skillIndex: number, value: string) => {
    const updatedCategories = [...skillsData.categories];
    const updatedSkills = [...updatedCategories[categoryIndex].skills];
    updatedSkills[skillIndex] = value;
    
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      skills: updatedSkills
    };
    
    const updatedContent: SkillsSection = {
      ...skillsData,
      categories: updatedCategories
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const addSkill = (categoryIndex: number) => {
    const updatedCategories = [...skillsData.categories];
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      skills: [...updatedCategories[categoryIndex].skills, '']
    };
    
    const updatedContent: SkillsSection = {
      ...skillsData,
      categories: updatedCategories
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...skillsData.categories];
    const updatedSkills = [...updatedCategories[categoryIndex].skills];
    updatedSkills.splice(skillIndex, 1);
    
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      skills: updatedSkills
    };
    
    const updatedContent: SkillsSection = {
      ...skillsData,
      categories: updatedCategories
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="space-y-6">
        {skillsData.categories.map((category, categoryIndex) => (
          <div key={category.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategory(categoryIndex, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 p-1 h-auto w-auto text-red-500 hover:text-red-700"
                onClick={() => removeCategory(categoryIndex)}
                title="Remove category"
                disabled={skillsData.categories.length <= 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(categoryIndex, skillIndex, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add skill..."
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 p-1 h-auto w-auto text-red-500 hover:text-red-700"
                    onClick={() => removeSkill(categoryIndex, skillIndex)}
                    disabled={category.skills.length <= 1}
                    title="Remove skill"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus size={16} />}
                onClick={() => addSkill(categoryIndex)}
                className="mt-2"
              >
                Add Skill
              </Button>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          leftIcon={<Plus size={16} />}
          onClick={addCategory}
          className="w-full"
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default SkillsEditor;