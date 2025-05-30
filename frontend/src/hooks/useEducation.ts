import { useState, useEffect, useCallback } from 'react';
import { EducationSection, EducationItem } from '../types';
import { educationApi } from '../api/educationApi';
import useUser from '../Store/useUserStore';

interface UseEducationReturn {
  educationBank: EducationSection | null;
  isLoading: boolean;
  error: string | null;
  fetchEducationBank: () => Promise<void>;
  addEducationFromBank: (education: EducationItem) => EducationItem;
  saveEducation: (educationData: EducationItem, resumeId: number) => Promise<string>;
  updateEducation: (educationId: string, educationData: EducationItem) => Promise<void>;
  deleteEducation: (educationId: string) => Promise<void>;
  fetchResumeEducations: (resumeId: number) => Promise<EducationSection>;
}

export const useEducation = (): UseEducationReturn => {
  const [user] = useUser();
  const [educationBank, setEducationBank] = useState<EducationSection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEducationBank = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const bankData = await educationApi.getUserEducationBank(user.id);
      setEducationBank(bankData);
    } catch (err) {
      setError('Failed to fetch education bank');
      console.error('Error fetching education bank:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchEducationBank();
    }
  }, [user?.id, fetchEducationBank]);

  const addEducationFromBank = useCallback((education: EducationItem): EducationItem => {
    return {
      ...education,
      id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }, []);

  const saveEducation = useCallback(async (
    educationData: EducationItem,
    resumeId: number
  ): Promise<string> => {
    if (!user?.id) throw new Error('User not found');

    setError(null);

    try {
      const response = await educationApi.createEducation(educationData, user.id, resumeId);
      return response.educationId.toString();
    } catch (err) {
      setError('Failed to save education');
      console.error('Error saving education:', err);
      throw err;
    }
  }, [user?.id]);

  const updateEducation = useCallback(async (
    educationId: string,
    educationData: EducationItem
  ): Promise<void> => {
    setError(null);

    try {
      await educationApi.updateEducation(educationId, educationData);
    } catch (err) {
      setError('Failed to update education');
      console.error('Error updating education:', err);
      throw err;
    }
  }, []);

  const deleteEducation = useCallback(async (educationId: string): Promise<void> => {
    setError(null);

    try {
      await educationApi.deleteEducation(educationId);
    } catch (err) {
      setError('Failed to delete education');
      console.error('Error deleting education:', err);
      throw err;
    }
  }, []);

  const fetchResumeEducations = useCallback(async (resumeId: number): Promise<EducationSection> => {
    setError(null);

    try {
      return await educationApi.getResumeEducations(resumeId);
    } catch (err) {
      setError('Failed to fetch resume educations');
      console.error('Error fetching resume educations:', err);
      throw err;
    }
  }, []);

  return {
    educationBank,
    isLoading,
    error,
    fetchEducationBank,
    addEducationFromBank,
    saveEducation,
    updateEducation,
    deleteEducation,
    fetchResumeEducations
  };
};

export default useEducation; 