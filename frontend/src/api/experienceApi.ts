import api from './axios';
import { ExperienceSection, ExperienceItem } from '../types';

interface DatabaseExperienceItem {
  id: number;
  user_id: number;
  resume_id: number;
  company_name: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_selected: boolean;
  created_at: string;
  updated_at: string;
  bullets: {
    id: number;
    content: string;
    is_selected: boolean;
    order_num: number;
  }[];
}

interface ExperienceBankResponse {
  items: ExperienceItem[];
}

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
      .map(bullet => bullet.content)
  };
}

function transformToDatabase(frontendExperience: ExperienceItem, userId: number, resumeId: number) {
  return {
    userId,
    resumeId,
    companyName: frontendExperience.company,
    position: frontendExperience.position,
    location: frontendExperience.location,
    startDate: frontendExperience.startDate,
    endDate: frontendExperience.current ? null : frontendExperience.endDate,
    bullets: frontendExperience.bullets
      .filter(bullet => bullet && bullet.trim())
      .map(content => ({ content, is_selected: true }))
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

  async getResumeExperiences(resumeId: number): Promise<DatabaseExperienceItem[]> {
    try {
      const response = await api.get<DatabaseExperienceItem[]>(`/api/experiences/resume/${resumeId}`);
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
        isSelected: true,
        bullets: experienceData.bullets
          .filter(bullet => bullet && bullet.trim())
          .map(content => ({ content, is_selected: true }))
      };
      
      const response = await api.put(`/api/experiences/${experienceId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating experience:', error);
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
  },

  async toggleExperienceSelection(
    experienceId: string,
    isSelected: boolean
  ): Promise<{ message: string }> {
    try {
      const response = await api.patch(`/api/experiences/${experienceId}/toggle`, { isSelected });
      return response.data;
    } catch (error) {
      console.error('Error toggling experience selection:', error);
      throw error;
    }
  }
};

export default experienceApi; 