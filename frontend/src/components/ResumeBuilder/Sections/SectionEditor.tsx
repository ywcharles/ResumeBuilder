import React from 'react';
import { Eye, EyeOff, Settings, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, SectionType } from '../../../types';
import Button from '../../../ui/Button';
import SortableItem from '../SortableItem';
import HeaderEditor from './HeaderEditor';
import SummaryEditor from './SummaryEditor';
import ExperienceEditor from './ExperienceEditor';
import EducationEditor from './EducationEditor';
import SkillsEditor from './SkillsEditor';

interface SectionEditorProps {
  section: ResumeSection;
  isActive: boolean;
  onClick: () => void;
}

const SectionEditor = ({ section, isActive, onClick }: SectionEditorProps) => {
  const { toggleSectionVisibility, removeSection } = useResumeStore();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSectionVisibility(section.id);
  };

  const handleRemoveSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this section?')) {
      removeSection(section.id);
    }
  };

  const renderEditor = () => {
    if (!isActive || !isExpanded) return null;

    switch (section.type) {
      case SectionType.HEADER:
        return <HeaderEditor section={section} />;
      // case SectionType.SUMMARY:
      //   return <SummaryEditor section={section} />;
      case SectionType.EXPERIENCE:
        return <ExperienceEditor section={section} />;
      case SectionType.EDUCATION:
        return <EducationEditor section={section} />;
      case SectionType.SKILLS:
        return <SkillsEditor section={section} />;
      default:
        return <div className="p-4">Editor not implemented for this section type.</div>;
    }
  };

  return (
    <SortableItem id={section.id} isActive={isActive} onClick={onClick}>
      <div className="flex-1">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-medium text-gray-800">{section.title}</h3>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto w-auto" 
              onClick={handleToggleVisibility}
              title={section.isVisible ? "Hide section" : "Show section"}
            >
              {section.isVisible ? (
                <Eye size={16} className="text-gray-500" />
              ) : (
                <EyeOff size={16} className="text-gray-500" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto w-auto" 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              title="Edit section"
            >
              <Settings size={16} className="text-gray-500" />
            </Button>

            {/* {section.type !== SectionType.HEADER && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto w-auto text-red-500 hover:text-red-700" 
                onClick={handleRemoveSection}
                title="Remove section"
              >
                <Trash2 size={16} />
              </Button>
            )} */}
          </div>
        </div>
      </div>
      
      {renderEditor()}
    </SortableItem>
  );
};

export default SectionEditor;