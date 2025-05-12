import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import ResumeBank from "../components/ResumeBuilder/ResumeBank";
import ModularResume from "../components/ResumeBuilder/ModularResume";
import LatexRenderer from "../components/ResumeBuilder/LatexRender";
import { ResumeItem } from '../types';

function ResumeBuilder() {
  const [resumeItems, setResumeItems] = useState<ResumeItem[]>([]);
  const [activeColumns, setActiveColumns] = useState<[number, number]>([0, 1]); // Shows which two columns are visible
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const columns = [
    { id: 0, title: 'Resume Bank', component: <ResumeBank onAddItem={handleAddItem} /> },
    { id: 1, title: 'Modular Resume', component: (
      <ModularResume 
        items={resumeItems} 
        onUpdateItems={handleUpdateItems}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    )},
    { id: 2, title: 'LaTeX Renderer', component: <LatexRenderer items={resumeItems} /> }
  ];

  // Handle drag and drop from ResumeBank to ModularResume
  useEffect(() => {
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      
      try {
        const data = e.dataTransfer?.getData('application/json');
        if (data) {
          const template = JSON.parse(data);
          const newItem: ResumeItem = {
            id: `${template.type}-${Date.now()}`,
            type: template.type,
            content: { ...template.content }
          };
          
          setResumeItems(prev => [...prev, newItem]);
        }
      } catch (error) {
        console.error('Error handling drop:', error);
      }
    };

    const preventDefaults = (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    const element = document.getElementById('modular-resume-container');
    if (element) {
      element.addEventListener('dragover', preventDefaults);
      element.addEventListener('drop', handleDrop);
    }

    return () => {
      if (element) {
        element.removeEventListener('dragover', preventDefaults);
        element.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  function handleAddItem(item: ResumeItem) {
    setResumeItems(prev => [...prev, item]);
  }

  function handleUpdateItems(updatedItems: ResumeItem[]) {
    setResumeItems(updatedItems);
  }

  function handleDeleteItem(id: string) {
    setResumeItems(prev => prev.filter(item => item.id !== id));
  }

  function handleUpdateItem(id: string, content: unknown) {
    setResumeItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, content } : item
      )
    );
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && activeColumns[1] < 2) {
      setActiveColumns(prev => [prev[0] + 1, prev[1] + 1]);
    } else if (isRightSwipe && activeColumns[0] > 0) {
      setActiveColumns(prev => [prev[0] - 1, prev[1] - 1]);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const navigateLeft = () => {
    if (activeColumns[0] > 0) {
      setActiveColumns(prev => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const navigateRight = () => {
    if (activeColumns[1] < 2) {
      setActiveColumns(prev => [prev[0] + 1, prev[1] + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Resume Builder</h1>
          </div>
          
          {/* Navigation dots */}
          <div className="flex items-center gap-2">
            {columns.map((col, index) => (
              <div 
                key={col.id}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeColumns.includes(index) ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`${col.title} column indicator`}
              />
            ))}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-4 relative">
        <div className="max-w-7xl mx-auto h-full relative">
          {/* Navigation buttons */}
          <button 
            onClick={navigateLeft}
            disabled={activeColumns[0] === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${
              activeColumns[0] === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="Previous columns"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={navigateRight}
            disabled={activeColumns[1] === 2}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${
              activeColumns[1] === 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="Next columns"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Two-column layout */}
          <div 
            ref={containerRef}
            className="grid grid-cols-2 gap-4 h-[calc(100vh-8rem)]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {columns
              .filter((_, index) => activeColumns.includes(index))
              .map(column => (
                <div key={column.id} className="h-full">
                  {column.component}
                </div>
              ))
            }
          </div>
          
          {/* Column labels for mobile */}
          <div className="mt-4 text-center font-medium text-gray-700 md:hidden">
            {columns
              .filter((_, index) => activeColumns.includes(index))
              .map(column => column.title)
              .join(' & ')}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResumeBuilder;