import React from 'react';
import { ResumeSection, SummarySection } from '../../../types';

interface SummaryPreviewProps {
  section: ResumeSection;
}

const SummaryPreview = ({ section }: SummaryPreviewProps) => {
  const summaryData = section.content as SummarySection;
  
  if (!summaryData.text.trim()) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase">
        {section.title}
      </h2>
      <p className="text-sm text-gray-700">
        {summaryData.text}
      </p>
    </div>
  );
};

export default SummaryPreview;