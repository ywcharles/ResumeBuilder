import api from './axios';
import { ExperienceSection, ExperienceItem } from '../types';

interface DatabaseExperienceItem {
  id: number;
  user_id: number;
  company_name: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  created_at: string;
  updated_at: string;
  bullets: {
    content: string;
    tags: { id: number; name: string }[];
  }[];
}

interface ExperienceBankResponse extends ExperienceSection {}

function transformFromDatabase(dbExperience: DatabaseExperienceItem): ExperienceItem {
  return {
    id: dbExperience.id.toString(),
    company: dbExperience.company_name,
    position: dbExperience.position,
    location: dbExperience.location,
    startDate: dbExperience.start_date,
    endDate: dbExperience.end_date || '',
    current: !dbExperience.end_date,
    bullets: dbExperience.bullets
      .filter(bullet => bullet.content && bullet.content.trim())
      .map(bullet => ({
        content: bullet.content,
        tags: bullet.tags || []
      }))
  };
}

function transformToDatabase(frontendExperience: ExperienceItem, userId: number, resumeId?: number) {
  return {
    userId,
    resumeId,
    companyName: frontendExperience.company,
    position: frontendExperience.position,
    location: frontendExperience.location,
    startDate: frontendExperience.startDate,
    endDate: frontendExperience.current ? null : frontendExperience.endDate,
    bullets: frontendExperience.bullets
      .filter(bullet => bullet.content && bullet.content.trim())
      .map(bullet => ({ content: bullet.content, is_selected: true }))
  };
}

export const experienceApi = {
  async getUserExperienceBank(userId: number): Promise<ExperienceSection> {
    try {
      const response = await api.get<ExperienceBankResponse>(`/api/experiences/user/${userId}/bank`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user experience bank:', error);
      throw error;
    }
  },

  async getResumeExperiences(resumeId: number): Promise<ExperienceSection> {
    try {
      const response = await api.get<ExperienceSection>(`/api/experiences/resume/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume experiences:', error);
      throw error;
    }
  },

  async createExperience(
    experienceData: ExperienceItem,
    userId: number,
    resumeId: number
  ): Promise<{ message: string; experienceId: number }> {
    try {
      const dbData = transformToDatabase(experienceData, userId, resumeId);
      const response = await api.post('/api/experiences', dbData);
      return response.data;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  },

  async addExperienceToResume(
    experienceId: string,
    resumeId: number
  ): Promise<{ message: string }> {
    try {
      const response = await api.post(`/api/experiences/resume/${resumeId}/add/${experienceId}`);
      return response.data;
    } catch (error) {
      console.error('Error adding experience to resume:', error);
      throw error;
    }
  },

  async updateExperience(
    experienceId: string,
    experienceData: ExperienceItem
  ): Promise<{ message: string }> {
    try {
      const updateData = {
        companyName: experienceData.company,
        position: experienceData.position,
        location: experienceData.location,
        startDate: experienceData.startDate,
        endDate: experienceData.current ? null : experienceData.endDate,
        bullets: experienceData.bullets
          .filter(bullet => bullet.content && bullet.content.trim())
          .map(bullet => ({ content: bullet.content, is_selected: true }))
      };
      
      const response = await api.put(`/api/experiences/${experienceId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  },

  async removeExperienceFromResume(
    resumeId: number,
    experienceId: string
  ): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/api/experiences/resume/${resumeId}/experience/${experienceId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing experience from resume:', error);
      throw error;
    }
  },

  async deleteExperience(experienceId: string): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/api/experiences/${experienceId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }
};

export default experienceApi; 