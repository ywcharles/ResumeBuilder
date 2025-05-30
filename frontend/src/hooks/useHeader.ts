import { useState, useEffect, useCallback } from 'react';
import { HeaderSection } from '../types';
import { headerApi } from '../api/headerApi';
import { useResumeStore } from '../Store/resumeStore';

interface UseHeaderReturn {
  headerData: HeaderSection | null;
  isLoading: boolean;
  error: string | null;
  fetchHeaderData: () => Promise<void>;
  updateHeaderData: (headerData: HeaderSection) => Promise<void>;
}

export const useHeader = (): UseHeaderReturn => {
  const { currentResumeId, setCurrentResumeId } = useResumeStore();
  const [headerData, setHeaderData] = useState<HeaderSection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHeaderData = useCallback(async () => {
    if (!currentResumeId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await headerApi.getResumeHeaderData(currentResumeId);
      setHeaderData(data);
    } catch (err) {
      setError('Failed to fetch header data');
      console.error('Error fetching header data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentResumeId]);

  const updateHeaderData = useCallback(async (headerData: HeaderSection) => {
    if (!currentResumeId) throw new Error('No resume selected');

    setError(null);

    try {
      await headerApi.updateResumeHeaderData(currentResumeId, headerData);
      setHeaderData(headerData);
    } catch (err) {
      setError('Failed to update header data');
      console.error('Error updating header data:', err);
      throw err;
    }
  }, [currentResumeId]);

  useEffect(() => {
    if (currentResumeId) {
      fetchHeaderData();
    }
  }, [currentResumeId, fetchHeaderData]);

  return {
    headerData,
    isLoading,
    error,
    fetchHeaderData,
    updateHeaderData,
  };
}; 