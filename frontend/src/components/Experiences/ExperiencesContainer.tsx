import { useState, useEffect, useCallback } from "react";
import ExperienceCard from "./ExperienceCard";
import AddExperienceButton from "./AddExperienceButton";
import useUser from "../../Store/useUserStore";
import { ExperienceFormData, transformFormDataToExperienceItem } from "./ExperienceFormModal";
import { ExperienceItem } from "../../types";
import { experienceApi } from "../../api/experienceApi";

interface ExperiencesContainerState {
  experiences: ExperienceItem[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
}

const ExperiencesContainer = () => {
  const [state, setState] = useState<ExperiencesContainerState>({
    experiences: [],
    loading: true,
    error: null,
    actionLoading: false,
  });
  
  const [user] = useUser();

  const updateState = useCallback((updates: Partial<ExperiencesContainerState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const fetchExperiences = useCallback(async () => {
    if (!user?.id) {
      updateState({ 
        error: "User must be logged in to view experiences", 
        loading: false 
      });
      return;
    }

    try {
      updateState({ loading: true, error: null });
      const response = await experienceApi.getUserExperienceBank(user.id);
      updateState({ 
        experiences: response.items, 
        loading: false 
      });
    } catch (err: any) {
      console.error("Error fetching experiences:", err);
      updateState({
        error: err.response?.data?.error || "Failed to fetch experiences. Please try again.",
        loading: false
      });
    }
  }, [user?.id, updateState]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleAddExperience = async (formData: ExperienceFormData) => {
    if (!user?.id) {
      updateState({ error: "User must be logged in" });
      return;
    }

    try {
      updateState({ actionLoading: true, error: null });
      
      // Transform form data to ExperienceItem format
      const experienceItem = transformFormDataToExperienceItem(formData);
      
      // Create experience using the API
      await experienceApi.createExperience(experienceItem, user.id, 0); // Using 0 as temp resumeId for bank items
      
      // Refresh the experiences list
      await fetchExperiences();
      
      updateState({ actionLoading: false });
    } catch (err: any) {
      console.error("Error creating experience:", err);
      updateState({
        error: err.response?.data?.error || "Failed to create experience",
        actionLoading: false
      });
    }
  };

  const handleUpdateExperience = async (experienceId: string, formData: ExperienceFormData) => {
    try {
      updateState({ actionLoading: true, error: null });
      
      // Transform form data to ExperienceItem format
      const experienceItem = transformFormDataToExperienceItem(formData, experienceId);
      
      // Update experience using the API
      await experienceApi.updateExperience(experienceId, experienceItem);
      
      // Refresh the experiences list
      await fetchExperiences();
      
      updateState({ actionLoading: false });
    } catch (err: any) {
      console.error("Error updating experience:", err);
      updateState({
        error: err.response?.data?.error || "Failed to update experience",
        actionLoading: false
      });
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    try {
      updateState({ actionLoading: true, error: null });
      
      // Delete experience using the API
      await experienceApi.deleteExperience(experienceId);
      
      // Refresh the experiences list
      await fetchExperiences();
      
      updateState({ actionLoading: false });
    } catch (err: any) {
      console.error("Error deleting experience:", err);
      updateState({
        error: err.response?.data?.error || "Failed to delete experience",
        actionLoading: false
      });
    }
  };

  const handleRetry = () => {
    updateState({ error: null });
    fetchExperiences();
  };

  if (state.loading) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-gray-500">Loading experiences...</div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-red-500 text-center mb-4">
          <p className="font-medium">Error</p>
          <p className="text-sm">{state.error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
          disabled={state.loading}
        >
          {state.loading ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <AddExperienceButton 
        onAdd={handleAddExperience} 
        loading={state.actionLoading}
      />

      <div className="bg-white w-[80%] flex flex-col rounded-md justify-start items-center p-5 space-y-4 min-h-[400px]">
        {state.experiences.length > 0 ? (
          state.experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onUpdate={handleUpdateExperience}
              onDelete={handleDeleteExperience}
              loading={state.actionLoading}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg mb-2">Your experience bank is empty</p>
            <p className="text-sm">Add your first experience to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencesContainer;