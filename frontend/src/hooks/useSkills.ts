import { useState, useEffect, useCallback } from 'react';
import { SkillsSection } from '../types';
import { skillsApi } from '../api/skillsApi';
import useUser from '../Store/useUserStore';

interface UseSkillsReturn {
  skillsBank: SkillsSection | null;
  isLoading: boolean;
  error: string | null;
  fetchSkillsBank: () => Promise<void>;
  updateResumeSkills: (resumeId: number, skills: string[]) => Promise<void>;
}

export const useSkills = (): UseSkillsReturn => {
  const [user] = useUser();
  const [skillsBank, setSkillsBank] = useState<SkillsSection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSkillsBank = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const bankData = await skillsApi.getUserSkillsBank(user.id);
      setSkillsBank(bankData);
    } catch (err) {
      setError('Failed to fetch skills bank');
      console.error('Error fetching skills bank:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const updateResumeSkills = useCallback(async (resumeId: number, skills: string[]) => {
    if (!user?.id) return;

    setError(null);

    try {
      await skillsApi.updateResumeSkills(resumeId, skills, user.id);
    } catch (err) {
      setError('Failed to update skills');
      console.error('Error updating skills:', err);
      throw err;
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchSkillsBank();
    }
  }, [user?.id, fetchSkillsBank]);

  return {
    skillsBank,
    isLoading,
    error,
    fetchSkillsBank,
    updateResumeSkills,
  };
}; 