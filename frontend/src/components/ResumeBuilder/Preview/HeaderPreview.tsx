import React from 'react';
import { ResumeSection, HeaderSection } from '../../../types';

interface HeaderPreviewProps {
  section: ResumeSection;
}

const HeaderPreview = ({ section }: HeaderPreviewProps) => {
  const headerData = section.content as HeaderSection;
  const { fullName, title, contact, showPhone, showLinkedIn, showGitHub, showWebsite, showFullUrls } = headerData;
  
  const renderContactInfo = () => {
    const items = [];
    
    items.push(<span key="email">{contact.email}</span>);
    
    if (showPhone) {
      items.push(<span key="phone">{contact.phone}</span>);
    }
    
    if (showLinkedIn && contact.linkedin) {
      items.push(
        <span key="linkedin">
          {showFullUrls ? (
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {contact.linkedin}
            </a>
          ) : (
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
        </span>
      );
    }
    
    if (showGitHub && contact.github) {
      items.push(
        <span key="github">
          {showFullUrls ? (
            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {contact.github}
            </a>
          ) : (
            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
        </span>
      );
    }
    
    if (showWebsite && contact.website) {
      items.push(
        <span key="website">
          {showFullUrls ? (
            <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {contact.website}
            </a>
          ) : (
            <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Website
            </a>
          )}
        </span>
      );
    }
    
    return items.map((item, index) => (
      <React.Fragment key={`wrapper-${index}`}>
        {item}
        {index < items.length - 1 && <span className="mx-1.5">•</span>}
      </React.Fragment>
    ));
  };

  return (
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900 uppercase mb-1">{fullName}</h1>
      {title && <h2 className="text-lg text-gray-700 mb-2">{title}</h2>}
      <div className="text-sm text-gray-600 flex flex-wrap justify-center">
        {renderContactInfo()}
      </div>
    </div>
  );
};

export default HeaderPreview;