import { ResumeSection, SkillsSection } from '../../../types';

interface SkillsPreviewProps {
  section: ResumeSection;
}

const SkillsPreview = ({ section }: SkillsPreviewProps) => {
  const skillsData = section.content as SkillsSection;
  
  if (skillsData.skills.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase">
        {section.title}
      </h2>
      
      <p className="text-sm text-gray-700">
        {skillsData.skills
          .filter(skill => skill.trim() !== '')
          .join(' • ')}
      </p>
    </div>
  );
};

export default SkillsPreview;