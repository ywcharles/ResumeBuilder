import api from './axios';

export interface Tag {
  id: number;
  name: string;
}

export const tagsApi = {
  async getAllTags(): Promise<Tag[]> {
    try {
      const response = await api.get<Tag[]>('/api/tags');
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  async createTag(name: string): Promise<Tag> {
    try {
      const response = await api.post<Tag>('/api/tags', { name });
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }
}; 