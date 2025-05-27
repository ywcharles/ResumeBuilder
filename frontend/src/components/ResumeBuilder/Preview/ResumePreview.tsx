import { useResumeStore } from '../../../Store/resumeStore';
import { SectionType } from '../../../types';
import HeaderPreview from './HeaderPreview';
import SummaryPreview from './SummaryPreview';
import ExperiencePreview from './ExperiencePreview';
import EducationPreview from './EducationPreview';
import SkillsPreview from './SkillsPreview';

const ResumePreview = () => {
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
    <div className="p-10 max-w-[850px] mx-auto bg-white shadow-md">
      {visibleSections.map(renderSectionPreview)}
    </div>
  );
};

export default ResumePreview;