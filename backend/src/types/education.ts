export interface DatabaseEducation {
  id: number;
  user_id: number;
  resume_id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  start_date: string;
  end_date: string;
  gpa: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEducationRequest {
  userId: number;
  resumeId: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface UpdateEducationRequest {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface FrontendEducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface FrontendEducationSection {
  items: FrontendEducationItem[];
} 