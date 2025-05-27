import { ResumeSection, SkillsSection } from '../../../types';

interface SkillsPreviewProps {
  section: ResumeSection;
}

const SkillsPreview = ({ section }: SkillsPreviewProps) => {
  const skillsData = section.content as SkillsSection;
  
  if (skillsData.categories.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase">
        {section.title}
      </h2>
      
      <div className="space-y-3">
        {skillsData.categories.map((category) => (
          <div key={category.id} className="mb-2">
            {skillsData.categories.length > 1 && (
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
            )}
            
            <p className="text-sm text-gray-700">
              {category.skills
                .filter(skill => skill.trim() !== '')
                .join(' • ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;