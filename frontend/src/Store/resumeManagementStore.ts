import { create } from 'zustand';
import { Resume, resumeApi } from '../api/resumeApi';

interface ResumeManagementState {
  resumes: Resume[];
  currentResumeId: number | null;
  isLoading: boolean;
  error: string | null;
  
  setCurrentResumeId: (id: number | null) => void;
  fetchUserResumes: (userId: number) => Promise<void>;
  createResume: (userId: number, title: string) => Promise<Resume>;
  updateResumeTitle: (resumeId: number, title: string) => Promise<void>;
  deleteResume: (resumeId: number) => Promise<void>;
  duplicateResume: (resumeId: number, title?: string) => Promise<Resume>;
  clearError: () => void;
}

export const useResumeManagementStore = create<ResumeManagementState>((set, get) => ({
  resumes: [],
  currentResumeId: null,
  isLoading: false,
  error: null,

  setCurrentResumeId: (id) => set({ currentResumeId: id }),

  fetchUserResumes: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const resumes = await resumeApi.getUserResumes(userId);
      set({ resumes, isLoading: false });
      
      if (!get().currentResumeId && resumes.length > 0) {
        set({ currentResumeId: resumes[0].id });
      }
    } catch (error) {
      set({ error: 'Failed to fetch resumes', isLoading: false });
    }
  },

  createResume: async (userId: number, title: string) => {
    set({ isLoading: true, error: null });
    try {
      const newResume = await resumeApi.createResume({ userId, title });
      set(state => ({
        resumes: [newResume, ...state.resumes],
        currentResumeId: newResume.id,
        isLoading: false
      }));
      return newResume;
    } catch (error) {
      set({ error: 'Failed to create resume', isLoading: false });
      throw error;
    }
  },

  updateResumeTitle: async (resumeId: number, title: string) => {
    try {
      await resumeApi.updateResume(resumeId, { title });
      set(state => ({
        resumes: state.resumes.map(resume =>
          resume.id === resumeId 
            ? { ...resume, title, updated_at: new Date().toISOString() }
            : resume
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update resume' });
      throw error;
    }
  },

  deleteResume: async (resumeId: number) => {
    try {
      await resumeApi.deleteResume(resumeId);
      set(state => {
        const newResumes = state.resumes.filter(resume => resume.id !== resumeId);
        const newCurrentId = state.currentResumeId === resumeId 
          ? (newResumes.length > 0 ? newResumes[0].id : null)
          : state.currentResumeId;
        
        return {
          resumes: newResumes,
          currentResumeId: newCurrentId
        };
      });
    } catch (error) {
      set({ error: 'Failed to delete resume' });
      throw error;
    }
  },

  duplicateResume: async (resumeId: number, title?: string) => {
    set({ isLoading: true, error: null });
    try {
      const duplicatedResume = await resumeApi.duplicateResume(resumeId, title);
      set(state => ({
        resumes: [duplicatedResume, ...state.resumes],
        currentResumeId: duplicatedResume.id,
        isLoading: false
      }));
      return duplicatedResume;
    } catch (error) {
      set({ error: 'Failed to duplicate resume', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
})); 