import { useEffect, useCallback } from 'react';
import { useResumeStore } from '../Store/resumeStore';
import { headerApi } from '../api/headerApi';
import { skillsApi } from '../api/skillsApi';
import { educationApi } from '../api/educationApi';
import { experienceApi } from '../api/experienceApi';
import { SectionType, ExperienceSection, EducationSection, SkillsSection } from '../types';

const formatDateForMonthInput = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString.substring(0, 7);
    }
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const useResumeData = () => {
  const { 
    currentResumeId, 
    sections, 
    updateSectionContent, 
    setIsLoadingResume,
    isLoadingResume 
  } = useResumeStore();

  const loadResumeData = useCallback(async () => {
    if (!currentResumeId) {
      setIsLoadingResume(false);
      return;
    }

    try {
      setIsLoadingResume(true);

      const [headerData, skillsData, educationData, experienceData] = await Promise.all([
        headerApi.getResumeHeaderData(currentResumeId).catch(() => null),
        skillsApi.getResumeSkills(currentResumeId).catch(() => ({ skills: [] })),
        educationApi.getResumeEducations(currentResumeId).catch(() => ({ items: [] })),
        experienceApi.getResumeExperiences(currentResumeId).catch(() => ({ items: [] }))
      ]);

      // Format dates for experience items
      const formattedExperienceData: ExperienceSection = {
        ...experienceData,
        items: experienceData.items.map(item => ({
          ...item,
          startDate: formatDateForMonthInput(item.startDate),
          endDate: formatDateForMonthInput(item.endDate)
        }))
      };

      // Format dates for education items
      const formattedEducationData: EducationSection = {
        ...educationData,
        items: educationData.items.map(item => ({
          ...item,
          startDate: formatDateForMonthInput(item.startDate),
          endDate: formatDateForMonthInput(item.endDate)
        }))
      };

      sections.forEach(section => {
        switch (section.type) {
          case SectionType.HEADER:
            if (headerData) {
              updateSectionContent(section.id, headerData);
            }
            break;
          
          case SectionType.SKILLS:
            updateSectionContent(section.id, skillsData);
            break;
          
          case SectionType.EDUCATION:
            updateSectionContent(section.id, formattedEducationData);
            break;
          
          case SectionType.EXPERIENCE:
            updateSectionContent(section.id, formattedExperienceData);
            break;
        }
      });
    } catch (error) {
      console.error('Error loading resume data:', error);
    } finally {
      setIsLoadingResume(false);
    }
  }, [currentResumeId, sections, updateSectionContent, setIsLoadingResume]);

  useEffect(() => {
    if (currentResumeId && isLoadingResume) {
      loadResumeData();
    }
  }, [currentResumeId, isLoadingResume, loadResumeData]);

  return {
    isLoadingResume,
    loadResumeData
  };
}; 