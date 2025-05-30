export interface Skill {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface FrontendSkillsSection {
  skills: string[];
} 