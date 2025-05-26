import { useResumeStore } from '../../../Store/resumeStore';
import { ResumeSection, HeaderSection } from '../../../types';

interface HeaderEditorProps {
  section: ResumeSection;
}

const HeaderEditor = ({ section }: HeaderEditorProps) => {
  const { updateSectionContent } = useResumeStore();
  const headerData = section.content as HeaderSection;
  
  const handleChange = (field: string, value: string | boolean) => {
    const updatedContent = { 
      ...headerData, 
      [field]: value 
    };
    
    updateSectionContent(section.id, updatedContent);
  };
  
  const handleContactChange = (field: string, value: string) => {
    const updatedContact = { 
      ...headerData.contact, 
      [field]: value 
    };
    
    const updatedContent = { 
      ...headerData, 
      contact: updatedContact 
    };
    
    updateSectionContent(section.id, updatedContent);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={headerData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Title
          </label>
          <input
            type="text"
            value={headerData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={headerData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerData.showPhone}
            onChange={(e) => handleChange('showPhone', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show Phone
          </label>
        </div>
        
        {headerData.showPhone && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={headerData.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={headerData.contact.location}
            onChange={(e) => handleContactChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, State"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerData.showLinkedIn}
            onChange={(e) => handleChange('showLinkedIn', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show LinkedIn
          </label>
        </div>
        
        {headerData.showLinkedIn && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              value={headerData.contact.linkedin || ''}
              onChange={(e) => handleContactChange('linkedin', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="linkedin.com/in/yourprofile"
            />
          </div>
        )}
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerData.showGitHub}
            onChange={(e) => handleChange('showGitHub', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show GitHub
          </label>
        </div>
        
        {headerData.showGitHub && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="text"
              value={headerData.contact.github || ''}
              onChange={(e) => handleContactChange('github', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="github.com/yourusername"
            />
          </div>
        )}
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerData.showFullUrls}
            onChange={(e) => handleChange('showFullUrls', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show Full URLs
          </label>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;