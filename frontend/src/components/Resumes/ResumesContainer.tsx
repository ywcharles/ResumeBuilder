import React, { useEffect, useState } from "react"
import ResumeCard from "./ResumeCard";
import AddResumeButton from "./AddResumeButton";
import useUser from "../../Store/useUserStore";
import { useResumeManagementStore } from "../../Store/resumeManagementStore";
import { useNavigate } from "react-router-dom";

const ResumesContainer = () => {
  const [user] = useUser();
  const navigate = useNavigate();
  const {
      resumes,
      currentResumeId,
      isLoading,
      error,
      fetchUserResumes,
      createResume,
      updateResumeTitle,
      deleteResume,
      duplicateResume,
      setCurrentResumeId: setManagementCurrentId,
      clearError
    } = useResumeManagementStore();

  const updateState = ()=>{

  }

  useEffect(() => {
    if (user?.id) {
      fetchUserResumes(user.id);
    }
  }, [user?.id, fetchUserResumes]);

  const handleAddResume = ()=>{

  }

  const handleOpenResume = (id: number) => {
    setManagementCurrentId(id);
    navigate("/resume-builder");
  }

  const handleUpdateResume = () => {

  }

  const handleDeleteResume = () => {

  }

  const handleRetry = () =>{

  }

  if (isLoading) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-gray-500">Loading resumes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white w-[80%] flex flex-col rounded-md justify-center items-center p-5">
        <div className="text-red-500 text-center mb-4">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Retrying...' : 'Retry'}
        </button>
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
