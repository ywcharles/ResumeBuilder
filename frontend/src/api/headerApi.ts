import api from './axios';
import { HeaderSection } from '../types';

export const headerApi = {
  async getResumeHeaderData(resumeId: number): Promise<HeaderSection> {
    try {
      const response = await api.get<HeaderSection>(`/api/header/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume header data:', error);
      throw error;
    }
  },

  async updateResumeHeaderData(resumeId: number, headerData: HeaderSection): Promise<{ message: string }> {
    try {
      const response = await api.put(`/api/header/${resumeId}`, headerData);
      return response.data;
    } catch (error) {
      console.error('Error updating resume header data:', error);
      throw error;
    }
  }
};

export default headerApi; 