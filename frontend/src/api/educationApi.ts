import api from './axios';
import { EducationSection, EducationItem } from '../types';

interface DatabaseEducationItem {
  id: number;
  user_id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  start_date: string;
  end_date: string;
  gpa: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface EducationBankResponse {
  items: EducationItem[];
}

function transformFromDatabase(dbEducation: DatabaseEducationItem): EducationItem {
  return {
    id: dbEducation.id.toString(),
    institution: dbEducation.institution,
    degree: dbEducation.degree,
    field: dbEducation.field,
    location: dbEducation.location,
    startDate: dbEducation.start_date,
    endDate: dbEducation.end_date,
    gpa: dbEducation.gpa || undefined,
    description: dbEducation.description || undefined
  };
}

function transformToDatabase(frontendEducation: EducationItem, userId: number, resumeId: number) {
  return {
    userId,
    resumeId,
    institution: frontendEducation.institution,
    degree: frontendEducation.degree,
    field: frontendEducation.field,
    location: frontendEducation.location,
    startDate: frontendEducation.startDate,
    endDate: frontendEducation.endDate,
    gpa: frontendEducation.gpa || null,
    description: frontendEducation.description || null
  };
}

export const educationApi = {
  async getUserEducationBank(userId: number): Promise<EducationSection> {
    try {
      const response = await api.get<EducationBankResponse>(`/api/education/user/${userId}/bank`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user education bank:', error);
      throw error;
    }
  },

  async getResumeEducations(resumeId: number): Promise<EducationSection> {
    try {
      const response = await api.get<EducationBankResponse>(`/api/education/resume/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume educations:', error);
      throw error;
    }
  },

  async createEducation(
    educationData: EducationItem,
    userId: number,
    resumeId: number
  ): Promise<{ message: string; educationId: number }> {
    try {
      const dbData = transformToDatabase(educationData, userId, resumeId);
      const response = await api.post('/api/education', dbData);
      return response.data;
    } catch (error) {
      console.error('Error creating education:', error);
      throw error;
    }
  },

  async linkExistingEducation(
    existingEducationId: number,
    userId: number,
    resumeId: number
  ): Promise<{ message: string; educationId: number }> {
    try {
      const response = await api.post('/api/education', {
        userId,
        resumeId,
        existingEducationId
      });
      return response.data;
    } catch (error) {
      console.error('Error linking existing education:', error);
      throw error;
    }
  },

  async updateEducation(
    educationId: string,
    educationData: EducationItem
  ): Promise<{ message: string }> {
    try {
      const updateData = {
        institution: educationData.institution,
        degree: educationData.degree,
        field: educationData.field,
        location: educationData.location,
        startDate: educationData.startDate,
        endDate: educationData.endDate,
        gpa: educationData.gpa || null,
        description: educationData.description || null
      };
      
      const response = await api.put(`/api/education/${educationId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating education:', error);
      throw error;
    }
  },

  async removeEducationFromResume(
    resumeId: number,
    educationId: string
  ): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/api/education/resume/${resumeId}/education/${educationId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing education from resume:', error);
      throw error;
    }
  },

  async deleteEducation(educationId: string): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/api/education/${educationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting education:', error);
      throw error;
    }
  }
};

export default educationApi; 