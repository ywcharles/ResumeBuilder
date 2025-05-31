import { useEffect} from "react"
import ResumeCard from "./ResumeCard";
import AddResumeButton from "./AddResumeButton";
import useUser from "../../Store/useUserStore";
import { useResumeManagementStore } from "../../Store/resumeManagementStore";
import { useNavigate } from "react-router-dom";
import { ResumeFormData } from "./ResumeFormModal";

const ResumesContainer = () => {
  const [user] = useUser();
  const navigate = useNavigate();
  const {
      resumes,
      isLoading,
      error,
      fetchUserResumes,
      createResume,
      updateResumeTitle,
      deleteResume,
      duplicateResume,
      setCurrentResumeId: setManagementCurrentId,
    } = useResumeManagementStore();

  useEffect(() => {
    if (user?.id) {
      fetchUserResumes(user.id);
    }
  }, [user?.id, fetchUserResumes]);

  const handleAddResume = async (data: ResumeFormData)=>{
    if (!user?.id || !data.resumeName.trim()) return;
    
    try {
      const newResume = await createResume(user.id, data.resumeName.trim());
      handleOpenResume(newResume.id);

    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  }

  const handleOpenResume = (id: number) => {
    setManagementCurrentId(id);
    navigate("/resume-builder");
  }

  const handleUpdateResume =  async (id:number, newTitle: string) => {
    try {
        await updateResumeTitle(id, newTitle.trim());
      } catch (error) {
        console.error('Failed to update title:', error);
      }
  }

  const handleDeleteResume = async (id:number) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id);
      } catch (error) {
        console.error('Failed to delete resume:', error);
      }
    }
  }

  const handleDuplicateResume = async (resumeId: number, title: string) => {
    try {
      await duplicateResume(resumeId, `${title} (Copy)`);
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-gray-500">Loading resumes...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <AddResumeButton 
        onAdd={handleAddResume} 
        loading={isLoading}
      />

      <div className="bg-white w-[80%] flex flex-col rounded-md justify-start items-center p-5 space-y-4 min-h-[400px]">
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onUpdate={handleUpdateResume}
              onDelete={handleDeleteResume}
              openResume={handleOpenResume}
              onDuplicate={handleDuplicateResume}
              loading={isLoading}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg mb-2">Your Resume bank is empty</p>
            <p className="text-sm">Add your first Resume to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumesContainer;
