import { useEffect, useCallback } from 'react';
import { useResumeStore } from '../Store/resumeStore';
import { headerApi } from '../api/headerApi';
import { skillsApi } from '../api/skillsApi';
import { educationApi } from '../api/educationApi';
import { experienceApi } from '../api/experienceApi';
import { SectionType, ExperienceSection, EducationSection, SkillsSection } from '../types';

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
            updateSectionContent(section.id, educationData);
            break;
          
          case SectionType.EXPERIENCE:
            updateSectionContent(section.id, experienceData);
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