import api from './axios';
import { SkillsSection } from '../types';

interface SkillsBankResponse {
  skills: string[];
}

export const skillsApi = {
  async getUserSkillsBank(userId: number): Promise<SkillsSection> {
    try {
      const response = await api.get<SkillsBankResponse>(`/api/skills/user/${userId}/bank`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user skills bank:', error);
      throw error;
    }
  },

  async getResumeSkills(resumeId: number): Promise<SkillsSection> {
    try {
      const response = await api.get<SkillsSection>(`/api/skills/resume/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume skills:', error);
      throw error;
    }
  },

  async updateResumeSkills(
    resumeId: number,
    skills: string[],
    userId: number
  ): Promise<SkillsSection> {
    try {
      const response = await api.put(`/api/skills/resume/${resumeId}`, {
        skills,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Error updating resume skills:', error);
      throw error;
    }
  },

  async addSkillToResume(
    resumeId: number,
    skill: string,
    userId: number
  ): Promise<{ id: number; name: string }> {
    try {
      const response = await api.post(`/api/skills/resume/${resumeId}`, {
        skill,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Error adding skill to resume:', error);
      throw error;
    }
  },

  async deleteSkill(skillId: number): Promise<void> {
    try {
      await api.delete(`/api/skills/${skillId}`);
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  }
};

export default skillsApi; 