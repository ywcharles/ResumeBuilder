import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '../../utils/utils';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SortableItem = ({ id, children, className, isActive, onClick }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white rounded-lg border mb-4 overflow-hidden transition-all',
        isDragging && 'opacity-60 shadow-xl',
        isActive && 'ring-2 ring-blue-500',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center p-3 bg-gray-50 border-b">
        <div
          className="flex items-center justify-center w-8 h-8 cursor-grab hover:bg-gray-200 rounded p-1 mr-2"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={18} className="text-gray-500" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SortableItem;