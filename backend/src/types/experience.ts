export interface DatabaseExperience {
  id: number;
  user_id: number;
  resume_id: number;
  company_name: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_selected: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseBulletPoint {
  id: number;
  experience_id: number;
  content: string;
  is_selected: boolean;
  order_num: number;
  created_at: string;
  updated_at: string;
}

export interface ExperienceWithBullets extends DatabaseExperience {
  bullets: DatabaseBulletPoint[];
}

export interface CreateExperienceRequest {
  userId: number;
  resumeId: number;
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  bullets?: {
    content: string;
    is_selected?: boolean;
  }[];
}

export interface UpdateExperienceRequest {
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  isSelected: boolean;
  bullets?: {
    content: string;
    is_selected?: boolean;
  }[];
}

export interface ToggleExperienceRequest {
  isSelected: boolean;
}

export interface FrontendExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface FrontendExperienceSection {
  items: FrontendExperienceItem[];
} 