import { useState, useEffect, useCallback } from 'react';
import { HeaderSection } from '../types';
import { headerApi } from '../api/headerApi';
import useUser from '../Store/useUserStore';

interface UseHeaderReturn {
  headerData: HeaderSection | null;
  isLoading: boolean;
  error: string | null;
  fetchHeaderData: () => Promise<void>;
  updateHeaderData: (headerData: HeaderSection) => Promise<void>;
}

export const useHeader = (): UseHeaderReturn => {
  const [user] = useUser();
  const [headerData, setHeaderData] = useState<HeaderSection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHeaderData = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await headerApi.getUserHeaderData(user.id);
      setHeaderData(data);
    } catch (err) {
      setError('Failed to fetch header data');
      console.error('Error fetching header data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const updateHeaderData = useCallback(async (headerData: HeaderSection) => {
    if (!user?.id) throw new Error('User not found');

    setError(null);

    try {
      await headerApi.updateUserHeaderData(user.id, headerData);
      setHeaderData(headerData);
    } catch (err) {
      setError('Failed to update header data');
      console.error('Error updating header data:', err);
      throw err;
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchHeaderData();
    }
  }, [user?.id, fetchHeaderData]);

  return {
    headerData,
    isLoading,
    error,
    fetchHeaderData,
    updateHeaderData,
  };
}; 