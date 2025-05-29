export interface Skill {
  id: number;
  user_id: number;
  resume_id: number;
  name: string;
  order_num: number;
  created_at: string;
  updated_at: string;
}

export interface FrontendSkillsSection {
  skills: string[];
} 