import api from './axios';

export interface Resume {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface CreateResumeRequest {
  userId: number;
  title: string;
}

export interface UpdateResumeRequest {
  title: string;
}

export const resumeApi = {
  async getUserResumes(userId: number): Promise<Resume[]> {
    try {
      const response = await api.get<Resume[]>(`/api/resumes/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      throw error;
    }
  },

  async getResume(resumeId: number): Promise<Resume> {
    try {
      const response = await api.get<Resume>(`/api/resumes/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw error;
    }
  },

  async createResume(data: CreateResumeRequest): Promise<Resume> {
    try {
      const response = await api.post<Resume>('/api/resumes', data);
      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  },

  async updateResume(resumeId: number, data: UpdateResumeRequest): Promise<{ message: string }> {
    try {
      const response = await api.put(`/api/resumes/${resumeId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  },

  async deleteResume(resumeId: number): Promise<void> {
    try {
      await api.delete(`/api/resumes/${resumeId}`);
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  },

  async duplicateResume(resumeId: number, title?: string): Promise<Resume> {
    try {
      const response = await api.post<Resume>(`/api/resumes/${resumeId}/duplicate`, { title });
      return response.data;
    } catch (error) {
      console.error('Error duplicating resume:', error);
      throw error;
    }
  }
}; 