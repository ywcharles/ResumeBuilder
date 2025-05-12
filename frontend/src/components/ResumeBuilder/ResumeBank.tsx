import React from 'react';
import { Plus, Briefcase, GraduationCap, Lightbulb, FolderGit2, Award } from 'lucide-react';
import { ResumeItem } from '../../types';

interface ResumeBankProps {
  onAddItem: (item: ResumeItem) => void;
}

const ResumeBank: React.FC<ResumeBankProps> = ({ onAddItem }) => {
  const templates = [
    {
      id: 'exp-template',
      type: 'experience' as const,
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Work Experience',
      content: {
        company: 'Company Name',
        position: 'Position Title',
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: 'Describe your responsibilities and achievements'
      }
    },
    {
      id: 'edu-template',
      type: 'education' as const,
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Education',
      content: {
        institution: 'University Name',
        degree: 'Degree',
        field: 'Field of Study',
        startDate: 'Sep 2016',
        endDate: 'Jun 2020',
        gpa: '3.8/4.0'
      }
    },
    {
      id: 'skill-template',
      type: 'skill' as const,
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'Skill',
      content: {
        name: 'Skill Name',
        level: 'advanced'
      }
    },
    {
      id: 'project-template',
      type: 'project' as const,
      icon: <FolderGit2 className="w-5 h-5" />,
      title: 'Project',
      content: {
        name: 'Project Name',
        description: 'Brief project description',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        link: 'https://project-link.com'
      }
    },
    {
      id: 'cert-template',
      type: 'certification' as const,
      icon: <Award className="w-5 h-5" />,
      title: 'Certification',
      content: {
        name: 'Certification Name',
        issuer: 'Issuing Organization',
        date: 'Jun 2022',
        link: 'https://certification-link.com'
      }
    }
  ];

  const handleAddItem = (template: typeof templates[number]) => {
    const newItem: ResumeItem = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      content: { ...template.content }
    };
    onAddItem(newItem);
  };

  return (
    <div className="h-full bg-white p-4 shadow-md rounded-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Resume Bank</h2>
      <p className="text-sm text-gray-600 mb-4">Drag and drop items to your resume</p>
      
      <div className="space-y-3">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-grab"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/json', JSON.stringify(template));
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {template.icon}
                <span className="font-medium">{template.title}</span>
              </div>
              <button 
                onClick={() => handleAddItem(template)}
                className="p-1 rounded-full hover:bg-blue-100 text-blue-600"
                title={`Add ${template.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBank;