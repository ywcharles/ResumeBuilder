import { useState } from 'react';
import EditorPanel from '../components/ResumeBuilder/EditorPanel';
import PreviewPanel from '../components/ResumeBuilder/PreviewPanel';
import ResumeSelector from '../components/ResumeBuilder/ResumeSelector';

function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="flex flex-col h-screen">
      {/* Resume Selector */}
      <ResumeSelector />
      
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex border-b">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('edit')}
          >
            Editor
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>
        
        {/* Editor Panel - Hidden on mobile when preview tab is active */}
        <div className={`${
          activeTab === 'edit' ? 'block' : 'hidden'
        } lg:block lg:w-1/2 border-r border-gray-200 overflow-y-auto`}>
          <EditorPanel />
        </div>
        
        {/* Preview Panel - Hidden on mobile when edit tab is active */}
        <div className={`${
          activeTab === 'preview' ? 'block' : 'hidden'
        } lg:block lg:w-1/2 overflow-y-auto bg-gray-100`}>
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
}

export default ResumeBuilder;