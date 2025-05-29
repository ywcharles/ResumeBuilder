import { useState, useEffect, useCallback } from 'react';
import { ExperienceSection, ExperienceItem } from '../types';
import { experienceApi } from '../api/experienceApi';
import useUser from '../Store/useUserStore';

interface UseExperiencesReturn {
  experienceBank: ExperienceSection | null;
  isLoading: boolean;
  error: string | null;
  fetchExperienceBank: () => Promise<void>;
  addExperienceFromBank: (experience: ExperienceItem) => ExperienceItem;
  saveExperience: (experienceData: ExperienceItem, resumeId: number) => Promise<string>;
  updateExperience: (experienceId: string, experienceData: ExperienceItem) => Promise<void>;
  deleteExperience: (experienceId: string) => Promise<void>;
}

export const useExperiences = (): UseExperiencesReturn => {
  const [user] = useUser();
  const [experienceBank, setExperienceBank] = useState<ExperienceSection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExperienceBank = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const bankData = await experienceApi.getUserExperienceBank(user.id);
      setExperienceBank(bankData);
    } catch (err) {
      setError('Failed to fetch experience bank');
      console.error('Error fetching experience bank:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchExperienceBank();
    }
  }, [user?.id, fetchExperienceBank]);

  const addExperienceFromBank = useCallback((experience: ExperienceItem): ExperienceItem => {
    return {
      ...experience,
      id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }, []);

  const saveExperience = useCallback(async (
    experienceData: ExperienceItem,
    resumeId: number
  ): Promise<string> => {
    if (!user?.id) throw new Error('User not found');

    setError(null);

    try {
      const response = await experienceApi.createExperience(experienceData, user.id, resumeId);
      return response.experienceId.toString();
    } catch (err) {
      setError('Failed to save experience');
      console.error('Error saving experience:', err);
      throw err;
    }
  }, [user?.id]);

  const updateExperience = useCallback(async (
    experienceId: string,
    experienceData: ExperienceItem
  ): Promise<void> => {
    setError(null);

    try {
      await experienceApi.updateExperience(experienceId, experienceData);
    } catch (err) {
      setError('Failed to update experience');
      console.error('Error updating experience:', err);
      throw err;
    }
  }, []);

  const deleteExperience = useCallback(async (experienceId: string): Promise<void> => {
    setError(null);

    try {
      await experienceApi.deleteExperience(experienceId);
    } catch (err) {
      setError('Failed to delete experience');
      console.error('Error deleting experience:', err);
      throw err;
    }
  }, []);

  return {
    experienceBank,
    isLoading,
    error,
    fetchExperienceBank,
    addExperienceFromBank,
    saveExperience,
    updateExperience,
    deleteExperience,
  };
}; 