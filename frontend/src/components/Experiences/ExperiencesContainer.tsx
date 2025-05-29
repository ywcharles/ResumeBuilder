import { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import api from "../../api/axios";
import useUser from "../../Store/useUserStore";

interface Experience {
  id: number;
  company_name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  bulletPoints: string[];
}

const ExperiencesContainer = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useUser();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        let endpoint = "";
        if (user) {
          endpoint = `/api/experiences/user/${user.id}`;
        } else {
          setError("Either user must be provided");
          setLoading(false);
          return;
        }

        const response = await api.get<Experience[]>(endpoint);
        setExperiences(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Failed to fetch experiences. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

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
    <div className="bg-white w-[80%] flex flex-col rounded-md justify-start items-center p-5 space-y-2">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience_id={experience.id}
          companyName={experience.company_name}
          description={experience.description}
          location={experience.location}
          startDate={formatDate(experience.start_date)}
          endDate={formatDate(experience.end_date)}
          bulletPoints={experience.bulletPoints}
        />
      ))}
    </div>
  );
};

export default ExperiencesContainer;
