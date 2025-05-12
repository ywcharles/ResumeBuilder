import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeItem } from '../../types';
import { Trash2, GripVertical, Edit, Save, X } from 'lucide-react';

interface ModularResumeProps {
  items: ResumeItem[];
  onUpdateItems: (items: ResumeItem[]) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (id: string, content: any) => void;
}

const ModularResume: React.FC<ModularResumeProps> = ({ 
  items, 
  onUpdateItems, 
  onDeleteItem,
  onUpdateItem
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    
    onUpdateItems(reorderedItems);
  };

  const startEditing = (item: ResumeItem) => {
    setEditingId(item.id);
    setEditFormData({...item.content});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setEditFormData({
      ...editFormData,
      [field]: value.split(',').map((item: string) => item.trim())
    });
  };

  const saveChanges = (id: string) => {
    onUpdateItem(id, editFormData);
    setEditingId(null);
    setEditFormData(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const renderItemContent = (item: ResumeItem) => {
    if (editingId === item.id) {
      return renderEditForm(item);
    }

    switch (item.type) {
      case 'experience':
        return (
          <div className="space-y-1">
            <div className="flex justify-between">
              <h3 className="font-bold">{item.content.position}</h3>
              <span className="text-gray-600 text-sm">{item.content.startDate} - {item.content.endDate}</span>
            </div>
            <h4 className="text-gray-700">{item.content.company}</h4>
            <p className="text-sm text-gray-600">{item.content.description}</p>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-1">
            <div className="flex justify-between">
              <h3 className="font-bold">{item.content.institution}</h3>
              <span className="text-gray-600 text-sm">{item.content.startDate} - {item.content.endDate}</span>
            </div>
            <h4 className="text-gray-700">{item.content.degree} in {item.content.field}</h4>
            {item.content.gpa && <p className="text-sm text-gray-600">GPA: {item.content.gpa}</p>}
          </div>
        );
      case 'skill':
        return (
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{item.content.name}</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {item.content.level.charAt(0).toUpperCase() + item.content.level.slice(1)}
            </span>
          </div>
        );
      case 'project':
        return (
          <div className="space-y-1">
            <h3 className="font-bold">{item.content.name}</h3>
            <p className="text-sm text-gray-600">{item.content.description}</p>
            <div className="flex flex-wrap gap-1">
              {item.content.technologies.map((tech: string, i: number) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            {item.content.link && (
              <a href={item.content.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                View Project
              </a>
            )}
          </div>
        );
      case 'certification':
        return (
          <div className="space-y-1">
            <h3 className="font-bold">{item.content.name}</h3>
            <div className="flex justify-between">
              <h4 className="text-gray-700">{item.content.issuer}</h4>
              <span className="text-gray-600 text-sm">{item.content.date}</span>
            </div>
            {item.content.link && (
              <a href={item.content.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                View Certificate
              </a>
            )}
          </div>
        );
      default:
        return <p>Unknown item type</p>;
    }
  };

  const renderEditForm = (item: ResumeItem) => {
    switch (item.type) {
      case 'experience':
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600">Position</label>
              <input
                type="text"
                name="position"
                value={editFormData.position}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Company</label>
              <input
                type="text"
                name="company"
                value={editFormData.company}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={editFormData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  value={editFormData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">Description</label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
                rows={3}
              />
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600">Institution</label>
              <input
                type="text"
                name="institution"
                value={editFormData.institution}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Degree</label>
              <input
                type="text"
                name="degree"
                value={editFormData.degree}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Field of Study</label>
              <input
                type="text"
                name="field"
                value={editFormData.field}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={editFormData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  value={editFormData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600">GPA (optional)</label>
              <input
                type="text"
                name="gpa"
                value={editFormData.gpa || ''}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
          </div>
        );
      case 'skill':
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600">Skill Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Level</label>
              <select
                name="level"
                value={editFormData.level}
                onChange={handleInputChange as any}
                className="w-full p-1 border rounded text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        );
      case 'project':
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600">Project Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Description</label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Technologies (comma separated)</label>
              <input
                type="text"
                value={editFormData.technologies.join(', ')}
                onChange={(e) => handleArrayInputChange(e, 'technologies')}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Link (optional)</label>
              <input
                type="text"
                name="link"
                value={editFormData.link || ''}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
          </div>
        );
      case 'certification':
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600">Certification Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Issuing Organization</label>
              <input
                type="text"
                name="issuer"
                value={editFormData.issuer}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Date</label>
              <input
                type="text"
                name="date"
                value={editFormData.date}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Link (optional)</label>
              <input
                type="text"
                name="link"
                value={editFormData.link || ''}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
          </div>
        );
      default:
        return <p>Unknown item type</p>;
    }
  };

  return (
    <div className="h-full bg-white p-4 shadow-md rounded-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Modular Resume</h2>
      <p className="text-sm text-gray-600 mb-4">Drag, drop, and rearrange items to build your resume</p>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="resume-items">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {items.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <p className="text-gray-500">Drag items from the Resume Bank or click the + button to add them here</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <div 
                            {...provided.dragHandleProps}
                            className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab"
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1">
                            {renderItemContent(item)}
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            {editingId === item.id ? (
                              <>
                                <button 
                                  onClick={() => saveChanges(item.id)}
                                  className="p-1 rounded-full hover:bg-green-100 text-green-600"
                                  title="Save changes"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={cancelEditing}
                                  className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                  title="Cancel editing"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button 
                                onClick={() => startEditing(item)}
                                className="p-1 rounded-full hover:bg-blue-100 text-blue-600"
                                title="Edit item"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => onDeleteItem(item.id)}
                              className="p-1 rounded-full hover:bg-red-100 text-red-600"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ModularResume;