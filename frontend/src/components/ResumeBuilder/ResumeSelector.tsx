import React, { useState, useEffect } from 'react';
import { useResumeManagementStore } from '../../Store/resumeManagementStore';
import { useResumeStore } from '../../Store/resumeStore';
import useUser from '../../Store/useUserStore';

const ResumeSelector: React.FC = () => {
  const [user] = useUser();
  const { setCurrentResumeId } = useResumeStore();
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

  const [isCreating, setIsCreating] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchUserResumes(user.id);
    }
  }, [user?.id, fetchUserResumes]);

  useEffect(() => {
    if (currentResumeId !== null) {
      setCurrentResumeId(currentResumeId);
    }
  }, [currentResumeId, setCurrentResumeId]);

  const handleCreateResume = async () => {
    if (!user?.id || !newResumeTitle.trim()) return;
    
    try {
      await createResume(user.id, newResumeTitle.trim());
      setNewResumeTitle('');
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  const handleSelectResume = (resumeId: number) => {
    setManagementCurrentId(resumeId);
  };

  const handleEditTitle = (resume: any) => {
    setEditingId(resume.id);
    setEditingTitle(resume.title);
  };

  const handleSaveTitle = async () => {
    if (editingId && editingTitle.trim()) {
      try {
        await updateResumeTitle(editingId, editingTitle.trim());
        setEditingId(null);
        setEditingTitle('');
      } catch (error) {
        console.error('Failed to update title:', error);
      }
    }
  };

  const handleDuplicate = async (resumeId: number, title: string) => {
    try {
      await duplicateResume(resumeId, `${title} (Copy)`);
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
  };

  const handleDelete = async (resumeId: number) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(resumeId);
      } catch (error) {
        console.error('Failed to delete resume:', error);
      }
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading resumes...</div>;
  }

  return (
    // <div className="bg-white border-b border-gray-200 p-4">
    //   <div className="flex items-center justify-between mb-4">
    //     <h2 className="text-lg font-semibold">My Resumes</h2>
    //     <button
    //       onClick={() => setIsCreating(true)}
    //       className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
    //     >
    //       + New Resume
    //     </button>
    //   </div>

    //   {error && (
    //     <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
    //       {error}
    //       <button onClick={clearError} className="ml-2 underline">Dismiss</button>
    //     </div>
    //   )}

    //   {isCreating && (
    //     <div className="mb-4 p-3 border border-gray-300 rounded">
    //       <input
    //         type="text"
    //         placeholder="Resume title..."
    //         value={newResumeTitle}
    //         onChange={(e) => setNewResumeTitle(e.target.value)}
    //         className="w-full p-2 border border-gray-300 rounded mb-2"
    //         autoFocus
    //       />
    //       <div className="flex gap-2">
    //         <button
    //           onClick={handleCreateResume}
    //           disabled={!newResumeTitle.trim()}
    //           className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
    //         >
    //           Create
    //         </button>
    //         <button
    //           onClick={() => {
    //             setIsCreating(false);
    //             setNewResumeTitle('');
    //           }}
    //           className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    //     {resumes.map((resume) => (
    //       <div
    //         key={resume.id}
    //         className={`p-3 border rounded cursor-pointer transition-colors ${
    //           currentResumeId === resume.id
    //             ? 'border-blue-500 bg-blue-50'
    //             : 'border-gray-300 hover:border-gray-400'
    //         }`}
    //         onClick={() => handleSelectResume(resume.id)}
    //       >
    //         {editingId === resume.id ? (
    //           <div onClick={(e) => e.stopPropagation()}>
    //             <input
    //               type="text"
    //               value={editingTitle}
    //               onChange={(e) => setEditingTitle(e.target.value)}
    //               className="w-full p-1 border border-gray-300 rounded text-sm"
    //               onBlur={handleSaveTitle}
    //               onKeyDown={(e) => {
    //                 if (e.key === 'Enter') handleSaveTitle();
    //                 if (e.key === 'Escape') {
    //                   setEditingId(null);
    //                   setEditingTitle('');
    //                 }
    //               }}
    //               autoFocus
    //             />
    //           </div>
    //         ) : (
    //           <h3 className="font-medium text-sm mb-1">{resume.title}</h3>
    //         )}
            
    //         <p className="text-xs text-gray-500 mb-2">
    //           Updated {new Date(resume.updated_at).toLocaleDateString()}
    //         </p>
            
    //         <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
    //           <button
    //             onClick={() => handleEditTitle(resume)}
    //             className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
    //           >
    //             Edit
    //           </button>
    //           <button
    //             onClick={() => handleDuplicate(resume.id, resume.title)}
    //             className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
    //           >
    //             Duplicate
    //           </button>
    //           <button
    //             onClick={() => handleDelete(resume.id)}
    //             className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded"
    //           >
    //             Delete
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {resumes.length === 0 && (
    //     <div className="text-center py-8 text-gray-500">
    //       <p>No resumes yet. Create your first resume to get started!</p>
    //     </div>
    //   )}
    // </div>
    <div></div>
  );
};

export default ResumeSelector; 