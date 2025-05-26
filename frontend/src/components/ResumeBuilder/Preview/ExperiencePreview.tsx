import { ResumeSection, ExperienceSection } from '../../../types';
import { formatDate } from '../../../utils/utils';

interface ExperiencePreviewProps {
  section: ResumeSection;
}

const ExperiencePreview = ({ section }: ExperiencePreviewProps) => {
  const experienceData = section.content as ExperienceSection;

  if (!experienceData.items || experienceData.items.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase">
        {section.title}
      </h2>

      <div className="space-y-4">
        {experienceData.items.map((item) => (
          <div key={item.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-gray-900">{item.company_name ?? item.company}</h3>
              <span className="text-sm text-gray-600">
                {item.location ?? ''}
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <p className="text-gray-700 italic">{item.position ?? ''}</p>
              <span className="text-sm text-gray-600">
                {formatDate(item.start_date ?? item.startDate)} - {item.current ? 'Present' : formatDate(item.end_date ?? item.endDate)}
              </span>
            </div>

            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700">
                {item.bullets.map((bullet: string, index: number) => (
                  bullet.trim() ? <li key={index}>{bullet}</li> : null
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePreview;