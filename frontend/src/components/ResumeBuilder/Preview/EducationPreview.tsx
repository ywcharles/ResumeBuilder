import { ResumeSection, EducationSection } from '../../../types';
import { formatDate } from '../../../utils/utils';

interface EducationPreviewProps {
  section: ResumeSection;
}

const EducationPreview = ({ section }: EducationPreviewProps) => {
  const educationData = section.content as EducationSection;
  
  if (educationData.items.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase">
        {section.title}
      </h2>
      
      <div className="space-y-4">
        {educationData.items.map((item) => (
          <div key={item.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-gray-900">{item.institution}</h3>
              <span className="text-sm text-gray-600">
                {item.location}
              </span>
            </div>
            
            <div className="flex justify-between items-baseline">
              <p className="text-gray-700">
                {item.degree}{item.field ? `, ${item.field}` : ''}
                {item.gpa ? ` • GPA: ${item.gpa}` : ''}
              </p>
              <span className="text-sm text-gray-600">
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </span>
            </div>
            
            {item.description && (
              <p className="text-sm text-gray-700 mt-1">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPreview;