import React from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import { ResumeSection, SummarySection } from '../../../types';

interface SummaryEditorProps {
  section: ResumeSection;
}

const SummaryEditor = ({ section }: SummaryEditorProps) => {
  const { updateSectionContent } = useResumeStore();
  const summaryData = section.content as SummarySection;
  
  const handleChange = (text: string) => {
    const updatedContent = { ...summaryData, text };
    updateSectionContent(section.id, updatedContent);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          value={summaryData.text}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Write a compelling professional summary..."
        />
      </div>
    </div>
  );
};

export default SummaryEditor;