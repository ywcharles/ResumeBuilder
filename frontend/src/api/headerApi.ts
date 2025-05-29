import api from './axios';
import { HeaderSection } from '../types';

export const headerApi = {
  async getUserHeaderData(userId: number): Promise<HeaderSection> {
    try {
      const response = await api.get<HeaderSection>(`/api/header/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user header data:', error);
      throw error;
    }
  },

  async updateUserHeaderData(userId: number, headerData: HeaderSection): Promise<{ message: string }> {
    try {
      const response = await api.put(`/api/header/${userId}`, headerData);
      return response.data;
    } catch (error) {
      console.error('Error updating user header data:', error);
      throw error;
    }
  }
};

export default headerApi; 