import { useResumeStore } from '../../Store/resumeStore';
import { SectionType } from '../../types';
import HeaderPreview from './Preview/HeaderPreview';
import SummaryPreview from './Preview/SummaryPreview';
import ExperiencePreview from './Preview/ExperiencePreview';
import EducationPreview from './Preview/EducationPreview';
import SkillsPreview from './Preview/SkillsPreview';

const PreviewPanel = () => {
  const { sections } = useResumeStore();
  const visibleSections = sections.filter(section => section.isVisible);

  const renderSectionPreview = (section) => {
    switch (section.type) {
      case SectionType.HEADER:
        return <HeaderPreview key={section.id} section={section} />;
      case SectionType.SUMMARY:
        return <SummaryPreview key={section.id} section={section} />;
      case SectionType.EXPERIENCE:
        return <ExperiencePreview key={section.id} section={section} />;
      case SectionType.EDUCATION:
        return <EducationPreview key={section.id} section={section} />;
      case SectionType.SKILLS:
        return <SkillsPreview key={section.id} section={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="text-sm text-gray-500 text-center">
          Preview Mode • A4 Format
        </div>
      </div>
      <div className="max-w-[850px] mx-auto my-8">
        <div className="bg-white shadow-lg rounded-lg p-10">
          {visibleSections.map(renderSectionPreview)}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;