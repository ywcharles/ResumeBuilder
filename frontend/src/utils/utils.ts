import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        year: 'numeric' 
      }).format(date);
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  } catch (e) {
    return dateString;
  }
}