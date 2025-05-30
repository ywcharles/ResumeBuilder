import { useEffect } from 'react';
import { useResumeStore } from '../../../Store/resumeStore';
import { useHeader } from '../../../hooks/useHeader';
import { ResumeSection, HeaderSection } from '../../../types';

interface HeaderEditorProps {
  section: ResumeSection;
}

const HeaderEditor = ({ section }: HeaderEditorProps) => {
  const { updateSectionContent } = useResumeStore();
  const { headerData, isLoading, error, updateHeaderData } = useHeader();
  const headerContent = section.content as HeaderSection;
  
  useEffect(() => {
    if (headerData && (!headerContent.fullName || headerContent.fullName === 'Your Name')) {
      updateSectionContent(section.id, headerData);
    }
  }, [headerData, section.id, updateSectionContent, headerContent.fullName]);
  
  const handleChange = async (field: string, value: string | boolean) => {
    const updatedContent = { 
      ...headerContent, 
      [field]: value 
    };
    
    updateSectionContent(section.id, updatedContent);
    
    try {
      await updateHeaderData(updatedContent);
    } catch (error) {
      console.error('Failed to save header changes:', error);
    }
  };
  
  const handleContactChange = async (field: string, value: string) => {
    const updatedContact = { 
      ...headerContent.contact, 
      [field]: value 
    };
    
    const updatedContent = { 
      ...headerContent, 
      contact: updatedContact 
    };
    
    updateSectionContent(section.id, updatedContent);
    
    try {
      await updateHeaderData(updatedContent);
    } catch (error) {
      console.error('Failed to save header changes:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading header data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={headerContent.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Title
          </label>
          <input
            type="text"
            value={headerContent.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
         */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={headerContent.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerContent.showPhone}
            onChange={(e) => handleChange('showPhone', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show Phone
          </label>
        </div>
        
        {headerContent.showPhone && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={headerContent.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={headerContent.contact.location}
            onChange={(e) => handleContactChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, State"
          />
        </div> */}
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerContent.showLinkedIn}
            onChange={(e) => handleChange('showLinkedIn', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show LinkedIn
          </label>
        </div>
        
        {headerContent.showLinkedIn && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              value={headerContent.contact.linkedin || ''}
              onChange={(e) => handleContactChange('linkedin', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="linkedin.com/in/yourprofile"
            />
          </div>
        )}
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerContent.showGitHub}
            onChange={(e) => handleChange('showGitHub', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show GitHub
          </label>
        </div>
        
        {headerContent.showGitHub && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="text"
              value={headerContent.contact.github || ''}
              onChange={(e) => handleContactChange('github', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="github.com/yourusername"
            />
          </div>
        )}
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerContent.showFullUrls}
            onChange={(e) => handleChange('showFullUrls', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show Full URLs
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={headerContent.showWebsite || false}
            onChange={(e) => handleChange('showWebsite', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Show Website
          </label>
        </div>
        
        {headerContent.showWebsite && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              value={headerContent.contact.website || ''}
              onChange={(e) => handleContactChange('website', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="yourwebsite.com"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderEditor;