import { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import AddExperienceButton from "./AddExperienceButton";
import api from "../../api/axios";
import useUser from "../../Store/useUserStore";
import { ExperienceFormData } from "./ExperienceFormModal";

interface FrontendExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

interface FrontendExperienceSection {
  items: FrontendExperience[];
}

const ExperiencesContainer = () => {
  const [experiences, setExperiences] = useState<FrontendExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user] = useUser();

  const fetchExperiences = async () => {
    try {
      if (!user) {
        setError("User must be provided");
        setLoading(false);
        return;
      }

      const endpoint = `/api/experience/user/${user.id}/bank`;
      const response = await api.get<FrontendExperienceSection>(endpoint);
      setExperiences(response.data.items);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Failed to fetch experiences. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [user]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const handleAddExperience = async (data: ExperienceFormData) => {
    try {
      await api.post(`/api/experience`, {
        userId: user?.id,
        companyName: data.companyName,
        position: data.position,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        bullets: data.bullets,
      });

      // Refresh the experiences list
      await fetchExperiences();
    } catch (err: any) {
      console.error("Error creating experience:", err);
      setError("Failed to create experience");
    }
  };

  const handleUpdateExperience = async (
    experienceId: number,
    data: ExperienceFormData
  ) => {
    try {
      await api.put(`/api/experience/${experienceId}`, {
        companyName: data.companyName,
        position: data.position,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        bullets: data.bullets,
      });

      // Refresh the experiences list
      await fetchExperiences();
    } catch (err: any) {
      console.error("Error updating experience:", err);
      setError("Failed to update experience");
    }
  };

  const handleDeleteExperience = async (experienceId: number) => {
    try {
      await api.delete(`/api/experience/${experienceId}`);

      // Refresh the experiences list
      await fetchExperiences();
    } catch (err: any) {
      console.error("Error deleting experience:", err);
      setError("Failed to delete experience");
    }
  };

  if (loading) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-gray-500">Loading experiences...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-red-500">Error: {error}</div>
        <button
          onClick={() => {
            setError(null);
            fetchExperiences();
          }}
          className="mt-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-gray-500">No experiences found</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <AddExperienceButton onAdd={handleAddExperience} />

      <div className="bg-white w-[80%] flex flex-col rounded-md justify-start items-center p-5 space-y-2">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience_id={parseInt(experience.id)}
            companyName={experience.company}
            position={experience.position}
            location={experience.location}
            startDate={formatDate(experience.startDate)}
            endDate={formatDate(experience.endDate)}
            bullets={experience.bullets}
            onUpdate={handleUpdateExperience}
            onDelete={handleDeleteExperience}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperiencesContainer;
